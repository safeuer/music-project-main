from django.urls import path
from . import views

app_name = 'reviewer'
urlpatterns = [
    path('', views.index, name='index'),
    path('signup/', views.registration, name='signup'),
    path('retrieve/', views.retrieve, name='retrieve'),
    path('display/', views.display, name='display'),
    path('tracklist/', views.tracklist, name='tracklist'),
    path('displaytracklist/', views.display_tracklist, name='displaytracklist'),
]