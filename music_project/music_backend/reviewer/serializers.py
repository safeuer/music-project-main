from rest_framework import serializers
from .models import *

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'password',)
"""
class ArtistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Artist
        fields = "__all__"
"""
class SongSerializer(serializers.ModelSerializer):
    class Meta:
        model = Song
        fields = ('title', 'artist', 'id')
        
class RatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rating
        fields = ('num_rate', 'user', 'song')
        

