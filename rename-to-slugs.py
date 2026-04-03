#!/usr/bin/env python3
"""
Script to rename all logo folders and team image files to slug format.
Example: "Austria" → "austria", "Arsenal FC.png" → "arsenal-fc.png"
"""

import os
import re
import unicodedata
from pathlib import Path

def slugify(text):
    """
    Convert text to slug format:
    - Lowercase
    - Spaces → dashes
    - Remove special characters
    - Handle accented characters
    """
    # Normalize unicode (decompose accents)
    text = unicodedata.normalize('NFKD', text)
    text = text.encode('ASCII', 'ignore').decode('ASCII')
    
    # Custom character replacements
    replacements = {
        'ü': 'u', 'ö': 'o', 'ä': 'a', 'é': 'e', 'è': 'e',
        'ñ': 'n', '&': 'and', "'": '', '"': ''
    }
    for old, new in replacements.items():
        text = text.replace(old, new)
    
    # Convert to lowercase
    text = text.lower()
    
    # Replace spaces and underscores with dashes
    text = re.sub(r'[\s_]+', '-', text)
    
    # Remove any remaining non-alphanumeric characters except dashes
    text = re.sub(r'[^a-z0-9\-]', '', text)
    
    # Remove consecutive dashes
    text = re.sub(r'-+', '-', text)
    
    # Remove leading/trailing dashes
    text = text.strip('-')
    
    return text


def rename_all_folders_and_files(logos_directory):
    """Main function to rename all folders and files"""
    logos_path = Path(logos_directory)
    
    if not logos_path.exists():
        print(f"❌ Error: Directory not found: {logos_directory}")
        return
    
    print(f"🔍 Processing: {logos_directory}\n")
    
    renamed_folders = []
    renamed_files = []
    
    # Get all country folders (sorted for consistent order)
    country_folders = sorted([d for d in logos_path.iterdir() if d.is_dir()])
    
    print(f"Found {len(country_folders)} country folders\n")
    print("=" * 80)
    
    for country_path in country_folders:
        country_name = country_path.name
        slugified_country = slugify(country_name)
        
        # Rename folder if needed
        if country_name != slugified_country:
            new_country_path = country_path.parent / slugified_country
            country_path.rename(new_country_path)
            print(f"📁 Folder: {country_name:30} → {slugified_country}")
            renamed_folders.append((country_name, slugified_country))
            current_folder_path = new_country_path
        else:
            print(f"📁 Folder: {country_name:30} (no change needed)")
            current_folder_path = country_path
        
        # Rename PNG files inside this folder
        png_files = sorted([f for f in current_folder_path.glob('*.png')])
        files_renamed_in_folder = 0
        
        for png_file in png_files:
            original_name = png_file.name
            team_name = png_file.stem  # filename without extension
            slugified_name = slugify(team_name) + '.png'
            
            if original_name != slugified_name:
                new_file_path = current_folder_path / slugified_name
                png_file.rename(new_file_path)
                files_renamed_in_folder += 1
                renamed_files.append({
                    'folder': slugified_country if country_name != slugified_country else country_name,
                    'old_file': original_name,
                    'new_file': slugified_name
                })
        
        if files_renamed_in_folder > 0:
            print(f"   └─ ✓ Renamed {files_renamed_in_folder} files")
        print()
    
    # Print summary
    print("=" * 80)
    print("✅ RENAMING COMPLETE\n")
    print(f"Folders renamed: {len(renamed_folders)}")
    print(f"Files renamed: {len(renamed_files)}")
    print(f"Total changes: {len(renamed_folders) + len(renamed_files)}\n")
    
    # Show folder renames
    if renamed_folders:
        print("📋 Folders renamed:")
        for old, new in renamed_folders:
            print(f"   {old:30} → {new}")
    
    print("\n" + "=" * 80)
    print("ℹ️  All folders and files are now in slug format!")
    print("=" * 80)


if __name__ == "__main__":
    logos_dir = "/Users/leonardoratzlaff/Documents/dev/football-logos/logos"
    rename_all_folders_and_files(logos_dir)
