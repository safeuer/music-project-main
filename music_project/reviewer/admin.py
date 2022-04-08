from django.contrib import admin

# Register your models here.
from .models import User, Song, Rating, Artist, Album

admin.site.register(User)
admin.site.register(Song)
admin.site.register(Rating)
admin.site.register(Artist)
admin.site.register(Album)
