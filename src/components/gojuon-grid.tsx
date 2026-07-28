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
      <div className="max-w-full overflow-x-auto">
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
                    className={`border-0 pr-2.5 text-right text-xs font-medium ${
                      isKnown || isArriving || isNext ? "text-ink" : "text-ink-muted"
                    }`}
                  >
                    {row.label}
                  </th>
                  {row.cells.map((cell, i) => (
                    <td
                      key={i}
                      // A real ruled table: every occupied cell is boxed, so the rows and
                      // vowel columns read as a grid rather than as floating glyphs. Empty
                      // cells (the y/w gaps) keep the border, showing the gap is real.
                      className={`border border-line p-0 ${
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
        <p className="text-sm text-ink-muted text-balance">
          {knownCount} of {GOJUON_COUNT} hiragana.
        </p>
      )}
    </div>
  );
}

// Eleven rows have to fit a laptop viewport without scrolling, which caps the height.
// The grid gets its own column on these slides, so the glyph can stay comfortably big.
const CELL_BASE =
  "flex h-9 w-9 items-center justify-center font-kana text-lg leading-none sm:h-10 sm:w-10 sm:text-xl";

function cellClass(cell: string | null, isKnown: boolean, isArriving: boolean) {
  if (!cell) return CELL_BASE;
  if (isArriving) return `${CELL_BASE} kana-arrive bg-ink font-medium text-paper`;
  if (isKnown) return `${CELL_BASE} bg-ink font-medium text-paper`;
  // Unlearned kana are full-strength ink, not greyed out: the learner should be able to
  // read the whole table. State is carried by the fill, which is the louder signal.
  return `${CELL_BASE} text-ink`;
}
