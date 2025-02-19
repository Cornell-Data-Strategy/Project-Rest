#!/bin/bash

# Define paths
BOX_FILE_PATH="/Users/ahmed/Library/CloudStorage/Box-Box/Cornell Data Strategy/Active Project Work/Project REST/Project REST.docx"
GIT_REPO_PATH="/Users/ahmed/desktop/Projects/Project-Rest"
DOCX_FILE="$GIT_REPO_PATH/Project REST.docx"
MD_FILE="$GIT_REPO_PATH/Project REST.md"

# Ensure the repo directory exists
if [ ! -d "$GIT_REPO_PATH" ]; then
    echo "Error: GitHub repo directory does not exist: $GIT_REPO_PATH"
    exit 1
fi

# Ensure the Box file exists
if [ ! -f "$BOX_FILE_PATH" ]; then
    echo "Error: Box file not found!"
    exit 1
fi

# Sync the file (copy from Box to GitHub repo)
cp "$BOX_FILE_PATH" "$DOCX_FILE"

# Convert .docx to .md using Pandoc
pandoc "$DOCX_FILE" -o "$MD_FILE"

# Move to repo folder
cd "$GIT_REPO_PATH" || exit

# Check if there are changes
if git diff --quiet; then
    echo "No changes detected."
else
    git add "Project REST.docx" "Project REST.md"
    git commit -m "Updated document from Box Drive & converted to Markdown"
    git push origin main
    echo "Changes pushed to GitHub."
fi
