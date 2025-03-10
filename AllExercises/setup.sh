#!/bin/bash
# Activate your virtual environemnt before running setup.sh
if command -v python >/dev/null 2>&1; then
    PYTHON=python
    PIP=pip
elif command -v python3 >/dev/null 2>&1; then
    PYTHON=python3
    PIP=pip3
else
    echo "Python is not installed. Please install Python."
    exit 1
fi

$PIP install --upgrade pip 
$PIP install -r requirements.txt 


# # Run a Python command to download the NLTK stopwords
$PYTHON -c "import ssl, nltk; ssl._create_default_https_context = ssl._create_unverified_context; nltk.download('stopwords');  nltk.download('punkt_tab')"
$PYTHON manage.py makemigrations events users comments 
$PYTHON manage.py migrate 
$PYTHON manage.py runserver 