""" Creating a txt list of all video urls of my favorite youtube vidoes :) """
__author__ = "andre.chiquit.ooo"

from pytube import Playlist

open('resources/wild-west/favorite_videos.txt', 'w').close()

favorites = Playlist("https://youtube.com/playlist?list=FLsNkuoghnddIhV58-aFWBhw&si=pyp3vspHUoDGcohg")

with open("resources/wild-west/favorite_videos.txt", "w") as vids:
    for i in favorites.videos:
        vids.write(i.watch_url.replace('https://youtube.com/watch?v=', '<iframe src="https://www.youtube.com/embed/'))
        vids.write('" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen class="lg:h-120"></iframe>\n')
