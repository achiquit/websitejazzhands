import os
import re

count = 0
with open("../sitemap.txt","w+") as sitemapConsole, open("../sitemap/sitemap.txt", "w+") as sitemapUser:
        for root, dirs, files in os.walk('../.'):
            if "index.html" in files:
                count += 1
                if count == 1:
                    sitemapConsole.write(f"https://andre.chiquit.ooo" + re.sub("^.", "", root, count=1) + "/")
                    sitemapUser.write(f"Home")
                else:
                    sitemapConsole.write(f"\nhttps://andre.chiquit.ooo" + re.sub("^.", "", root, count=1) + "/")
                    sitemapUser.write(f"\n" + root)

print(f"Total Pages: " + str(count))