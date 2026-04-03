#!/bin/bash
# Script to convert all folder and file names to slug format

cd /Users/leonardoratzlaff/Documents/dev/football-logos/logos

# Using printf instead of more complex regex to handle special characters
slug_convert() {
    # This handles the conversion better
    python3 -c "
import sys, re
text = sys.argv[1]
slug = text.lower()
slug = re.sub(r'[\s_&\',\.\-\"]+', '-', slug)
slug = re.sub(r'[^a-z0-9\-]', '', slug)
slug = re.sub(r'-+', '-', slug)
print(slug.strip('-'))
" "$1"
}

export -f slug_convert

# Rename all directories
for dir in */; do
    dir_name="${dir%/}"
    new_name=$(slug_convert "$dir_name")
    
    if [ "$dir_name" != "$new_name" ]; then
        mv "$dir_name" "$new_name"
        echo "Folder: $dir_name → $new_name"
        dir_name="$new_name"
    fi
    
    # Rename all PNG files in this directory
    cd "$dir_name"
    for file in *.png; do
        [ -f "$file" ] || continue
        file_name="${file%.png}"
        new_file=$(slug_convert "$file_name").png
        
        if [ "$file" != "$new_file" ]; then
            mv "$file" "$new_file"
            echo "  File: $file → $new_file"
        fi
    done
    cd ..
done

echo "Done!"
