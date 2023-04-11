from django.urls import path
from . import views

urlpatterns = [
    path('', views.user_comment),
    path('<str:videoId>/', views.view_comments),
]
