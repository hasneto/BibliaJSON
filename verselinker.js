(function () {
  const BIBLE_JSON_URL = 'https://raw.githubusercontent.com/hasneto/BibliaJSON/refs/heads/main/NAA.json';

  // Novo regex mais preciso para detectar referências bíblicas
  const regexBiblia = /\b((?:[1-3]\s*)?(?:[A-ZÁÉÍÓÚÂÊÔÃÕa-záéíóúâêôãõ]{2,}))\.?\s?(\d{1,3})[.:](\d{1,3})(?:[-–](\d{1,3}))?/g;

  function normalizarLivro(livro) {
    return livro
      .replace(/\s/g, '')
      .replace(/\./g, '')
      .replace(/(1|2|3)([A-Za-z]+)/, (_, num, nome) => `${num}${nome}`)
      .replace(/Joao/i, 'Jo')
      .replace(/Genesis/i, 'Gn')
      .replace(/Exodo|Êxodo/i, 'Êx')
      .replace(/Levitico/i, 'Lv')
      .replace(/Numeros/i, 'Nm')
      .replace(/Deuteronomio/i, 'Dt')
      .replace(/Corintios/i, 'Co')
      .replace(/1Cor/i, '1Co')
      .replace(/2Cor/i, '2Co')
      .replace(/Salmos/i, 'Sl')
      .replace(/Romanos/i, 'Rm')
      .replace(/^(Oseias|Oséias|Os)$/i, 'Os');
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
