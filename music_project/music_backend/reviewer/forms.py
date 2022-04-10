from django import forms
from .models import *

class RegistrationForm(forms.ModelForm):
    class Meta:
        model = User
        fields = ('username', 'password')

class RetrievalForm(forms.ModelForm):
    class Meta:
        model = User
        fields = ('username',)

class TracklistForm(forms.ModelForm):
    class Meta:
        model = Album
        fields = ('album_name',)
