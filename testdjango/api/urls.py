from django.urls import path
from rest_framework_simplejwt.views import (

    TokenRefreshView
)

from . import views


urlpatterns = [
    path("auth/token/",  views.MyObtainPairView.as_view()),
    path("auth/refresh/", TokenRefreshView.as_view()),
    path("", views.homeView),
    path("notes/", views.NotesApiView.as_view()),
    path("notes/update/<int:pk>/", views.NoteUpdateView.as_view()),
    path("notes/create/", views.NoteCreateView.as_view()),
    path("notes/delete/<int:pk>/", views.NoteDeleteView.as_view()),
    path("notes/<int:pk>/", views.NoteDetailView.as_view())
]