<h1 style="text-align:center;color:#e0004e">Welcome to AllExercises</h1>

<h2 style="color:#202345">What does AllExercises do?</h2>
<p>As students in CS35L course we believed that there should be a social media platform that encourages people to meet outside and participate in fun activities such as playing tennis, soccer and etc.
</p>
<p>AllExcersises web application will allow users to post their exercise events, post comment about those events. Users are able to post only if they sign up or login to the website. They can upload a picture, a title and also tag their post manually or use our automated tagging system that will choose keywords from the post's content.
</p>
<p>We believed that goal of this application is to bring people out together therefore we implemented comments to allow people to communicate about an event.
</p>

<h2 style="color:#202345">How to deploy the application?</h2>

Our web application includes two separate parts, `front-end` and `back-end`. `front-end` is in `react` and `back-end` is using `django` as their frameworks.

<h3 style="color:#202345">How to deploy backend?</h3>

1. Download `python 13.2.0` or use `anaconda` for your python. 
    - Make a new virtual environment and activate it.
        - You can follow this installation guide and on how to activate your virtual environment.
        - `https://docs.python.org/3/library/venv.html`

2. After activating your environment:
- Start a new `bash` terminal.
        - run the `setup.sh` in `cs35-project/AllExercises`
- You should see the following in your terminal:
```python
Watching for file changes with StatReloader
Performing system checks...

System check identified no issues (0 silenced).
March 14, 2025 - 04:42:28
Django version 5.1.4, using settings 'AllExercises.settings'
Starting development server at http://127.0.0.1:8000/
Quit the server with CONTROL-C.
```
<h3 style="color:#202345">How to deploy Front-end?</h3>

1. Start by navigating to the `cs35l-project/front-end`
2. Make sure you have `node.js` installed. You can install `node.js` from : `https://nodejs.org/en/download`
3. To use the Google Map API please use the `.env` and assign the `VITE_GOOGLE_MAPS_API_KEY` with your API key which you can provide it through [Google Maps API](https://mapsplatform.google.com/lp/maps-apis/?utm_source=google&utm_medium=cpc&utm_campaign=gmp25_us_search_dev&gad_source=1&gclsrc=aw.ds).
4. Start a new terminal and make sure you have not closed the `back-end` terminal, then run the following commands:
- First:
```python
npm install
```
- Second:
```python
npm run dev
```
5. You should see the following in your terminal:
```python
> front-end@0.0.0 dev
> vite


  VITE v6.1.0  ready in 150 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```
6. Go ahead and click on the provided link in the console bar `http://localhost:5173/` and you should be able to view the website. 



