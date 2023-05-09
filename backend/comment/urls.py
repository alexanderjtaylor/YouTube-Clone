from django.urls import path
from . import views

urlpatterns = [
    path('<str:videoId>/post-comment', views.user_comment),
    path('<str:videoId>/', views.view_comments),
    path('<int:pk>/comment_update', views.comment_update),
]
