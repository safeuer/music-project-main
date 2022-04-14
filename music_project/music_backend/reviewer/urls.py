from django.urls import path, include
from django.contrib import admin
from . import views
from rest_framework import routers
from rest_framework.authtoken.views import obtain_auth_token

router = routers.DefaultRouter()
router.register(r'users', views.UserView, 'user')
router.register(r'songs', views.SongView, 'song')
router.register(r'artists', views.ArtistView, 'artist')
router.register(r'ratings', views.RatingView, 'rating')

app_name = 'reviewer'
urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(router.urls)),
    path('api/', include(router.urls)),
    path('auth/', obtain_auth_token),
    path('login/', views.login),
]

"""

urlpatterns = [
    path('', views.index, name='index'),
    path('signup/', views.registration, name='signup'),
    path('retrieve/', views.retrieve, name='retrieve'),
    path('display/', views.display, name='display'),
    path('tracklist/', views.tracklist, name='tracklist'),
    path('displaytracklist/', views.display_tracklist, name='displaytracklist'),
]
"""