from django.shortcuts import render
<<<<<<< HEAD
from django.http import HttpResponse
# Create your views here.

def home(request):
    return HttpResponse('<h1>Blog Home<h1>') # path that will show the homepage 
=======
from django.http import JsonResponse
# Create your views here.

def home(request):
    return JsonResponse({"message": "Hello from Django!"}) 
>>>>>>> main
