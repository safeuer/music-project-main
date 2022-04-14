from django.shortcuts import get_object_or_404, render
from django.http import HttpResponse, HttpResponseRedirect, Http404
from django.urls import reverse
# from .forms import RegistrationForm, RetrievalForm, TracklistForm
from .models import *
from rest_framework import viewsets
from .serializers import *
from rest_framework.authentication import TokenAuthentication
from django.contrib.auth import authenticate
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.status import HTTP_401_UNAUTHORIZED
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User

# Create your views here.

@api_view(["POST"])
def login(request):
    username = request.data.get("username")
    password = request.data.get("password")

    user = authenticate(username=username, password=password)
    if not user:
        new_user = User.objects.create_user(username, "", password)
        new_user.save()
    token, _ = Token.objects.get_or_create(user=user)
    return Response({"token": token.key})

class UserView(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()

class ArtistView(viewsets.ModelViewSet):
    serializer_class = ArtistSerializer
    queryset = Artist.objects.all()

class SongView(viewsets.ModelViewSet):
    serializer_class = SongSerializer
    queryset = Song.objects.all()
    
class RatingView(viewsets.ModelViewSet):
    serializer_class = RatingSerializer
    queryset = Rating.objects.all()

"""
def index(request):
    return render(request, 'reviewer/index.html')

def registration(request):
    message = None
    if request.method == 'POST':
        form = RegistrationForm(request.POST)
        if form.is_valid():
            form.save()
            form = RegistrationForm()
            message = "Successfully registered!"
    else:
        form = RegistrationForm()
    return render(request, 'reviewer/registration.html', {'form': form, 'message': message})

def retrieve(request):
    form = RetrievalForm(request.GET)
    return render(request, 'reviewer/retrieve.html', {'form': form,})

def display(request):
    form = RetrievalForm()
    user = get_object_or_404(User, pk=request.GET['username'])
    ratings = user.rating_set.all()
    return render(request, 'reviewer/retrieve.html', {'form': form, 'ratings': ratings})

def tracklist(request):
    form = TracklistForm(request.GET)
    return render(request, 'reviewer/tracklist.html', {'form': form,})

def display_tracklist(request):
    form = TracklistForm()
    album_list = Album.objects.filter(album_name__iexact=request.GET['album_name'])
    songs = []
    for album in album_list:
        song_list = album.song_set.all()
        songs.append(list(song_list))
    return render(request, 'reviewer/tracklist.html', {'form': form, 'songs': songs})
"""