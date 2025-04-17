(function () {
  const BIBLE_JSON_URL = 'https://raw.githubusercontent.com/hasneto/BibliaJSON/refs/heads/main/NAA.json';

  // Novo regex mais preciso para detectar referências bíblicas
  const regexBiblia = /\b((?:[1-3]\s*)?(?:[A-ZÁÉÍÓÚÂÊÔÃÕa-záéíóúâêôãõ]{2,}))\.?\s?(\d{1,3})[.:](\d{1,3})(?:[-–](\d{1,3}))?/g;

  function normalizarLivro(livro) {
  return livro.replace(/\s|\./g, '')
    .replace(/(1|2|3)([A-Za-z]+)/, (_, num, nome) => `${num}${nome}`)
    .replace(/^(Genesis|Gn)$/i, 'Gn')
    .replace(/^(Exodo|Êxodo|Ex)$/i, 'Êx')
    .replace(/^(Levitico|Lv)$/i, 'Lv')
    .replace(/^(Numeros|Nm)$/i, 'Nm')
    .replace(/^(Deuteronomio|Dt)$/i, 'Dt')
    .replace(/^(Josue|Josué|Js)$/i, 'Js')
    .replace(/^(Juizes|Juízes|Jz)$/i, 'Jz')
    .replace(/^(Rute|Rt)$/i, 'Rt')
    .replace(/^(1Samuel|1Sm)$/i, '1Sm')
    .replace(/^(2Samuel|2Sm)$/i, '2Sm')
    .replace(/^(1Reis|1Rs)$/i, '1Rs')
    .replace(/^(2Reis|2Rs)$/i, '2Rs')
    .replace(/^(1Cronicas|1Cr)$/i, '1Cr')
    .replace(/^(2Cronicas|2Cr)$/i, '2Cr')
    .replace(/^(Esdras|Ed)$/i, 'Ed')
    .replace(/^(Neemias|Ne)$/i, 'Ne')
    .replace(/^(Ester|Et)$/i, 'Et')
    .replace(/^(Jó|Jo|Job)$/i, 'Jó')
    .replace(/^(Salmos|Sl)$/i, 'Sl')
    .replace(/^(Provérbios|Proverbios|Pv)$/i, 'Pv')
    .replace(/^(Eclesiastes|Ec)$/i, 'Ec')
    .replace(/^(Cantares|Ct)$/i, 'Ct')
    .replace(/^(Isaias|Isaías|Is)$/i, 'Is')
    .replace(/^(Jeremias|Jr)$/i, 'Jr')
    .replace(/^(Lamentacoes|Lamentações|Lm)$/i, 'Lm')
    .replace(/^(Ezequiel|Ez)$/i, 'Ez')
    .replace(/^(Daniel|Dn)$/i, 'Dn')
    .replace(/^(Oseias|Oséias|Os)$/i, 'Os')
    .replace(/^(Joel|Jl)$/i, 'Jl')
    .replace(/^(Amos|Amós|Am)$/i, 'Am')
    .replace(/^(Obadias|Ob)$/i, 'Ob')
    .replace(/^(Jonas|Jn)$/i, 'Jn')
    .replace(/^(Miqueias|Mq)$/i, 'Mq')
    .replace(/^(Naum|Na)$/i, 'Na')
    .replace(/^(Habacuque|Hc)$/i, 'Hc')
    .replace(/^(Sofonias|Sf)$/i, 'Sf')
    .replace(/^(Ageu|Ag)$/i, 'Ag')
    .replace(/^(Zacarias|Zc)$/i, 'Zc')
    .replace(/^(Malaquias|Ml)$/i, 'Ml')
    .replace(/^(Mateus|Mt)$/i, 'Mt')
    .replace(/^(Marcos|Mc)$/i, 'Mc')
    .replace(/^(Lucas|Lc)$/i, 'Lc')
    .replace(/^(Joao|João|Jo)$/i, 'Jo')
    .replace(/^(Atos|At)$/i, 'At')
    .replace(/^(Romanos|Rm)$/i, 'Rm')
    .replace(/^(1Corintios|1Co|1Cor)$/i, '1Co')
    .replace(/^(2Corintios|2Co|2Cor)$/i, '2Co')
    .replace(/^(Gálatas|Galatas|Gl)$/i, 'Gl')
    .replace(/^(Efesios|Efésios|Ef)$/i, 'Ef')
    .replace(/^(Filipenses|Fp)$/i, 'Fp')
    .replace(/^(Colossenses|Cl)$/i, 'Cl')
    .replace(/^(1Tessalonicenses|1Ts)$/i, '1Ts')
    .replace(/^(2Tessalonicenses|2Ts)$/i, '2Ts')
    .replace(/^(1Timoteo|1Tm)$/i, '1Tm')
    .replace(/^(2Timoteo|2Tm)$/i, '2Tm')
    .replace(/^(Tito|Tt)$/i, 'Tt')
    .replace(/^(Filemom|Fm)$/i, 'Fm')
    .replace(/^(Hebreus|Hb)$/i, 'Hb')
    .replace(/^(Tiago|Tg)$/i, 'Tg')
    .replace(/^(1Pedro|1Pe)$/i, '1Pe')
    .replace(/^(2Pedro|2Pe)$/i, '2Pe')
    .replace(/^(1Joao|1João|1Jo)$/i, '1Jo')
    .replace(/^(2Joao|2João|2Jo)$/i, '2Jo')
    .replace(/^(3Joao|3João|3Jo)$/i, '3Jo')
    .replace(/^(Judas|Jd)$/i, 'Jd')
    .replace(/^(Apocalipse|Ap)$/i, 'Ap');
}

  function criarTooltip() {
    const tooltip = document.createElement('div');
    tooltip.id = 'versiculo-tooltip';
    tooltip.style.position = 'absolute';
    tooltip.style.maxWidth = '300px';
    tooltip.style.background = '#fff';
    tooltip.style.border = '1px solid #ccc';
    tooltip.style.padding = '10px';
    tooltip.style.boxShadow = '2px 2px 10px rgba(0,0,0,0.2)';
    tooltip.style.display = 'none';
    tooltip.style.zIndex = 9999;
    tooltip.style.fontSize = '14px';
    tooltip.style.lineHeight = '1.4';
    tooltip.style.borderRadius = '8px';
    tooltip.style.whiteSpace = 'pre-wrap';
    document.body.appendChild(tooltip);
    return tooltip;
  }

  const tooltip = criarTooltip();

  function mostrarTooltip(texto, x, y) {
    tooltip.innerText = texto;
    tooltip.style.left = `${x + 10}px`;
    tooltip.style.top = `${y + 10}px`;
    tooltip.style.display = 'block';
  }

  function esconderTooltip() {
    tooltip.style.display = 'none';
  }

  function buscarVersiculo(bibliaJson, livroAbrev, capitulo, versiculo) {
    const livro = bibliaJson.find(l => l.abbrev.toLowerCase() === livroAbrev.toLowerCase());
    if (!livro) return null;
    const cap = livro.chapters[parseInt(capitulo) - 1];
    if (!cap || !cap[parseInt(versiculo) - 1]) return null;
    return cap[parseInt(versiculo) - 1];
  }

  function buscarIntervalo(bibliaJson, livroAbrev, capitulo, versIni, versFim) {
    const livro = bibliaJson.find(l => l.abbrev.toLowerCase() === livroAbrev.toLowerCase());
    if (!livro) return null;
    const cap = livro.chapters[parseInt(capitulo) - 1];
    if (!cap) return null;
    let texto = '';
    for (let i = parseInt(versIni); i <= parseInt(versFim); i++) {
      if (cap[i - 1]) texto += `${i}. ${cap[i - 1]} `;
    }
    return texto.trim();
  }

  function processarTexto(bibliaJson) {
    const elementos = document.querySelectorAll('p, span, div, li, h1, h2, h3');
    elementos.forEach(el => {
      if (!el.children.length && regexBiblia.test(el.innerHTML)) {
        el.innerHTML = el.innerHTML.replace(regexBiblia, (match, livro, cap, verIni, verFim) => {
          const abrev = normalizarLivro(livro);
          let texto = '';
          if (verFim) {
            texto = buscarIntervalo(bibliaJson, abrev, cap, verIni, verFim) || 'Versículo não encontrado';
          } else {
            texto = buscarVersiculo(bibliaJson, abrev, cap, verIni) || 'Versículo não encontrado';
          }
          return `<a href="javascript:void(0)" class="versiculo-link" data-texto="${texto.replace(/"/g, '&quot;')}">${match}</a>`;
        });
      }
    });

    document.querySelectorAll('.versiculo-link').forEach(link => {
      link.addEventListener('mouseover', e => {
        mostrarTooltip(e.target.getAttribute('data-texto'), e.pageX, e.pageY);
      });
      link.addEventListener('mousemove', e => {
        tooltip.style.left = `${e.pageX + 10}px`;
        tooltip.style.top = `${e.pageY + 10}px`;
      });
      link.addEventListener('mouseout', esconderTooltip);
    });
  }

  // Espera o conteúdo da página carregar
  window.addEventListener('DOMContentLoaded', () => {
    fetch(BIBLE_JSON_URL)
      .then(res => res.json())
      .then(data => processarTexto(data))
      .catch(err => console.error('Erro ao carregar a Bíblia:', err));
  });
})();
