import os
import re

count = 0
with open("sitemap.txt","w+") as sitemapConsole:
        for root, dirs, files in os.walk('.'):
            if "index.html" in files:
                count += 1
                if count == 1:
                    sitemapConsole.write(f"https://andre.chiquit.ooo" + re.sub("^.", "", root, count=1) + "/")
                else:
                    sitemapConsole.write(f"\nhttps://andre.chiquit.ooo" + re.sub("^.", "", root, count=1) + "/")

print('=+=+=+=+=+=+=+=--- By The Numbers ---=+=+=+=+=+=+=+=')
print('')

print(f"Total webpages: " + str(count))

count = 0
with open ("quotes.txt", "r") as quotes:
     for line in quotes:
          count += 1

print(f"Total Quotes: " + str(count))

# with open("../sitemap/sitemap.txt","w+") as sitemapUser:
#     sitemapUser.write(f"https://andre.chiquit.ooo" + root)