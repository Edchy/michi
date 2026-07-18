#!/bin/bash
# PostToolUse hook: nudge to keep OVERVIEW.md in sync with the docs.
#
# Fires after a Write/Edit. If the edited file is a doc that OVERVIEW.md maps
# (docs/**.md or a top-level *.md doc) BUT OVERVIEW.md itself has no uncommitted
# change, inject a reminder into Claude's context. It cannot block (PostToolUse
# never can) — it's a nudge with teeth, paired with the rule in CLAUDE.md.
#
# Design notes:
# - Uses git working-tree state as the "was OVERVIEW.md touched too?" signal, so
#   it stays quiet once OVERVIEW.md is edited in the same batch of work.
# - Deliberately conservative: only reminds for docs/ changes and top-level doc
#   files, never for OVERVIEW.md edits themselves, README, or non-doc files.
# - Judgment about whether a change is *significant* enough to warrant an
#   OVERVIEW update is left to Claude — the reminder says "if significant".

set -euo pipefail

# The tool payload arrives as JSON on stdin.
payload="$(cat)"

# Extract the edited file path (Edit and Write both use tool_input.file_path).
file_path="$(printf '%s' "$payload" | jq -r '.tool_input.file_path // empty')"
[ -z "$file_path" ] && exit 0

project_dir="${CLAUDE_PROJECT_DIR:-$(pwd)}"
cd "$project_dir" || exit 0

# Normalize to a repo-relative path.
rel="${file_path#"$project_dir"/}"

# Only care about documentation files.
case "$rel" in
  OVERVIEW.md)          exit 0 ;;   # editing the map itself — nothing to nag about
  docs/*.md|docs/**/*.md) : ;;      # a doc that OVERVIEW maps
  *) exit 0 ;;                      # anything else — stay silent
esac

# If OVERVIEW.md already has an uncommitted change, assume it's being kept in
# sync in this same unit of work — stay quiet.
if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  exit 0
fi
if ! git diff --quiet -- OVERVIEW.md 2>/dev/null \
   || ! git diff --cached --quiet -- OVERVIEW.md 2>/dev/null; then
  exit 0
fi

# docs/ changed, OVERVIEW.md untouched → remind Claude.
cat <<'JSON'
{
  "hookSpecificOutput": {
    "hookEventName": "PostToolUse",
    "additionalContext": "Reminder: you edited a documentation file under docs/ but OVERVIEW.md has no matching change yet. OVERVIEW.md is the single project entry point and must stay in sync. If this change is significant (a doc added/removed/renamed, a decision/ADR changed, or a summarized fact now wrong), update OVERVIEW.md's relevant section and its file map. If it's a trivial edit (typo, wording) that doesn't affect the summary, no OVERVIEW change is needed — just proceed."
  }
}
JSON
exit 0
