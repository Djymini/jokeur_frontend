#!/bin/sh
set -e

. "$(dirname "$0")/../../utils.sh"

if [ "$BYPASS_PROTECTED_FILES" = "true" ]; then
    echo_yellow "Bypass active: Skipping protected files check."
    exit 0
fi

PROTECTED_FILES="
.prettierrc.json
eslint.config.js
.husky/pre-commit
"

PROTECTED_DIR="husky-scripts"

STAGED_FILES=$(git diff --cached --name-only)

BLOCK_COMMIT=false

echo "$PROTECTED_FILES" | while read -r FILE; do
    [ -z "$FILE" ] && continue

    if echo "$STAGED_FILES" | grep -q -E "^$FILE$"; then
        echo_red "Error: The protected file '$FILE' has been modified or added."
        BLOCK_COMMIT=true
    fi

    if git diff --cached --name-status | grep -q -E "^D[[:space:]]+$FILE$"; then
        echo_red "Error: The protected file '$FILE' has been deleted."
        BLOCK_COMMIT=true
    fi
done

if echo "$STAGED_FILES" | grep -q -E "^$PROTECTED_DIR/"; then
    echo_red "Error: A file in the protected '$PROTECTED_DIR' directory was modified."
    BLOCK_COMMIT=true
fi

if [ "$BLOCK_COMMIT" = true ]; then
    echo_separator
    echo_yellow "Please exclude these files or get approval before committing."
    echo_separator
    exit 1
fi

exit 0
