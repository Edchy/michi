export type CodexSection = {
  heading: string;
  paragraphs: readonly string[];
};

export type CodexEntry = {
  slug: string;
  title: string;
  summary: string;
  unlockAfterStation: number;
  sections: readonly CodexSection[];
};

export const CODEX_ENTRIES: readonly CodexEntry[] = [
  {
    slug: "three-scripts-one-language",
    title: "Three scripts, one language",
    summary: "Where the three scripts came from, and why Japanese kept all of them.",
    unlockAfterStation: 1,
    sections: [
      {
        heading: "Japan borrowed a writing system that did not fit",
        paragraphs: [
          "Japanese was spoken for a long time before it was written. When writing arrived, around the fifth century, it arrived as Chinese: characters designed for a language with different sounds and, crucially, different grammar.",
          "Chinese words do not change shape. Japanese words do: verbs take endings, and small grammatical words hold a sentence together. Chinese characters had no way to write those endings. Scribes were left spelling out Japanese sounds using characters chosen only for their pronunciation, ignoring their meaning. It was slow to write and ambiguous to read.",
        ],
      },
      {
        heading: "Two scripts, invented from the same source",
        paragraphs: [
          "The fix was to simplify. Writers took characters used purely for sound and wore them down into something quicker. Hiragana came from cursive, flowing versions of whole characters. あ is a run-down form of 安, and you can still see the family resemblance. That rounded, sweeping quality is why hiragana looks the way it does.",
          "Katakana was cut from the same cloth but with a different method: monks annotating Chinese texts took a single fragment of a character as shorthand. カ is the left portion of 加. Taking pieces rather than whole cursive shapes is exactly why katakana looks angular where hiragana looks soft.",
          "So the two scripts you will learn are not arbitrary. They are two different ways of abbreviating the same original characters, and each kept the shape of the method that made it.",
        ],
      },
      {
        heading: "Why not simplify further and drop the rest?",
        paragraphs: [
          "It is a fair question, since hiragana alone can write every Japanese sound. The obstacle is that Japanese has a great many words that sound identical. Written in kanji they are plainly different words; written only in kana they collapse into each other, and the reader has to work them out from context.",
          "Kanji also does a job that spaces do in English. Japanese is written without spaces between words. Because kanji tends to carry the meaning-bearing parts and hiragana the grammatical glue, the switch between scripts shows the eye where one word ends and the next begins. Text in pure hiragana is genuinely harder to read, not easier.",
        ],
      },
      {
        heading: "What this means for your reading",
        paragraphs: [
          "Each script signals something before you have even read the word. Katakana suggests a word that came from outside Japanese, sometimes from a long way back: パン, bread, arrived from Portuguese pão some four hundred years ago. Kanji marks the content of a sentence. Hiragana carries the grammar.",
          "Borrowed does not mean less Japanese. カメラ is the ordinary word for camera. Japanese coined its own term, 写真機, 'photograph machine', but it now sounds as dated as 'motorcar' and the borrowed word won. Every language does this; English took piano from Italian and shampoo from Hindi and absorbed them without a trace. Japanese absorbs them just as completely, but the writing system keeps the receipt: a word in katakana wears its history on its face.",
          "You can watch all three share the work in a single sentence: 私はコーヒーを飲みます, 'I drink coffee.' 私 and 飲 are kanji, carrying the meanings: I, drink. コーヒー is katakana: coffee, a borrowed word. Everything else is hiragana, bending those pieces into a sentence. Real Japanese text switches script every few characters, and each switch tells the eye something.",
          "You do not need to hold any of this in your head while you practise. It is here so that when katakana and kanji arrive, they arrive as parts of a system you already understand rather than as two more piles of memorisation.",
        ],
      },
    ],
  },
  {
    slug: "why-the-kana-are-ordered",
    title: "Why the kana are ordered as they are",
    summary: "あいうえお is not an alphabet. It is a grid, and you have been filling it in.",
    unlockAfterStation: 8,
    sections: [
      {
        heading: "A table, not a list",
        paragraphs: [
          "English sorts by an alphabet: a flat sequence of 26 letters in an order with no logic to it, memorised as a song. Japanese sorts by a table. It is called the gojūon (五十音, 'fifty sounds'), and it is five columns wide and ten rows deep.",
          "The columns are the five vowels, always in the order あ い う え お. The rows are consonants. Read across a row and you get that consonant joined to each vowel in turn: か き く け こ, さ し す せ そ, た ち つ て と. Every row you have learned so far has been one line of this table.",
          "That is why the vowels came first. They are not simply the first five characters; they are the axis the rest of the set is built on. Learning them bought you the shape of all 46.",
        ],
      },
      {
        heading: "Why fifty, when there are only 46?",
        paragraphs: [
          "Ten rows times five columns is fifty slots, but the grid is not completely full. The y-row has only や ゆ よ; the sounds that would sit in the い and え columns dropped out of the language long ago. The w-row has kept わ and を and lost the rest.",
          "One character sits outside the table altogether: ん. Every other kana is a whole syllable: a consonant and a vowel together, or a vowel alone. ん is a bare consonant sound, the only one Japanese writes on its own, and it belongs to no row and no column.",
          "So the count lands at 46 while the name kept the rounder, older number. This is normal for the grid: it describes the sound system as it was, and the language moved.",
        ],
      },
      {
        heading: "Where the table bends",
        paragraphs: [
          "A few cells do not say what their position predicts. In the s-row, し is said 'shi' rather than 'si'. In the t-row, ち is 'chi' and つ is 'tsu'. Later, in the h-row, ふ comes out closer to 'fu' than 'hu'.",
          "These are not errors or exceptions to be dreaded. The grid is organised by how the sounds pattern in Japanese, and in a few places the actual pronunciation drifted while the slot stayed put. You learn the four or five that bend, and the rest of the table behaves.",
          "It is also a clean illustration of why Michi does not teach through romaji. Spelled in Latin letters, し and ち look like arbitrary exceptions to a rule. Learned as kana in their place in the grid, they are simply what those cells sound like.",
        ],
      },
      {
        heading: "It is the order everything is sorted in",
        paragraphs: [
          "Gojūon order is Japanese's A-B-C, and it does the same practical work. Dictionaries are ordered by it. So are indexes, class registers, phone directories, the name fields on forms, and the tabs down the side of a filing system.",
          "This is the quiet reason to know the sequence rather than just the characters. Being able to read あ い う え お is recognition. Knowing that さ comes before た, which comes before な, is what lets you actually find something in a Japanese dictionary.",
        ],
      },
      {
        heading: "What you have filled in so far",
        paragraphs: [
          "You know the vowel row and the k, s, t and n rows: the top five lines of the table, twenty-five characters. Everything still ahead of you is the same shape: h, m, y, r, w, and then ん on its own at the end.",
          "There is no new system to learn from here. There are only more rows.",
        ],
      },
    ],
  },
] as const;

export function codexEntry(slug: string): CodexEntry | undefined {
  return CODEX_ENTRIES.find((entry) => entry.slug === slug);
}
