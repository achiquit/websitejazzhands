#!/bin/sh

echo ""
echo ""

echo "=+=+=+=+=+=+=+=--- Updating Sitemap ---=+=+=+=+=+=+=+="
python3 scripts/sitemap-gen.py

echo ""
echo ""

echo "=+=+=+=+=+=+=+=--- Pushing website to GitHub ---=+=+=+=+=+=+=+="
git add .
git commit -a -m "Automatic DB Update"
git push

echo ""
echo ""

echo "=+=+=+=+=+=+=+=--- Updating server ---=+=+=+=+=+=+=+="
read -s -p "Enter Server Password Here: " password
echo "$password" | tailscale ssh andre@ubuntu "sudo -S ./update.sh"

echo ""
echo ""