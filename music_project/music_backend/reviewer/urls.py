from django.urls import path, include
from django.contrib import admin
from . import views
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'users', views.UserView, 'user')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls))
]

"""
app_name = 'reviewer'
urlpatterns = [
    path('', views.index, name='index'),
    path('signup/', views.registration, name='signup'),
    path('retrieve/', views.retrieve, name='retrieve'),
    path('display/', views.display, name='display'),
    path('tracklist/', views.tracklist, name='tracklist'),
    path('displaytracklist/', views.display_tracklist, name='displaytracklist'),
]
"""