from audioop import reverse
from django.http import JsonResponse
from django.shortcuts import redirect, render
from django.views.decorators.csrf import csrf_exempt
from .models import Todo
from .forms import TodoForm
import json


def todos(request):
    todos = Todo.objects.all()
    data = {"todos": list(todos.values())}
    return JsonResponse(data)


@csrf_exempt
def create_todo(request):
    if request.method == 'POST':
        form = TodoForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('todos')
    else:
        form = TodoForm()
    return render(request, 'create_todo.html', {'form': form})

