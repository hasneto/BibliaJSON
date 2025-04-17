function () {
  const BIBLE_JSON_URL = 'https://raw.githubusercontent.com/hasneto/BibliaJSON/main/NAA.json';

  const regexBiblia = /\b(1?\s?[A-Za-zÀ-ú]{1,}\.?\s?[A-Za-zÀ-ú]*\.?)\s?(\d{1,3})[.:](\d{1,3})(?:[-–](\d{1,3}))?\b/g;

  function normalizarLivro(livro) {
    return livro.replace(/\s|\./g, '')
      .replace(/(1|2|3)([A-Za-zÀ-ú]+)/, (_, num, nome) => `${num}${nome}`)
      .replace(/^(Genesis|Gênesis|Gn)$/i, 'Gn')
      .replace(/^(Exodo|Êxodo|Êx)$/i, 'Êx')
      .replace(/^(Levitico|Lv)$/i, 'Lv')
      .replace(/^(Numeros|Nm)$/i, 'Nm')
      .replace(/^(Deuteronomio|Dt)$/i, 'Dt')
      .replace(/^(Joao|Jo)$/i, 'Jo')
      .replace(/^(1Corintios|1Co|1Cor)$/i, '1Co')
      .replace(/^(2Corintios|2Co|2Cor)$/i, '2Co')
      .replace(/^(Salmos|Sl)$/i, 'Sl')
      .replace(/^(Romanos|Rm)$/i, 'Rm')
      .replace(/^(Oseias|Oséias|Os)$/i, 'Os');
  }

  function criarTooltip() {
    const tooltip = document.createElement('div');
    tooltip.id = 'versiculo-tooltip';
    Object.assign(tooltip.style, {
      position: 'absolute',
      maxWidth: '300px',
      background: '#fff',
      border: '1px solid #ccc',
      padding: '10px',
      boxShadow: '2px 2px 10px rgba(0,0,0,0.2)',
      display: 'none',
      zIndex: 9999,
      fontSize: '14px',
      lineHeight: '1.4',
      borderRadius: '8px',
      whiteSpace: 'pre-wrap'
    });
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

  fetch(BIBLE_JSON_URL)
    .then(res => res.json())
    .then(data => processarTexto(data))
    .catch(err => console.error('Erro ao carregar a Bíblia:', err));
});
