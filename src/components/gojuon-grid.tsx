"use client";

import { GOJUON, GOJUON_COUNT } from "@/content/gojuon";

/**
 * The whole hiragana table, shown at the end of a station as a map of what is done and
 * what is ahead.
 *
 * Three row states, deliberately distinct: `known` rows are filled in solid ink,
 * `arriving` animates into that state cell by cell (the row just earned), and
 * everything else stays quiet. `next` merely outlines a row the learner has *not*
 * learned yet, so it can be pointed at without being claimed as known.
 */
export function GojuonGrid({
  known = [],
  arriving,
  next,
  caption = true,
}: {
  known?: string[];
  arriving?: string;
  /** A row to point at as upcoming. Outlined, never filled: it is not known yet. */
  next?: string;
  caption?: boolean;
}) {
  const knownCount = GOJUON.filter(
    (row) => known.includes(row.id) || row.id === arriving,
  ).reduce((n, row) => n + row.cells.filter(Boolean).length, 0);

  return (
    <div className="flex flex-col items-center gap-4">
      {/* px-14 reserves room for the hung row labels so they are never clipped, while the
          table itself stays the centred element. */}
      <div className="max-w-full overflow-x-auto px-14">
        <table className="mx-auto border-collapse">
          <tbody>
            {GOJUON.map((row) => {
              const isKnown = known.includes(row.id);
              const isArriving = row.id === arriving;
              const isNext = row.id === next;
              return (
                <tr key={row.id}>
                  <th
                    scope="row"
                    // Zero-width and hung to the left: labels vary from "vowels" to "k", so
                    // a real column both ragged-edges the rows and shifts the table off
                    // centre against the headline. Taking them out of the table's width
                    // lets the cells define it, so the glyphs centre where the eye expects.
                    className="relative w-0 border-0 p-0"
                  >
                    <span
                      className={`absolute right-3 top-1/2 -translate-y-1/2 whitespace-nowrap text-sm font-medium ${
                        isKnown || isArriving || isNext ? "text-ink" : "text-ink-muted"
                      }`}
                    >
                      {row.label}
                    </span>
                  </th>
                  {row.cells.map((cell, i) => (
                    <td
                      key={i}
                      // A real ruled table: every occupied cell is boxed, so the rows and
                      // vowel columns read as a grid rather than as floating glyphs. Empty
                      // cells (the y/w gaps) keep the border, showing the gap is real.
                      className={`border-2 border-line p-0 ${
                        // An upcoming row gets a tinted, ink-bordered cell: clearly
                        // singled out, but plainly not filled in like a learned row.
                        isNext ? "border-ink/50 bg-ink/[0.07]" : ""
                      }`}
                    >
                      <span
                        className={`${cellClass(cell, isKnown, isArriving)} ${
                          isNext ? "font-medium" : ""
                        }`}
                        style={
                          isArriving
                            ? { animationDelay: `${200 + i * 260}ms` }
                            : undefined
                        }
                      >
                        {cell ?? ""}
                      </span>
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {caption && (
        // The count is the slide's actual claim, so it reads as a fact in ink rather than
        // as a muted footnote. Centered on the whole grid block, label column included,
        // so it sits under the table's visual mass instead of drifting left.
        <p className="text-sm text-ink-muted">
          <span className="font-semibold text-ink tabular-nums">{knownCount}</span> of{" "}
          {GOJUON_COUNT} hiragana.
        </p>
      )}
    </div>
  );
}

// The whole table is the subject of its slide, so the cell is sized to be read, not to
// squeeze eleven rows above the fold. The station page is `min-h-screen`, so a short
// window scrolls; the nav's gradient scrim shows there is more below. Cells are wider
// than tall because the glyphs are, and that proportion reads as a table rather than a
// column of squares.
const CELL_BASE =
  "flex h-11 w-12 items-center justify-center font-kana text-2xl leading-none [@media(min-height:820px)]:h-12 [@media(min-height:820px)]:w-14 [@media(min-height:820px)]:text-3xl";

function cellClass(cell: string | null, isKnown: boolean, isArriving: boolean) {
  if (!cell) return CELL_BASE;
  if (isArriving) return `${CELL_BASE} kana-arrive bg-ink font-medium text-paper`;
  if (isKnown) return `${CELL_BASE} bg-ink font-medium text-paper`;
  // Unlearned kana are full-strength ink, not greyed out: the learner should be able to
  // read the whole table. State is carried by the fill, which is the louder signal.
  return `${CELL_BASE} text-ink`;
}
