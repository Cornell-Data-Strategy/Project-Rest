#!/bin/bash
# !DO NOT CHANGE OR EDIT!
# script to update the project document and push changes
BOX_FILE_PATH="/Users/ahmed/Library/CloudStorage/Box-Box/Cornell Data Strategy/Active Project Work/Project REST/Project REST.docx"
GIT_REPO_PATH="/Users/ahmed/desktop/projects/Project-Rest"
GIT_FILE_PATH="$GIT_REPO_PATH/Project REST.docx"


if [ -f "$BOX_FILE_PATH" ]; then

    cp "$BOX_FILE_PATH" "$GIT_FILE_PATH"


    cd "$GIT_REPO_PATH" || exit


    if git diff --quiet; then
        echo "No changes detected."
    else
        git add "Project REST.docx"
        git commit -m "*AUTOMATED PUSH* Updating document from Box Drive"
        git push origin main
        echo "Changes pushed to GitHub."
    fi
else
    echo "Error: Box file not found!"
fi
