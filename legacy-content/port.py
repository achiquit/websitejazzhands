# A script to port my old blog content into my redesigned website
# Author: https://andre.chiquit.ooo

import re
import shutil
import os

def print_lines_between_patterns(filepath, start_pattern, end_pattern):
    """Prints lines from a file that fall between a start and end pattern.

    Args:
        filepath: Path to the file.
        start_pattern: Regex pattern indicating the start of the block.
        end_pattern: Regex pattern indicating the end of the block."""
    
    inside_block = False
    try:
        with open(filepath, 'r') as original:
            with open("legacy-content/test.txt", "w") as test:
                for line in original:
                    if re.search(start_pattern, line):
                        test.write(line)
                        inside_block = True
                    elif re.search(end_pattern, line):
                        test.write(line)
                        inside_block = False
                    elif inside_block:
                        test.write(line)
    except FileNotFoundError:
        print(f"Error: File not found: {filepath}")
    except Exception as e:
         print(f"An error occurred: {e}")

def combine_files_at_location(insert_file, target_file):
    with open(target_file, "r+") as f2:
        for x in range(24):
            f2.readline()
        pos = f2.tell()
        f2_remainder = f2.read()
        f2.seek(pos)
        with open(insert_file, "r") as f1:
            for line in f1:
                f2.write(line)
        f2.write(f2_remainder)

def reset_from_template(reset_file, template_file):
    os.remove(reset_file)
    shutil.copyfile(template_file, reset_file)

def edit_content(target_file):
    for line in target_file:
        print('fart')

filepath = 'legacy-content/blog-2024-postgrad-southwest.html'
start_pattern = '^.*id="cochise".*$'
end_pattern = '^.*End Spotify embed.*$'
print_lines_between_patterns(filepath, start_pattern, end_pattern)

template_file = 'adventures/import-template.html'
reset_file = 'adventures/2023/postgrad/southwest/index.html'
reset_from_template(reset_file, template_file)

insert_file = 'legacy-content/test.txt'
target_file = 'adventures/2023/postgrad/southwest/index.html'
combine_files_at_location(insert_file, target_file)