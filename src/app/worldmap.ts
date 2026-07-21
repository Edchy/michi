// World-map data: the course as a sequence of MODULES threaded into ONE continuous
// path. Positions are global canvas px — module 1 flows into module 2 into module 3,
// one walkable road. The camera pans/zooms/glides over it; you can also zoom out to a
// module CHAIN to jump between modules without scrolling the whole line (the answer to
// "this won't scale to 100 stations by scrolling"). Two ways to move, one world.
//
// Structure mirrors the authored roster in docs/curriculum/stations.md (Month 1).
// `href` is set only where a lesson actually exists yet (Station 1 today).

export type Station = {
  id: string;
  n: number;       // global station number (1..N across all modules)
  title: string;
  href?: string;   // set when the station is playable
  x: number;       // GLOBAL canvas coords — the path threads all modules in order
  y: number;
};

export type Module = {
  id: string;
  n: number;       // module number (1..)
  title: string;
  stations: Station[];
};

export type BookStop = {
  id: string;
  title: string;
  href: string;
  unlockAfterStation: number;
  x: number;
  y: number;
};

// One continuous path flowing left→right. y alternates to keep the curve lively;
// x steps ~320 per station and continues rightward across module boundaries.
export const MODULES: Module[] = [
  {
    id: "first-sounds", n: 1, title: "First sounds",
    stations: [
      { id: "vowels",       n: 1, title: "First sounds",     href: "/modules/first-sounds", x: 240, y: 620 },
      { id: "k-row",        n: 2, title: "The K row",        x: 560,  y: 470 },
      { id: "look-back-1",  n: 3, title: "A first look back", x: 880,  y: 560 },
    ],
  },
  {
    id: "reading-on", n: 2, title: "Reading on",
    stations: [
      { id: "s-row",        n: 4, title: "The S row",        x: 1200, y: 400 },
      { id: "t-row",        n: 5, title: "The T row",        x: 1520, y: 560 },
      { id: "n-row",        n: 6, title: "The N row",        x: 1840, y: 440 },
      { id: "snapshot-1",   n: 7, title: "Halfway snapshot", x: 2160, y: 580 },
    ],
  },
  {
    id: "completing-kana", n: 3, title: "Completing the kana",
    stations: [
      { id: "h-row",        n: 8,  title: "The H row",       x: 2480, y: 420 },
      { id: "m-row",        n: 9,  title: "The M row",       x: 2800, y: 560 },
      { id: "yw-rows",      n: 10, title: "The Y & W rows",  x: 3120, y: 400 },
      { id: "r-row-n",      n: 11, title: "The R row & ん",   x: 3440, y: 540 },
    ],
  },
  {
    id: "words-grammar", n: 4, title: "First words & grammar",
    stations: [
      { id: "mastery",      n: 12, title: "Hiragana mastery", x: 3760, y: 420 },
      { id: "words-nature", n: 13, title: "Words of nature",  x: 4080, y: 560 },
      { id: "words-animals",n: 14, title: "Words of animals", x: 4400, y: 440 },
      { id: "first-sentence",n: 15, title: "A first sentence", x: 4720, y: 580 },
      { id: "hiragana-complete", n: 16, title: "Hiragana complete", x: 5040, y: 440 },
    ],
  },
];

// flattened station list in global order — the path threads through all of them
export const STATIONS: Station[] = MODULES.flatMap((m) => m.stations);
export const TOTAL_STATIONS = STATIONS.length;

export const BOOK_STOPS: BookStop[] = [
  {
    id: "three-scripts-one-language",
    title: "Three scripts, one language",
    href: "/codex/three-scripts-one-language",
    unlockAfterStation: 1,
    x: 380,
    y: 539,
  },
];

// which module a global station index belongs to
export function moduleOfStation(index: number): number {
  let seen = 0;
  for (let m = 0; m < MODULES.length; m++) {
    seen += MODULES[m]!.stations.length;
    if (index < seen) return m;
  }
  return MODULES.length - 1;
}

// global index of the first station in a module
export function firstStationOfModule(m: number): number {
  let seen = 0;
  for (let i = 0; i < m; i++) seen += MODULES[i]!.stations.length;
  return seen;
}

// completion state of a whole module, given the global furthest-unlocked position
export type ModuleState = "done" | "current" | "locked";
export function moduleState(m: number, position: number): ModuleState {
  const start = firstStationOfModule(m);
  const end = start + MODULES[m]!.stations.length; // exclusive
  if (position >= end) return "done";
  if (position >= start) return "current";
  return "locked";
}
