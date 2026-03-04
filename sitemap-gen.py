import os
import re

count = 0
with open("sitemap.txt","w+") as sitemap:
    for root, dirs, files in os.walk('.'):
        if "index.html" in files:
            count += 1
            if count == 1:
                sitemap.write(f"https://andre.chiquit.ooo" + re.sub("^.", "", root, count=1) + "/")
            else:
                sitemap.write(f"\nhttps://andre.chiquit.ooo" + re.sub("^.", "", root, count=1) + "/")

print(f"Total Pages: " + str(count))