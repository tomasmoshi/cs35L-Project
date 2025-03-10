#!/bin/bash

pip install --upgrade pip || pip3 install --upgrade pip 
pip install -r requirements.txt || pip3 install -r requirements.txt
Check if 'python' is available, otherwise use 'python3'
# if command -v python >/dev/null 2>&1; then
#     PYTHON=python
# elif command -v python3 >/dev/null 2>&1; then
#     PYTHON=python3
# else
#     echo "Python is not installed. Please install Python."
#     exit 1
# fi

# # Run a Python command to download the NLTK stopwords
python -c "import ssl, nltk; ssl._create_default_https_context = ssl._create_unverified_context; nltk.download('stopwords');  nltk.download('punkt_tab')"|| python3 -c "import ssl, nltk; ssl._create_default_https_context = ssl._create_unverified_context; nltk.download('stopwords'); nltk.download('punkt_tab')"
python manage.py makemigrations events users comments|| python3 manage.py makemigrations events
python manage.py migrate || python3 manage.py migrate
python manage.py runserver || python3 manage.py runserver