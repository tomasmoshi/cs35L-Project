#!/bin/bash

pip install --upgrade pip || pip3 install --upgrade pip 
pip install -r requirements.txt || pip3 install -r requirements.txt
python manage.py makemigrations events || python3 manage.py makemigrations events
python manage.py migrate || python3 manage.py migrate
python manage.py runserver || python3 manage.py runserver