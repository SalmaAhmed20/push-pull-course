from django.urls import path
from myapp import views

urlpatterns = [
    path("todos/", views.todos, name="todos"),
    path("create-todo/", views.create_todo, name="create_todo"),
]