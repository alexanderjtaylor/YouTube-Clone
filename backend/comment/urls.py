from django.urls import path
from . import views

urlpatterns = [
    path('<str:videoId>/', views.user_comment),
    path('<str:videoId>/', views.view_comments),
]
