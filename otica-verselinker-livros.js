/*
 * Ótica Reformada VerseLinker - Livros Bíblicos
 *
 * Este arquivo centraliza nomes, siglas, abreviações e padrões
 * de reconhecimento dos livros da Bíblia.
 *
 * Objetivo:
 * - evitar mexer no script principal quando uma referência não for reconhecida;
 * - permitir adicionar novas formas de escrita dos livros bíblicos;
 * - manter nomes completos para exibição na tooltip.
 */

window.OTICA_VERSELINKER_BOOKS_EXTRA = {
  aliases: {
    /*
     * Antigo Testamento
     */

    // Gênesis
    "gn": "gn",
    "gen": "gn",
    "gen.": "gn",
    "gên": "gn",
    "gên.": "gn",
    "genesis": "gn",
    "gênesis": "gn",

    // Êxodo
    "ex": "ex",
    "ex.": "ex",
    "exo": "ex",
    "exo.": "ex",
    "exodo": "ex",
    "êxodo": "ex",

    // Levítico
    "lv": "lv",
    "lv.": "lv",
    "lev": "lv",
    "lev.": "lv",
    "levitico": "lv",
    "levítico": "lv",

    // Números
    "nm": "nm",
    "nm.": "nm",
    "num": "nm",
    "num.": "nm",
    "números": "nm",
    "numeros": "nm",

    // Deuteronômio
    "dt": "dt",
    "dt.": "dt",
    "deut": "dt",
    "deut.": "dt",
    "deuteronomio": "dt",
    "deuteronômio": "dt",

    // Josué
    "js": "js",
    "js.": "js",
    "jos": "js",
    "jos.": "js",
    "josue": "js",
    "josué": "js",

    // Juízes
    "jz": "jz",
    "jz.": "jz",
    "juizes": "jz",
    "juízes": "jz",

    // Rute
    "rt": "rt",
    "rt.": "rt",
    "rute": "rt",

    // 1 Samuel
    "1sm": "1sm",
    "1 sm": "1sm",
    "1sm.": "1sm",
    "1 sm.": "1sm",
    "1 samuel": "1sm",
    "i samuel": "1sm",
    "primeiro samuel": "1sm",

    // 2 Samuel
    "2sm": "2sm",
    "2 sm": "2sm",
    "2sm.": "2sm",
    "2 sm.": "2sm",
    "2 samuel": "2sm",
    "ii samuel": "2sm",
    "segundo samuel": "2sm",

    // 1 Reis
    "1rs": "1rs",
    "1 rs": "1rs",
    "1rs.": "1rs",
    "1 rs.": "1rs",
    "1 reis": "1rs",
    "i reis": "1rs",
    "primeiro reis": "1rs",
    "primeiro livro dos reis": "1rs",

    // 2 Reis
    "2rs": "2rs",
    "2 rs": "2rs",
    "2rs.": "2rs",
    "2 rs.": "2rs",
    "2 reis": "2rs",
    "ii reis": "2rs",
    "segundo reis": "2rs",
    "segundo livro dos reis": "2rs",

    // 1 Crônicas
    "1cr": "1cr",
    "1 cr": "1cr",
    "1cr.": "1cr",
    "1 cr.": "1cr",
    "1 cronicas": "1cr",
    "1 crônicas": "1cr",
    "i cronicas": "1cr",
    "i crônicas": "1cr",
    "primeiro cronicas": "1cr",
    "primeiro crônicas": "1cr",

    // 2 Crônicas
    "2cr": "2cr",
    "2 cr": "2cr",
    "2cr.": "2cr",
    "2 cr.": "2cr",
    "2 cronicas": "2cr",
    "2 crônicas": "2cr",
    "ii cronicas": "2cr",
    "ii crônicas": "2cr",
    "segundo cronicas": "2cr",
    "segundo crônicas": "2cr",

    // Esdras
    "ed": "ed",
    "ed.": "ed",
    "esd": "ed",
    "esd.": "ed",
    "esdras": "ed",

    // Neemias
    "ne": "ne",
    "ne.": "ne",
    "nee": "ne",
    "nee.": "ne",
    "neemias": "ne",

    // Ester
    "et": "et",
    "et.": "et",
    "est": "et",
    "est.": "et",
    "ester": "et",

    // Jó
    "jó": "jó",
    "jo": "jó",
    "jô": "jó",
    "job": "jó",

    // Salmos
    "sl": "sl",
    "sl.": "sl",
    "sal": "sl",
    "sal.": "sl",
    "salm": "sl",
    "salmo": "sl",
    "salmos": "sl",

    // Provérbios
    "pv": "pv",
    "pv.": "pv",
    "prov": "pv",
    "prov.": "pv",
    "proverbios": "pv",
    "provérbios": "pv",

    // Eclesiastes
    "ec": "ec",
    "ec.": "ec",
    "ecl": "ec",
    "ecl.": "ec",
    "eclesiastes": "ec",

    // Cantares
    "ct": "ct",
    "ct.": "ct",
    "cant": "ct",
    "cant.": "ct",
    "cantares": "ct",
    "canticos": "ct",
    "cânticos": "ct",
    "cantares de salomao": "ct",
    "cantares de salomão": "ct",
    "cântico dos cânticos": "ct",
    "cantico dos canticos": "ct",

    // Isaías
    "is": "is",
    "is.": "is",
    "isa": "is",
    "isa.": "is",
    "isaias": "is",
    "isaías": "is",

    // Jeremias
    "jr": "jr",
    "jr.": "jr",
    "jer": "jr",
    "jer.": "jr",
    "jeremias": "jr",

    // Lamentações
    "lm": "lm",
    "lm.": "lm",
    "lam": "lm",
    "lam.": "lm",
    "lamentacoes": "lm",
    "lamentações": "lm",
    "lamentacoes de jeremias": "lm",
    "lamentações de jeremias": "lm",

    // Ezequiel
    "ez": "ez",
    "ez.": "ez",
    "ezeq": "ez",
    "ezeq.": "ez",
    "ezequiel": "ez",

    // Daniel
    "dn": "dn",
    "dn.": "dn",
    "dan": "dn",
    "dan.": "dn",
    "daniel": "dn",

    // Oseias
    "os": "os",
    "os.": "os",
    "oseias": "os",
    "oséias": "os",

    // Joel
    "jl": "jl",
    "jl.": "jl",
    "joel": "jl",

    // Amós
    "am": "am",
    "am.": "am",
    "amos": "am",
    "amós": "am",

    // Obadias
    "ob": "ob",
    "ob.": "ob",
    "obadias": "ob",

    // Jonas
    "jn": "jn",
    "jn.": "jn",
    "jonas": "jn",

    // Miqueias
    "mq": "mq",
    "mq.": "mq",
    "miq": "mq",
    "miq.": "mq",
    "miqueias": "mq",
    "miquéias": "mq",

    // Naum
    "na": "na",
    "na.": "na",
    "naum": "na",

    // Habacuque
    "hc": "hc",
    "hc.": "hc",
    "hab": "hc",
    "hab.": "hc",
    "habacuque": "hc",

    // Sofonias
    "sf": "sf",
    "sf.": "sf",
    "sof": "sf",
    "sof.": "sf",
    "sofonias": "sf",

    // Ageu
    "ag": "ag",
    "ag.": "ag",
    "ageu": "ag",

    // Zacarias
    "zc": "zc",
    "zc.": "zc",
    "zac": "zc",
    "zac.": "zc",
    "zacarias": "zc",

    // Malaquias
    "ml": "ml",
    "ml.": "ml",
    "mal": "ml",
    "mal.": "ml",
    "malaquias": "ml",

    /*
     * Novo Testamento
     */

    // Mateus
    "mt": "mt",
    "mt.": "mt",
    "mateus": "mt",

    // Marcos
    "mc": "mc",
    "mc.": "mc",
    "marcos": "mc",

    // Lucas
    "lc": "lc",
    "lc.": "lc",
    "lucas": "lc",

    // João
    "jo": "jo",
    "jo.": "jo",
    "joao": "jo",
    "joão": "jo",
    "sao joao": "jo",
    "são joão": "jo",
    "evangelho de joao": "jo",
    "evangelho de joão": "jo",

    // Atos
    "at": "atos",
    "at.": "atos",
    "atos": "atos",
    "atos dos apostolos": "atos",
    "atos dos apóstolos": "atos",

    // Romanos
    "rm": "rm",
    "rm.": "rm",
    "rom": "rm",
    "rom.": "rm",
    "romanos": "rm",

    // 1 Coríntios
    "1co": "1co",
    "1 co": "1co",
    "1co.": "1co",
    "1 co.": "1co",
    "1 cor": "1co",
    "1 cor.": "1co",
    "1 corintios": "1co",
    "1 coríntios": "1co",
    "i corintios": "1co",
    "i coríntios": "1co",
    "primeiro corintios": "1co",
    "primeiro coríntios": "1co",
    "i co": "1co",
"i co.": "1co",
"i cor": "1co",
"i cor.": "1co",
"i corintios": "1co",
"i coríntios": "1co",

    // 2 Coríntios
    "2co": "2co",
    "2 co": "2co",
    "2co.": "2co",
    "2 co.": "2co",
    "2 cor": "2co",
    "2 cor.": "2co",
    "2 corintios": "2co",
    "2 coríntios": "2co",
    "ii corintios": "2co",
    "ii coríntios": "2co",
    "segundo corintios": "2co",
    "segundo coríntios": "2co",
    "ii co": "2co",
"ii co.": "2co",
"ii cor": "2co",
"ii cor.": "2co",
"ii corintios": "2co",
"ii coríntios": "2co",

    // Gálatas
    "gl": "gl",
    "gl.": "gl",
    "gal": "gl",
    "gal.": "gl",
    "galatas": "gl",
    "gálatas": "gl",

    // Efésios
    "ef": "ef",
    "ef.": "ef",
    "efesios": "ef",
    "efésios": "ef",

    // Filipenses
    "fp": "fp",
    "fp.": "fp",
    "fl": "fp",
    "fl.": "fp",
    "fil": "fp",
    "fil.": "fp",
    "filipenses": "fp",

    // Colossenses
    "cl": "cl",
    "cl.": "cl",
    "col": "cl",
    "col.": "cl",
    "colossenses": "cl",

    // 1 Tessalonicenses
    "1ts": "1ts",
    "1 ts": "1ts",
    "1ts.": "1ts",
    "1 ts.": "1ts",
    "1 tessalonicenses": "1ts",
    "i tessalonicenses": "1ts",
    "primeiro tessalonicenses": "1ts",
    "i ts": "1ts",
"i ts.": "1ts",
"i tess": "1ts",
"i tess.": "1ts",
"i tessalonicenses": "1ts",

    // 2 Tessalonicenses
    "2ts": "2ts",
    "2 ts": "2ts",
    "2ts.": "2ts",
    "2 ts.": "2ts",
    "2 tessalonicenses": "2ts",
    "ii tessalonicenses": "2ts",
    "segundo tessalonicenses": "2ts",
    "ii ts": "2ts",
"ii ts.": "2ts",
"ii tess": "2ts",
"ii tess.": "2ts",
"ii tessalonicenses": "2ts",

    // 1 Timóteo
    "1tm": "1tm",
    "1 tm": "1tm",
    "1tm.": "1tm",
    "1 tm.": "1tm",
    "1 timoteo": "1tm",
    "1 timóteo": "1tm",
    "i timoteo": "1tm",
    "i timóteo": "1tm",
    "primeiro timoteo": "1tm",
    "primeiro timóteo": "1tm",
    "i tm": "1tm",
"i tm.": "1tm",
"i tim": "1tm",
"i tim.": "1tm",
"i timoteo": "1tm",
"i timóteo": "1tm",

    // 2 Timóteo
    "2tm": "2tm",
    "2 tm": "2tm",
    "2tm.": "2tm",
    "2 tm.": "2tm",
    "2 timoteo": "2tm",
    "2 timóteo": "2tm",
    "ii timoteo": "2tm",
    "ii timóteo": "2tm",
    "segundo timoteo": "2tm",
    "segundo timóteo": "2tm",
    "ii tm": "2tm",
"ii tm.": "2tm",
"ii tim": "2tm",
"ii tim.": "2tm",
"ii timoteo": "2tm",
"ii timóteo": "2tm",

    // Tito
    "tt": "tt",
    "tt.": "tt",
    "tito": "tt",

    // Filemom
    "fm": "fm",
    "fm.": "fm",
    "filemom": "fm",
    "filemon": "fm",
    "filêmon": "fm",

    // Hebreus
    "hb": "hb",
    "hb.": "hb",
    "heb": "hb",
    "heb.": "hb",
    "hebreus": "hb",

    // Tiago
    "tg": "tg",
    "tg.": "tg",
    "tiago": "tg",

    // 1 Pedro
    "1pe": "1pe",
    "1 pe": "1pe",
    "1pe.": "1pe",
    "1 pe.": "1pe",
    "1 pedro": "1pe",
    "i pedro": "1pe",
    "primeiro pedro": "1pe",

    // 2 Pedro
    "2pe": "2pe",
    "2 pe": "2pe",
    "2pe.": "2pe",
    "2 pe.": "2pe",
    "2 pedro": "2pe",
    "ii pedro": "2pe",
    "segundo pedro": "2pe",

    // 1 João
    "1jo": "1jo",
    "1 jo": "1jo",
    "1jo.": "1jo",
    "1 jo.": "1jo",
    "1 joao": "1jo",
    "1 joão": "1jo",
    "i joao": "1jo",
    "i joão": "1jo",
    "primeiro joao": "1jo",
    "primeiro joão": "1jo",

    // 2 João
    "2jo": "2jo",
    "2 jo": "2jo",
    "2jo.": "2jo",
    "2 jo.": "2jo",
    "2 joao": "2jo",
    "2 joão": "2jo",
    "ii joao": "2jo",
    "ii joão": "2jo",
    "segundo joao": "2jo",
    "segundo joão": "2jo",

    // 3 João
    "3jo": "3jo",
    "3 jo": "3jo",
    "3jo.": "3jo",
    "3 jo.": "3jo",
    "3 joao": "3jo",
    "3 joão": "3jo",
    "iii joao": "3jo",
    "iii joão": "3jo",
    "terceiro joao": "3jo",
    "terceiro joão": "3jo",

    // Judas
    "jd": "jd",
    "jd.": "jd",
    "judas": "jd",

    // Apocalipse
    "ap": "ap",
    "ap.": "ap",
    "apo": "ap",
    "apo.": "ap",
    "apoc": "ap",
    "apoc.": "ap",
    "apocalipse": "ap",
    "revelacao": "ap",
    "revelação": "ap"
  },

  patterns: [
    /*
     * Antigo Testamento
     */
    "G[eê]nesis", "Gn", "Gen", "Gên",
    "Êxodo", "Exodo", "Ex", "Exo",
    "Lev[ií]tico", "Lv", "Lev",
    "N[uú]meros", "Nm", "Num",
    "Deuteron[oô]mio", "Dt", "Deut",
    "Josu[eé]", "Js", "Jos",
    "Ju[ií]zes", "Jz",
    "Rute", "Rt",
    "1\\s*Samuel", "1Samuel", "1\\s*Sm", "1Sm", "I\\s*Samuel",
    "2\\s*Samuel", "2Samuel", "2\\s*Sm", "2Sm", "II\\s*Samuel",
    "1\\s*Reis", "1Reis", "1\\s*Rs", "1Rs", "I\\s*Reis",
    "2\\s*Reis", "2Reis", "2\\s*Rs", "2Rs", "II\\s*Reis",
    "1\\s*Cr[oô]nicas", "1Cr[oô]nicas", "1\\s*Cr", "1Cr", "I\\s*Cr[oô]nicas",
    "2\\s*Cr[oô]nicas", "2Cr[oô]nicas", "2\\s*Cr", "2Cr", "II\\s*Cr[oô]nicas",
    "Esdras", "Ed", "Esd",
    "Neemias", "Ne", "Nee",
    "Ester", "Et", "Est",
    "J[oó]", "Job",
    "Salmos?", "Sl", "Sal",
    "Prov[eé]rbios", "Pv", "Prov",
    "Eclesiastes", "Ec", "Ecl",
    "Cantares", "Ct", "Cant", "C[aâ]nticos", "C[aâ]ntico\\s+dos\\s+C[aâ]nticos",
    "Isa[ií]as", "Is", "Isa",
    "Jeremias", "Jr", "Jer",
    "Lamenta[cç][oõ]es", "Lm", "Lam",
    "Ezequiel", "Ez", "Ezeq",
    "Daniel", "Dn", "Dan",
    "Os[eé]ias", "Os",
    "Joel", "Jl",
    "Am[oó]s", "Am",
    "Obadias", "Ob",
    "Jonas", "Jn",
    "Miqu[eé]ias", "Mq", "Miq",
    "Naum", "Na",
    "Habacuque", "Hc", "Hab",
    "Sofonias", "Sf", "Sof",
    "Ageu", "Ag",
    "Zacarias", "Zc", "Zac",
    "Malaquias", "Ml", "Mal",

    /*
     * Novo Testamento
     */
    "Mateus", "Mt",
    "Marcos", "Mc",
    "Lucas", "Lc",
    "Jo[aã]o", "Jo",
    "Atos", "At",
    "Romanos", "Rm", "Rom",
    "1\\s*Cor[ií]ntios", "1Cor[ií]ntios", "1\\s*Co", "1Co", "1\\s*Cor", "1Cor", "I\\s*Cor[ií]ntios",
    "2\\s*Cor[ií]ntios", "2Cor[ií]ntios", "2\\s*Co", "2Co", "2\\s*Cor", "2Cor", "II\\s*Cor[ií]ntios",
    "G[aá]latas", "Gl", "Gal",
    "Ef[eé]sios", "Ef",
    "Filipenses", "Fp", "Fl", "Fil",
    "Colossenses", "Cl", "Col",
    "1\\s*Tessalonicenses", "1Tessalonicenses", "1\\s*Ts", "1Ts", "I\\s*Tessalonicenses",
    "2\\s*Tessalonicenses", "2Tessalonicenses", "2\\s*Ts", "2Ts", "II\\s*Tessalonicenses",
    "1\\s*Tim[oó]teo", "1Tim[oó]teo", "1\\s*Tm", "1Tm", "I\\s*Tim[oó]teo",
    "2\\s*Tim[oó]teo", "2Tim[oó]teo", "2\\s*Tm", "2Tm", "II\\s*Tim[oó]teo",
    "Tito", "Tt",
    "Filemom", "Filemon", "Fil[eê]mon", "Fm",
    "Hebreus", "Hb", "Heb",
    "Tiago", "Tg",
    "1\\s*Pedro", "1Pedro", "1\\s*Pe", "1Pe", "I\\s*Pedro",
    "2\\s*Pedro", "2Pedro", "2\\s*Pe", "2Pe", "II\\s*Pedro",
    "1\\s*Jo[aã]o", "1Jo[aã]o", "1\\s*Jo", "1Jo", "I\\s*Jo[aã]o",
    "2\\s*Jo[aã]o", "2Jo[aã]o", "2\\s*Jo", "2Jo", "II\\s*Jo[aã]o",
    "3\\s*Jo[aã]o", "3Jo[aã]o", "3\\s*Jo", "3Jo", "III\\s*Jo[aã]o",
    "Judas", "Jd",
    "Apocalipse", "Ap", "Apo", "Apoc", "Revela[cç][aã]o",
    "I\\s*Co",
"I\\s*Cor",
"I\\s*Cor\\.",
"I\\s*Cor[ií]ntios",

"II\\s*Co",
"II\\s*Cor",
"II\\s*Cor\\.",
"II\\s*Cor[ií]ntios",

"I\\s*Ts",
"I\\s*Tess",
"I\\s*Tess\\.",
"I\\s*Tessalonicenses",

"II\\s*Ts",
"II\\s*Tess",
"II\\s*Tess\\.",
"II\\s*Tessalonicenses",

"I\\s*Tm",
"I\\s*Tim",
"I\\s*Tim\\.",
"I\\s*Tim[oó]teo",

"II\\s*Tm",
"II\\s*Tim",
"II\\s*Tim\\.",
"II\\s*Tim[oó]teo"
  ],

  displayNames: {
    "gn": "Gênesis",
    "ex": "Êxodo",
    "lv": "Levítico",
    "nm": "Números",
    "dt": "Deuteronômio",
    "js": "Josué",
    "jz": "Juízes",
    "rt": "Rute",
    "1sm": "1 Samuel",
    "2sm": "2 Samuel",
    "1rs": "1 Reis",
    "2rs": "2 Reis",
    "1cr": "1 Crônicas",
    "2cr": "2 Crônicas",
    "ed": "Esdras",
    "ne": "Neemias",
    "et": "Ester",
    "jó": "Jó",
    "sl": "Salmos",
    "pv": "Provérbios",
    "ec": "Eclesiastes",
    "ct": "Cantares",
    "is": "Isaías",
    "jr": "Jeremias",
    "lm": "Lamentações",
    "ez": "Ezequiel",
    "dn": "Daniel",
    "os": "Oseias",
    "jl": "Joel",
    "am": "Amós",
    "ob": "Obadias",
    "jn": "Jonas",
    "mq": "Miqueias",
    "na": "Naum",
    "hc": "Habacuque",
    "sf": "Sofonias",
    "ag": "Ageu",
    "zc": "Zacarias",
    "ml": "Malaquias",
    "mt": "Mateus",
    "mc": "Marcos",
    "lc": "Lucas",
    "jo": "João",
    "atos": "Atos",
    "rm": "Romanos",
    "1co": "1 Coríntios",
    "2co": "2 Coríntios",
    "gl": "Gálatas",
    "ef": "Efésios",
    "fp": "Filipenses",
    "cl": "Colossenses",
    "1ts": "1 Tessalonicenses",
    "2ts": "2 Tessalonicenses",
    "1tm": "1 Timóteo",
    "2tm": "2 Timóteo",
    "tt": "Tito",
    "fm": "Filemom",
    "hb": "Hebreus",
    "tg": "Tiago",
    "1pe": "1 Pedro",
    "2pe": "2 Pedro",
    "1jo": "1 João",
    "2jo": "2 João",
    "3jo": "3 João",
    "jd": "Judas",
    "ap": "Apocalipse"
  }
};
