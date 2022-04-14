from socketserver import ThreadingUnixDatagramServer
from unittest.main import MODULE_EXAMPLES
from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator

# Create your models here.
class User(models.Model):
    username = models.CharField(max_length=255, primary_key=True)
    password = models.CharField(max_length = 31)
    USERNAME_FIELD = 'username'

    def __str__(self):
        return self.username
    
"""
class Album(models.Model):
    album_name = models.CharField(max_length = 255)
    release_date = models.DateField(blank=True)

    def __str__(self):
        return self.album_name
"""
"""
class Artist(models.Model):
    name = models.CharField(max_length = 255)

    def __str__(self):
        return self.name
"""
class Song(models.Model):
    #id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=255)
    artist = models.CharField(max_length=255) # alter to make case insensitive?
    # album = models.ForeignKey(Album, on_delete=models.CASCADE, null=True)

    def __str__(self):
        return self.title + " - " + str(self.artist)

class Rating(models.Model):
    num_rate = models.IntegerField(validators=[MinValueValidator(0), MaxValueValidator(10)])
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    song = models.ForeignKey(Song, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.user) + " gave " + str(self.song) + " a " + str(self.num_rate)