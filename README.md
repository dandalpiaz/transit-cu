# Transit CU

A web application for finding bus times for the [Champaign–Urbana Mass Transit District](https://mtd.org/)

## Setup

1. Request an API key from CUMTD at [https://developer.cumtd.com](https://developer.cumtd.com/).
2. Clone this repository and create and activate a virtual enviornment:
```bash
python3 -m venv/venv # or python -m venv/venv
source venv/bin/activate # for Windows: venv\Scripts\activate
```
3. Install dependencies:
```bash
pip3 install -r requirements.txt # or pip install -r requirements.txt
```
4. To run the site locally, set your API key as the enviornment variable "CUMTD_KEY" by running:
```bash
export CUMTD_KEY=<YOUR_KEY_HERE> # for Windodws: set CUMTD_KEY=<YOUR_KEY_HERE>

# If you're on a BASH enviornment, you can add this command to
# .bashrc so that it runs each time a terminal is started
sudo nano /home/UNIX_USERNAME/.bashrc
```
5. With the variable set, run:
```bash
python3 app.py # or python app.py
```

## Deploy on Heroku

1. Install the Heroku CLI.
2. Run the following commands with an initialized git repository:
```bash
heroku create
git push heroku master
```
3. Add the enviornment variable "CUMTD_KEY" and "TRACKING_ID" (optional) to Heroku. More instructions can be found on Heroku's [Configuration and Config Vars](https://devcenter.heroku.com/articles/config-vars) page. 
4. More details on deploying to Heroku using git can be found on Heroku's [Deploying with Git](https://devcenter.heroku.com/articles/git) page.

## TODO

- get a new domain name
- refactor file structure for app? [See Flasky repo](https://github.com/miguelgrinberg/flasky)
- run audits at web.dev, lighthouse, fae.disability.illinois.edu
- Add submit button for search form
- improve error handling, logging
- how to add to homescreen (android only?)
- hide unavailable filters on stop pages?
- search stops by current location? show map for each stop?
- separate page - mark all stops on a Google Map, draw polylines for routes, allow route selection
- add deployment template files
- move images to separate folder
- remove favorites JS code from homepage
- add directional filters (N, S, E, W, etc.)
    - have all options nested under an AM and PM section
- add filter for "hopper" buses
- save filter data for individual stops?
- create a service worker for Progressive Web App
- add Google sign-in and use a database for storage (instead of localStorage)