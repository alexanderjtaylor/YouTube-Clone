from django.urls import path
from . import views

urlpatterns = [
    path('<str:videoId>/post-comment', views.user_comment),
    path('<str:videoId>/comments', views.view_comments),
]
