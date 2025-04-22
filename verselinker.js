(async () => {
  const response = await fetch("https://raw.githubusercontent.com/hasneto/BibliaJSON/main/NAA.json");
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
      "Gn":"Gn", "Gênesis":"Gn", "Gen":"Gn",
      "Êx":"Êx", "Ex":"Êx", "Êxodo":"Êx", "Êxo":"Êx",
      "Lv":"Lv", "Levítico":"Lv", "Lev":"Lv",
      "Nm":"Nm", "Números":"Nm","Num":"Nm",
      "Dt":"Dt", "Deuteronômio":"Dt",
      "Js":"Js", "Josué":"Js",
      "Jz":"Jz", "Juízes":"Jz",
      "Rt":"Rt", "Rute":"Rt",
      "1Sm":"1Sm", "1 Samuel":"1Sm", "1Sam":"1Sm", "1 Sm":"1Sm",
      "2Sm":"2Sm", "2 Samuel":"2Sm", "2Sam":"2Sm", "2 Sm":"2Sm",
      "1Rs":"1Rs", "1 Reis":"1Rs", "1Reis":"1Rs", "1 Rs":"1Rs",
      "2Rs":"2Rs", "2 Reis":"2Rs", "2Reis":"2Rs", "2 Rs":"2Rs",
      "1Cr":"1Cr", "1 Crônicas":"1Cr", "1Crônicas":"1Cr", "1 Cr":"1Cr", "1Cro":"1Cr", "1 Cro":"1Cr",
      "2Cr":"2Cr", "2 Crônicas":"2Cr", "2Crônicas":"2Cr", "2 Cr":"2Cr", "2Cro":"2Cr", "2 Cro":"2Cr",
      "Ed":"Ed", "Esdras":"Ed", "Esd":"Ed",
      "Ne":"Ne", "Neemias":"Ne", "Nee":"Ne",
      "Et":"Et", "Ester":"Et", "Est":"Et",
      "Jó":"Jó",
      "Sl":"Sl", "Salmos":"Sl", "Salmo":"Sl",
      "Pv":"Pv", "Provérbios":"Pv", "Prov":"Pv",
      "Ec":"Ec", "Eclesiastes":"Ec",
      "Ct":"Ct", "Cantares":"Ct", "Cânticos":"Ct",
      "Is":"Is", "Isaías":"Is", "Isa":"Is",
      "Jr":"Jr", "Jeremias":"Jr", "Jer":"Jr",
      "Lm":"Lm", "Lamentações":"Lm", "Lam":"Lm",
      "Ez":"Ez", "Ezequiel":"Ez", "Ezeq":"Ez",
      "Dn":"Dn", "Daniel":"Dn", "Dan":"Dn",
      "Os":"Os", "Oseias":"Os",
      "Jl":"Jl", "Joel":"Jl",
      "Am":"Am", "Amós":"Am",
      "Ob":"Ob", "Obadias":"Ob", "Obad":"Ob",
      "Jn":"Jn", "Jonas":"Jn", "Jon":"Jn",
      "Mq":"Mq", "Miquéias":"Mq", "Miq":"Mq",
      "Na":"Na", "Naum":"Na",
      "Hc":"Hc", "Habacuque":"Hc", "Hab":"Hc",
      "Sf":"Sf", "Sofonias":"Sf",
      "Ag":"Ag", "Ageu":"Ag",
      "Zc":"Zc", "Zacarias":"Zc", "Zac":"Zc",
      "Ml":"Ml", "Malaquias":"Ml", "Mal":"Ml",
      "Mt":"Mt", "Mateus":"Mt", "Mat":"Mt",
      "Mc":"Mc", "Marcos":"Mc",
      "Lc":"Lc", "Lucas":"Lc", "Luc":"Lc",
      "Jo":"Jo", "João":"Jo",
      "At":"At", "Atos":"At",
      "Rm":"Rm", "Romanos":"Rm", "Rom":"Rm",
      "1Co":"1Co", "1 Coríntios":"1Co", "1 Cor":"1Co", "1Coríntios":"1Co",
      "2Co":"2Co", "2 Coríntios":"2Co", "2 Cor":"2Co", "2Coríntios":"2Co",
      "Gl":"Gl", "Gálatas":"Gl", "Gál":"Gl",
      "Ef":"Ef", "Efésios":"Ef", "Efé":"Ef",
      "Fp":"Fp", "Filipenses":"Fp", "Filip":"Fp",
      "Cl":"Cl", "Colossenses":"Cl",
      "1Ts":"1Ts", "1 Tessalonicenses":"1Ts", "1Tess":"1Ts", "1 Tess":"1Ts",
      "2Ts":"2Ts", "2 Tessalonicenses":"2Ts", "2Tess":"2Ts", "2 Tess":"2Ts",
      "1Tm":"1Tm", "1 Timóteo":"1Tm", "1Tim":"1Tm", "1 Tim":"1Tm",
      "2Tm":"2Tm", "2 Timóteo":"2Tm", "2Tim":"2Tm", "2 Tim":"2Tm",
      "Tt":"Tt", "Tito":"Tt", "Tit":"Tt",
      "Fm":"Fm", "Filemom":"Fm", "Fil":"Fm",
      "Hb":"Hb", "Hebreus":"Hb", "Heb":"Hb",
      "Tg":"Tg", "Tiago":"Tg", "Tiag":"Tg",
      "1Pe":"1Pe", "1 Pedro":"1Pe", "1Ped":"1Pe", "1 Ped":"1Pe",
      "2Pe":"2Pe", "2 Pedro":"2Pe", "2Ped":"2Pe", "2 Ped":"2Pe",
      "1Jo":"1Jo", "1 João":"1Jo",
      "2Jo":"2Jo", "2 João":"2Jo",
      "3Jo":"3Jo", "3 João":"3Jo",
      "Jd":"Jd", "Judas":"Jd", "Jud":"Jd",
      "Ap":"Ap", "Apocalipse":"Ap", "Apoc":"Ap"
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

  const regex = /\b((?:[1-3]\s*)?(?:[A-ZÁÉÍÓÚÀÈÌÒÙÂÊÎÔÛÃÕÇa-záéíóúàèìòùâêîôûãõç]{2,})(?:\s+[A-ZÁÉÍÓÚÀÈÌÒÙÂÊÎÔÛÃÕÇa-záéíóúàèìòùâêîôûãõç]{2,})?)\s+(\d{1,3})[:.](\d+(?:[-–]\d+)?(?:,\d+(?:[-–]\d+)?)*)\b/g;

  function processNode(node) {
    if (node.nodeType !== 3 || node.parentNode.classList?.contains("bible-ref")) return;

    const text = node.textContent;
    const matches = [...text.matchAll(regex)];
    if (matches.length === 0) return;

    const parent = node.parentNode;
    let lastIndex = 0;
    const fragment = document.createDocumentFragment();

    for (const match of matches) {
      const [fullMatch, book, chapter, verses] = match;
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
