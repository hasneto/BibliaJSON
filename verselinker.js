(async () => {
  const response = await fetch("https://cdn.jsdelivr.net/gh/hasneto/BibliaJSON@main/NAA.json");
  const data = await response.json();

  const bibleData = {};
  for (const book of data) {
    const bookAbbr = book.abbrev;
    for (let cap = 0; cap < book.chapters.length; cap++) {
      for (let ver = 0; ver < book.chapters[cap].length; ver++) {
        const key = `${bookAbbr}.${cap + 1}.${ver + 1}`;
        bibleData[key] = book.chapters[cap][ver];
      }
    }
  }

  const bookMap = {
    "1João": "1Jo", "2João": "2Jo", "3João": "3Jo",
    "1 João": "1Jo", "2 João": "2Jo", "3 João": "3Jo",
    "1Jo": "1Jo", "2Jo": "2Jo", "3Jo": "3Jo",
    "João": "Jo", "Jo": "Jo",
    "1Timóteo": "1Tm", "2Timóteo": "2Tm",
    "1 Timóteo": "1Tm", "2 Timóteo": "2Tm",
    "1Tm": "1Tm", "2Tm": "2Tm",
    "Tiago": "Tg", "Tg": "Tg",
    "1Coríntios": "1Co", "2Coríntios": "2Co",
    "1 Coríntios": "1Co", "2 Coríntios": "2Co",
    "1Co": "1Co", "2Co": "2Co",
    "Gálatas": "Gl", "Gl": "Gl",
    // (adicione todos os outros aqui como já estava no seu `bookMap`)
    // ...
  };

  const bookKeys = Object.keys(bookMap).sort((a, b) => b.length - a.length); // Ordem decrescente por tamanho

  function normalizeBook(name) {
    name = name.trim();
    for (const key of bookKeys) {
      const regex = new RegExp("^" + key.replace(/ /g, '\\s*'), "i");
      if (regex.test(name)) return bookMap[key];
    }
    return null;
  }

  function expandVerses(versePart) {
    const parts = versePart.split(',');
    let verses = [];
    for (const p of parts) {
      if (p.includes('-')) {
        const [start, end] = p.split('-').map(Number);
        for (let v = start; v <= end; v++) verses.push(v);
      } else {
        verses.push(Number(p));
      }
    }
    return verses;
  }

  const style = document.createElement("style");
  style.innerHTML = `
    .bible-ref {
      border-bottom: 1px dotted #333;
      cursor: help;
      position: relative;
    }
    .bible-ref:hover::after {
      content: attr(data-tooltip);
      white-space: pre-wrap;
      position: absolute;
      background: #fefefe;
      border: 1px solid #ccc;
      padding: 8px;
      color: #000;
      z-index: 999;
      top: 1.5em;
      left: 0;
      min-width: 200px;
      max-width: 400px;
      font-size: 14px;
      box-shadow: 2px 2px 6px rgba(0,0,0,0.15);
    }
  `;
  document.head.appendChild(style);

  const regex = /\b((\d\s?)?[A-Za-zÀ-ÿçÇêÊôÔíÍóÓãÃéÉúÚ]+\s?[A-Za-zÀ-ÿçÇêÊôÔíÍóÓãÃéÉúÚ]*?)\s+(\d+)[.:](\d+(?:[-–]\d+)?(?:,\d+(?:[-–]\d+)?)*)\b/g;

  function processNode(node) {
    if (node.nodeType !== 3 || node.parentNode.classList?.contains("bible-ref")) return;

    const text = node.textContent;
    const matches = [...text.matchAll(regex)];
    if (matches.length === 0) return;

    const parent = node.parentNode;
    let lastIndex = 0;
    const fragment = document.createDocumentFragment();

    for (const match of matches) {
      const [fullMatch, book, , chapter, verses] = match;
      const bookAbbr = normalizeBook(book);
      const index = match.index;

      if (!bookAbbr) continue;

      fragment.appendChild(document.createTextNode(text.slice(lastIndex, index)));

      const span = document.createElement("span");
      span.className = "bible-ref";

      const verseNumbers = expandVerses(verses);
      let tooltipText = "";

      for (const v of verseNumbers) {
        const key = `${bookAbbr}.${chapter}.${v}`;
        tooltipText += bibleData[key] ? `${bookAbbr} ${chapter}:${v} — ${bibleData[key]}\n` : `${bookAbbr} ${chapter}:${v} — [Não encontrado]\n`;
      }

      span.setAttribute("data-tooltip", tooltipText.trim());
      span.textContent = fullMatch;
      fragment.appendChild(span);

      lastIndex = index + fullMatch.length;
    }

    fragment.appendChild(document.createTextNode(text.slice(lastIndex)));
    parent.replaceChild(fragment, node);
  }

  function walk(node) {
    if (node.nodeType === 3) {
      processNode(node);
    } else {
      for (const child of [...node.childNodes]) walk(child);
    }
  }

  walk(document.body);
})();
