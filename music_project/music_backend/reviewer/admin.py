from django.contrib import admin

# Register your models here.
from .models import User, Song, Rating, Artist, Album

class UserAdmin(admin.ModelAdmin):
    list_display = ('username', 'password')

admin.site.register(User, UserAdmin)
admin.site.register(Song)
admin.site.register(Rating)
admin.site.register(Artist)
admin.site.register(Album)
