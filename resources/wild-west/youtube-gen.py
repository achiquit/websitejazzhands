""" Creating a txt list of all video urls of my favorite youtube vidoes :) """
__author__ = "andre.chiquit.ooo"

from pytube import Playlist

favorites = Playlist("https://youtube.com/playlist?list=FLsNkuoghnddIhV58-aFWBhw&si=pyp3vspHUoDGcohg")

with open("resources/wild-west/favorite_videos.txt", "w") as vids:
    for i in favorites.videos:
        vids.write('<iframe src="')
        vids.write(i.watch_url)
        vids.write('" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>')
        vids.write('\n')