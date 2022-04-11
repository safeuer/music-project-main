from django.contrib import admin

# Register your models here.
from .models import *

class UserAdmin(admin.ModelAdmin):
    list_display = ('username', 'password')

class ArtistAdmin(admin.ModelAdmin):
    lsit_display = ('name')

class SongAdmin(admin.ModelAdmin):
    list_display = ('title', 'artist')

class RatingAdmin(admin.ModelAdmin):
    list_display = ('num_rate', 'user', 'song')

admin.site.register(User, UserAdmin)
admin.site.register(Song, SongAdmin)
admin.site.register(Rating, RatingAdmin)
admin.site.register(Artist, ArtistAdmin)
#admin.site.register(Album)
