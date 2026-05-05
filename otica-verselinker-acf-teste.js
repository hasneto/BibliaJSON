/*
 * Versão estável: v11
 * Recursos:
 * - reconhecimento de referências bíblicas em postagens do Blogger
 * - tooltip ACF via ACF.json do GitHub
 * - suporte a PC e celular
 * - rolagem interna para textos longos
 */

(function () {
  "use strict";

  const currentScript = document.currentScript;

  const CONFIG = {
    bibleJsonUrl:
      currentScript?.getAttribute("data-bible-json") ||
      "https://cdn.jsdelivr.net/gh/hasneto/BibliaJSON@main/ACF.json",

    version:
      currentScript?.getAttribute("data-version") ||
      "ACF",

    debug:
      currentScript?.getAttribute("data-debug") === "true"
  };

  const BOOK_ALIASES = {
    "gn": "gn",
    "genesis": "gn",
    "gênesis": "gn",

    "ex": "ex",
    "exodo": "ex",
    "êxodo": "ex",

    "lv": "lv",
    "levitico": "lv",
    "levítico": "lv",

    "nm": "nm",
    "numeros": "nm",
    "números": "nm",

    "dt": "dt",
    "deuteronomio": "dt",
    "deuteronômio": "dt",

    "js": "js",
    "josue": "js",
    "josué": "js",

    "jz": "jz",
    "juizes": "jz",
    "juízes": "jz",

    "rt": "rt",
    "rute": "rt",

    "1sm": "1sm",
    "1 sm": "1sm",
    "1 samuel": "1sm",
    "i samuel": "1sm",

    "2sm": "2sm",
    "2 sm": "2sm",
    "2 samuel": "2sm",
    "ii samuel": "2sm",

    "1rs": "1rs",
    "1 rs": "1rs",
    "1 reis": "1rs",
    "i reis": "1rs",

    "2rs": "2rs",
    "2 rs": "2rs",
    "2 reis": "2rs",
    "ii reis": "2rs",

    "1cr": "1cr",
    "1 cr": "1cr",
    "1 cronicas": "1cr",
    "1 crônicas": "1cr",
    "i cronicas": "1cr",
    "i crônicas": "1cr",

    "2cr": "2cr",
    "2 cr": "2cr",
    "2 cronicas": "2cr",
    "2 crônicas": "2cr",
    "ii cronicas": "2cr",
    "ii crônicas": "2cr",

    "ed": "ed",
    "esdras": "ed",

    "ne": "ne",
    "neemias": "ne",

    "et": "et",
    "ester": "et",

    "jó": "jó",
    "jô": "jó",

    "sl": "sl",
    "salmo": "sl",
    "salmos": "sl",

    "pv": "pv",
    "proverbios": "pv",
    "provérbios": "pv",

    "ec": "ec",
    "eclesiastes": "ec",

    "ct": "ct",
    "cantares": "ct",
    "canticos": "ct",
    "cânticos": "ct",
    "cantares de salomao": "ct",
    "cantares de salomão": "ct",

    "is": "is",
    "isaias": "is",
    "isaías": "is",

    "jr": "jr",
    "jeremias": "jr",

    "lm": "lm",
    "lamentacoes": "lm",
    "lamentações": "lm",
    "lamentacoes de jeremias": "lm",
    "lamentações de jeremias": "lm",

    "ez": "ez",
    "ezequiel": "ez",

    "dn": "dn",
    "daniel": "dn",

    "os": "os",
    "oseias": "os",
    "oséias": "os",

    "jl": "jl",
    "joel": "jl",

    "am": "am",
    "amos": "am",
    "amós": "am",

    "ob": "ob",
    "obadias": "ob",

    "jn": "jn",
    "jonas": "jn",

    "mq": "mq",
    "miqueias": "mq",
    "miquéias": "mq",

    "na": "na",
    "naum": "na",

    "hc": "hc",
    "habacuque": "hc",

    "sf": "sf",
    "sofonias": "sf",

    "ag": "ag",
    "ageu": "ag",

    "zc": "zc",
    "zacarias": "zc",

    "ml": "ml",
    "malaquias": "ml",

    "mt": "mt",
    "mateus": "mt",

    "mc": "mc",
    "marcos": "mc",

    "lc": "lc",
    "lucas": "lc",

    "jo": "jo",
    "joao": "jo",
    "joão": "jo",
    "sao joao": "jo",
    "são joão": "jo",

    "atos": "atos",
    "at": "atos",
    "atos dos apostolos": "atos",
    "atos dos apóstolos": "atos",

    "rm": "rm",
    "romanos": "rm",

    "1co": "1co",
    "1 co": "1co",
    "1 corintios": "1co",
    "1 coríntios": "1co",
    "i corintios": "1co",
    "i coríntios": "1co",

    "2co": "2co",
    "2 co": "2co",
    "2 corintios": "2co",
    "2 coríntios": "2co",
    "ii corintios": "2co",
    "ii coríntios": "2co",

    "gl": "gl",
    "galatas": "gl",
    "gálatas": "gl",

    "ef": "ef",
    "efesios": "ef",
    "efésios": "ef",

    "fp": "fp",
    "filipenses": "fp",

    "cl": "cl",
    "colossenses": "cl",

    "1ts": "1ts",
    "1 ts": "1ts",
    "1 tessalonicenses": "1ts",
    "i tessalonicenses": "1ts",

    "2ts": "2ts",
    "2 ts": "2ts",
    "2 tessalonicenses": "2ts",
    "ii tessalonicenses": "2ts",

    "1tm": "1tm",
    "1 tm": "1tm",
    "1 timoteo": "1tm",
    "1 timóteo": "1tm",
    "i timoteo": "1tm",
    "i timóteo": "1tm",

    "2tm": "2tm",
    "2 tm": "2tm",
    "2 timoteo": "2tm",
    "2 timóteo": "2tm",
    "ii timoteo": "2tm",
    "ii timóteo": "2tm",

    "tt": "tt",
    "tito": "tt",

    "fm": "fm",
    "filemom": "fm",
    "filemon": "fm",
    "filêmon": "fm",

    "hb": "hb",
    "hebreus": "hb",

    "tg": "tg",
    "tiago": "tg",

    "1pe": "1pe",
    "1 pe": "1pe",
    "1 pedro": "1pe",
    "i pedro": "1pe",

    "2pe": "2pe",
    "2 pe": "2pe",
    "2 pedro": "2pe",
    "ii pedro": "2pe",

    "1jo": "1jo",
    "1 jo": "1jo",
    "1 joao": "1jo",
    "1 joão": "1jo",
    "i joao": "1jo",
    "i joão": "1jo",

    "2jo": "2jo",
    "2 jo": "2jo",
    "2 joao": "2jo",
    "2 joão": "2jo",
    "ii joao": "2jo",
    "ii joão": "2jo",

    "3jo": "3jo",
    "3 jo": "3jo",
    "3 joao": "3jo",
    "3 joão": "3jo",
    "iii joao": "3jo",
    "iii joão": "3jo",

    "jd": "jd",
    "judas": "jd",

    "ap": "ap",
    "apocalipse": "ap",
    "revelacao": "ap",
    "revelação": "ap"
  };

  const SKIP_TAGS = new Set([
    "script",
    "style",
    "iframe",
    "noscript",
    "textarea",
    "input",
    "select",
    "option",
    "code",
    "pre",
    "a",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "time"
  ]);

  const SKIP_SELECTOR = [
    ".sidebar",
    ".sidebar-wrapper",
    "#sidebar",
    "#sidebar-wrapper",
    "[class*='sidebar']",
    "[id*='sidebar']",
    "aside",
    "nav",
    "header",
    "footer",
    "#footer",
    "#footer-wrapper",
    ".footer",
    ".comments",
    "#comments",
    ".post-share-buttons",
    ".otica-bible-tooltip"
  ].join(",");

    const SINGLE_CHAPTER_BOOKS = new Set([
    "ob",
    "fm",
    "2jo",
    "3jo",
    "jd"
  ]);
  
  let bibleByAbbrev = {};
  let tooltip = null;

  function log(...args) {
    if (CONFIG.debug) {
      console.log("[Ótica VerseLinker]", ...args);
    }
  }

  function escapeHtml(text) {
    return String(text)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function normalizeBookName(name) {
    return String(name || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\./g, "")
      .replace(/\s+/g, " ")
      .trim();
  }

  function getBookAbbrev(rawBookName) {
    const original = String(rawBookName || "")
      .toLowerCase()
      .replace(/\./g, "")
      .replace(/\s+/g, " ")
      .trim();

    const normalized = normalizeBookName(original);

    return BOOK_ALIASES[original] || BOOK_ALIASES[normalized] || null;
  }

  function buildReferenceRegex() {
    const bookNames = [
      "1\\s*Pedro",
      "2\\s*Pedro",
      "1\\s*Jo[aã]o",
      "2\\s*Jo[aã]o",
      "3\\s*Jo[aã]o",
      "1\\s*Cor[ií]ntios",
      "2\\s*Cor[ií]ntios",
      "1\\s*Tessalonicenses",
      "2\\s*Tessalonicenses",
      "1\\s*Tim[oó]teo",
      "2\\s*Tim[oó]teo",
      "1\\s*Samuel",
      "2\\s*Samuel",
      "1\\s*Reis",
      "2\\s*Reis",
      "1\\s*Cr[oô]nicas",
      "2\\s*Cr[oô]nicas",

      "1\\s*Pe",
      "2\\s*Pe",
      "1Pe",
      "2Pe",

      "1\\s*Co",
      "2\\s*Co",
      "1Co",
      "2Co",

      "1\\s*Ts",
      "2\\s*Ts",
      "1Ts",
      "2Ts",

      "1\\s*Tm",
      "2\\s*Tm",
      "1Tm",
      "2Tm",

      "G[eê]nesis",
      "Gn",
      "Êxodo",
      "Exodo",
      "Ex",
      "Lev[ií]tico",
      "Lv",
      "N[uú]meros",
      "Nm",
      "Deuteron[oô]mio",
      "Dt",
      "Josu[eé]",
      "Js",
      "Ju[ií]zes",
      "Jz",
      "Rute",
      "Rt",
      "Esdras",
      "Ed",
      "Neemias",
      "Ne",
      "Ester",
      "Et",
      "J[oó]",
      "Salmos?",
      "Sl",
      "Prov[eé]rbios",
      "Pv",
      "Eclesiastes",
      "Ec",
      "Cantares",
      "Ct",
      "Isa[ií]as",
      "Is",
      "Jeremias",
      "Jr",
      "Lamenta[cç][oõ]es",
      "Lm",
      "Ezequiel",
      "Ez",
      "Daniel",
      "Dn",
      "Os[eé]ias",
      "Os",
      "Joel",
      "Jl",
      "Am[oó]s",
      "Am",
      "Obadias",
      "Ob",
      "Jonas",
      "Jn",
      "Miqu[eé]ias",
      "Mq",
      "Naum",
      "Na",
      "Habacuque",
      "Hc",
      "Sofonias",
      "Sf",
      "Ageu",
      "Ag",
      "Zacarias",
      "Zc",
      "Malaquias",
      "Ml",

      "Mateus",
      "Mt",
      "Marcos",
      "Mc",
      "Lucas",
      "Lc",
      "Jo[aã]o",
      "Jo",
      "Atos",
      "At",
      "Romanos",
      "Rm",
      "G[aá]latas",
      "Gl",
      "Ef[eé]sios",
      "Ef",
      "Filipenses",
      "Fp",
      "Colossenses",
      "Cl",
      "Tito",
      "Tt",
      "Filemom",
      "Filemon",
      "Fil[eê]mon",
      "Fm",
      "Hebreus",
      "Hb",
      "Tiago",
      "Tg",
      "Judas",
      "Jd",
      "Apocalipse",
      "Ap"
    ];

    const bookPattern = bookNames.join("|");

    return new RegExp(
      "(^|[^\\p{L}\\p{N}_])" +
        "(" + bookPattern + ")" +
        "\\.?" +
        "\\s*" +
        "(\\d{1,3})" +
        "(?:" +
          "\\s*[:\\.]\\s*" +
          "(" +
            "\\d{1,3}" +
            "(?:\\s*[-–—]\\s*\\d{1,3})?" +
            "(?:\\s*,\\s*\\d{1,3}(?:\\s*[-–—]\\s*\\d{1,3})?)*" +
          ")" +
        ")?" +
        "(?![\\p{L}\\p{N}_])",
      "giu"
    );
  }

  function parseVerseSpec(verseSpec, maxVerse) {
    if (!verseSpec) {
      return null;
    }

    const selected = [];

    verseSpec
      .replace(/[–—]/g, "-")
      .split(",")
      .map(part => part.trim())
      .filter(Boolean)
      .forEach(part => {
        if (part.includes("-")) {
          const [startRaw, endRaw] = part.split("-");
          const start = parseInt(startRaw.trim(), 10);
          const end = parseInt(endRaw.trim(), 10);

          if (
            Number.isInteger(start) &&
            Number.isInteger(end) &&
            start >= 1 &&
            end >= start
          ) {
            for (let i = start; i <= end && i <= maxVerse; i++) {
              selected.push(i);
            }
          }
        } else {
          const verse = parseInt(part, 10);

          if (
            Number.isInteger(verse) &&
            verse >= 1 &&
            verse <= maxVerse
          ) {
            selected.push(verse);
          }
        }
      });

    return [...new Set(selected)];
  }

  function getPassage(abbrev, chapterNumber, verseSpec) {
    const book = bibleByAbbrev[abbrev];

    if (!book) {
      log("Livro não encontrado no JSON:", abbrev);
      return null;
    }

    const chapterIndex = chapterNumber - 1;
    const chapter = book.chapters[chapterIndex];

    if (!Array.isArray(chapter)) {
      log("Capítulo não encontrado:", abbrev, chapterNumber);
      return null;
    }

    const verseNumbers = parseVerseSpec(verseSpec, chapter.length);

    if (!verseNumbers) {
      return {
        bookName: book.name || abbrev,
        verses: chapter.map((text, index) => ({
          number: index + 1,
          text
        }))
      };
    }

    if (!verseNumbers.length) {
      log("Versículos não encontrados:", abbrev, chapterNumber, verseSpec);
      return null;
    }

    return {
      bookName: book.name || abbrev,
      verses: verseNumbers.map(number => ({
        number,
        text: chapter[number - 1]
      }))
    };
  }

  function buildTooltipHtml(label, passage) {
    const versesHtml = passage.verses
      .map(item => {
        return (
          "<p class='otica-bible-tooltip-verse'>" +
          "<sup>" + escapeHtml(item.number) + "</sup> " +
          escapeHtml(item.text) +
          "</p>"
        );
      })
      .join("");

    return (
      "<div class='otica-bible-tooltip-title'>" +
      escapeHtml(label) +
      " <span>" + escapeHtml(CONFIG.version) + "</span>" +
      "</div>" +
      "<div class='otica-bible-tooltip-body'>" +
      versesHtml +
      "</div>"
    );
  }

  function removeTooltip() {
    if (tooltip) {
      tooltip.remove();
      tooltip = null;
    }
  }

  function showTooltip(target) {
    removeTooltip();

    const abbrev = target.getAttribute("data-book");
    const chapter = parseInt(target.getAttribute("data-chapter"), 10);
    const verses = target.getAttribute("data-verses") || "";
    const label = target.getAttribute("data-label") || target.textContent;

    const passage = getPassage(abbrev, chapter, verses);

    if (!passage) {
      return;
    }

    tooltip = document.createElement("div");
    tooltip.className = "otica-bible-tooltip";
    tooltip.innerHTML = buildTooltipHtml(label, passage);

    document.body.appendChild(tooltip);

    const rect = target.getBoundingClientRect();
    const tooltipRect = tooltip.getBoundingClientRect();

    let top = rect.bottom + window.scrollY + 8;
    let left = rect.left + window.scrollX;

    if (left + tooltipRect.width > window.scrollX + window.innerWidth - 12) {
      left = window.scrollX + window.innerWidth - tooltipRect.width - 12;
    }

    if (left < window.scrollX + 12) {
      left = window.scrollX + 12;
    }

    tooltip.style.top = top + "px";
    tooltip.style.left = left + "px";
  }

  function injectStyles() {
    if (document.getElementById("otica-bible-tooltip-style")) {
      return;
    }

    const style = document.createElement("style");
    style.id = "otica-bible-tooltip-style";
    style.textContent = `
      .otica-bible-ref {
        color: #005c6b;
        border-bottom: 1px dotted #005c6b;
        cursor: help;
        text-decoration: none;
        font-weight: 600;
      }

      .otica-bible-ref:hover {
        color: #003f49;
        border-bottom-style: solid;
      }

      .otica-bible-tooltip {
        position: absolute;
        z-index: 999999;
        width: min(390px, calc(100vw - 24px));
        max-height: min(420px, calc(100vh - 32px));
        overflow: hidden;
        background: #ffffff;
        color: #222222;
        border: 1px solid #d4d4d4;
        border-radius: 8px;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.22);
        font-family: Arial, sans-serif;
        font-size: 14px;
        line-height: 1.45;
        display: flex;
        flex-direction: column;
      }

      .otica-bible-tooltip-title {
        background: #005c6b;
        color: #ffffff;
        padding: 9px 12px;
        font-weight: 700;
        text-align: center;
        border-radius: 8px 8px 0 0;
        flex: 0 0 auto;
      }

      .otica-bible-tooltip-title span {
        font-weight: 400;
        opacity: 0.9;
      }

      .otica-bible-tooltip-body {
        padding: 10px 12px;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
        overscroll-behavior: contain;
      }

      .otica-bible-tooltip-verse {
        margin: 0 0 8px 0;
      }

      .otica-bible-tooltip-verse:last-child {
        margin-bottom: 0;
      }

      .otica-bible-tooltip sup {
        color: #005c6b;
        font-weight: 700;
        margin-right: 3px;
      }
    `;

    document.head.appendChild(style);
  }

  function shouldSkipNode(node) {
    const parent = node.parentElement;

    if (!parent) {
      return true;
    }

    const tag = parent.tagName.toLowerCase();

    if (SKIP_TAGS.has(tag)) {
      return true;
    }

    if (parent.closest(SKIP_SELECTOR)) {
      return true;
    }

    return false;
  }

  function processTextNode(node, referenceRegex) {
    if (shouldSkipNode(node)) {
      return 0;
    }

    const text = node.nodeValue;

    if (!text || !text.trim()) {
      return 0;
    }

    referenceRegex.lastIndex = 0;

    let match;
    let lastIndex = 0;
    let found = 0;
    const fragment = document.createDocumentFragment();

    while ((match = referenceRegex.exec(text)) !== null) {
      const fullMatch = match[0];
      const prefix = match[1] || "";
      const rawBook = match[2] || "";
      const rawChapter = match[3] || "";
      const rawVerses = match[4] || "";

      const referenceStart = match.index + prefix.length;
      const referenceText = fullMatch.slice(prefix.length);

            const abbrev = getBookAbbrev(rawBook);
      let chapter = parseInt(rawChapter, 10);
      let verses = rawVerses;

      if (!abbrev || !Number.isInteger(chapter)) {
        continue;
      }

      if (SINGLE_CHAPTER_BOOKS.has(abbrev) && !verses) {
        verses = String(chapter);
        chapter = 1;
      }

      const passage = getPassage(abbrev, chapter, verses);

      if (!passage) {
        continue;
      }

      fragment.appendChild(
        document.createTextNode(text.slice(lastIndex, referenceStart))
      );

      const span = document.createElement("span");
      span.className = "otica-bible-ref";
      span.textContent = referenceText;
      span.setAttribute("data-book", abbrev);
      span.setAttribute("data-chapter", String(chapter));
      span.setAttribute("data-verses", verses.replace(/\s+/g, ""));
      span.setAttribute("data-label", referenceText);
      fragment.appendChild(span);

      lastIndex = match.index + fullMatch.length;
      found++;
    }

    if (!found) {
      return 0;
    }

    fragment.appendChild(document.createTextNode(text.slice(lastIndex)));
    node.parentNode.replaceChild(fragment, node);

    return found;
  }

  function processPage() {
    const referenceRegex = buildReferenceRegex();

    const contentSelectors = [
      ".post-body",
      ".entry-content",
      ".post",
      "article",
      "#Blog1",
      ".blog-posts"
    ];

    let roots = [];

    contentSelectors.forEach(selector => {
      document.querySelectorAll(selector).forEach(element => {
        if (!roots.includes(element)) {
          roots.push(element);
        }
      });
    });

    if (!roots.length) {
      roots = [document.body];
    }

    const textNodes = [];

    roots.forEach(root => {
      const walker = document.createTreeWalker(
        root,
        NodeFilter.SHOW_TEXT,
        {
          acceptNode(node) {
            const parent = node.parentElement;

            if (!parent) {
              return NodeFilter.FILTER_REJECT;
            }

            const tag = parent.tagName.toLowerCase();

            if (SKIP_TAGS.has(tag)) {
              return NodeFilter.FILTER_REJECT;
            }

            if (parent.closest(".otica-bible-tooltip")) {
              return NodeFilter.FILTER_REJECT;
            }

            if (
              parent.closest(
                "script, style, iframe, noscript, textarea, input, select, option, code, pre"
              )
            ) {
              return NodeFilter.FILTER_REJECT;
            }

            if (!node.nodeValue || !node.nodeValue.trim()) {
              return NodeFilter.FILTER_REJECT;
            }

            return NodeFilter.FILTER_ACCEPT;
          }
        }
      );

      let node;

      while ((node = walker.nextNode())) {
        if (!textNodes.includes(node)) {
          textNodes.push(node);
        }
      }
    });

    let total = 0;

    textNodes.forEach(textNode => {
      total += processTextNode(textNode, referenceRegex);
    });

    console.log("Ótica Reformada VerseLinker ACF: áreas analisadas:", roots.length);
    console.log("Ótica Reformada VerseLinker ACF: nós de texto analisados:", textNodes.length);
    console.log("Ótica Reformada VerseLinker ACF: referências processadas:", total);
  }

  function setupEvents() {
    document.addEventListener("mouseover", function (event) {
      const target = event.target.closest(".otica-bible-ref");

      if (!target) {
        return;
      }

      showTooltip(target);
    });

    document.addEventListener("mouseout", function (event) {
      const target = event.target.closest(".otica-bible-ref");

      if (!target) {
        return;
      }

      if (
        tooltip &&
        event.relatedTarget &&
        tooltip.contains(event.relatedTarget)
      ) {
        return;
      }

      setTimeout(function () {
        if (
          !document.querySelector(".otica-bible-ref:hover") &&
          !(tooltip && tooltip.matches(":hover"))
        ) {
          removeTooltip();
        }
      }, 120);
    });

    document.addEventListener(
      "touchstart",
      function (event) {
        const tooltipTarget = event.target.closest(".otica-bible-tooltip");

        if (tooltipTarget) {
          return;
        }

        const target = event.target.closest(".otica-bible-ref");

        if (!target) {
          removeTooltip();
          return;
        }

        event.preventDefault();
        showTooltip(target);
      },
      { passive: false }
    );
  }

  async function init() {
    try {
      injectStyles();

      const response = await fetch(CONFIG.bibleJsonUrl);

      if (!response.ok) {
        throw new Error("Falha ao carregar ACF.json. Status: " + response.status);
      }

      const bible = await response.json();

      bibleByAbbrev = {};

      bible.forEach(book => {
        if (book && book.abbrev) {
          bibleByAbbrev[String(book.abbrev).toLowerCase()] = book;
        }
      });

      setupEvents();
      processPage();

      console.log("Ótica Reformada VerseLinker ACF carregado com sucesso.");
    } catch (error) {
      console.error("Erro no Ótica Reformada VerseLinker ACF:", error);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
