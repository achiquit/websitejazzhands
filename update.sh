#!/bin/sh

echo "Pushing website to GitHub"
git commit -a -m "Automatic DB Update"
git push

echo "Updating server"
read -s -p "Enter Server Password Here: " password
echo "$password" | tailscale ssh andre@ubuntu "sudo -S ./update.sh"