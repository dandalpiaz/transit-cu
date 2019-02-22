# Transit CU

🚍 A web application for finding bus times for the [Champaign–Urbana Mass Transit District](https://mtd.org/) (CUMTD). Hosted at: [https://transitcu.com](https://transitcu.com)

## Setup

1. Request an API key from CUMTD at [https://developer.cumtd.com](https://developer.cumtd.com/).
2. Clone this repository and create and activate a virtual enviornment:

```bash
git clone https://github.com/dandalpiaz/transit-cu.git
cd transit-cu

python3 -m venv venv # or python -m venv venv
source venv/bin/activate # for Windows: venv\Scripts\activate
```

3. Install dependencies:

```bash
pip3 install -r requirements.txt # or pip install -r requirements.txt
```

4. To run the site locally, set your API key as the enviornment variable "CUMTD_KEY" by creating a .env file in the root directory, `sudo nano .env`

```bash
CUMTD_KEY=<your-key-here>
TRACKING_ID=<google-ua-number-here>
SSL_REDIRECT=no
```

5. Now you can run:

```bash
python3 transit.py # or python transit.py
```

## Deploy on Heroku

1. Install the Heroku CLI.
2. Run the following commands with an initialized git repository:

```bash
heroku create
git push heroku master

# or push a non-master branch
git push heroku yourbranch:master
```

3. Add the enviornment variable "CUMTD_KEY" and "TRACKING_ID" (optional) to Heroku. Set the SSL_REDIRECT variable to "yes". More instructions can be found on Heroku's [Configuration and Config Vars](https://devcenter.heroku.com/articles/config-vars) page. 
4. More details on deploying to Heroku using git can be found on Heroku's [Deploying with Git](https://devcenter.heroku.com/articles/git) page.

## Deploy on Linux

1. Complete a server setup simliar to [Linux Server Configuration for Flask Application on Amazon Lightsail](https://github.com/dandalpiaz/flask-lightsail). For the Supervisor and Nginx config files, see the examples in the "Deployment" directory of this repository.
2. To deploy new changes, create a script similar to "deploy-example.sh" in the "Deployment" folder.

## IDEAS

- search for stops by current location
- show map on each stop page?
- separate page - mark all stops on a Google Map, draw polylines for routes, allow route selection
- directional filters - have these options nested under an AM and PM section
- add a 'remove all filters' button
- hide unavailable filters on individual stop pages?
- save filter data for individual stops?
- redo frontend with JS framework (Vue, React), single page webapp?
- add Google sign-in and use a database for storage (instead of localStorage)
- front page - new image? Shadow on boxes?
- filter toggle - slideToggle vs toggle

## TODO

- debug intermittent error when auto refreshing stop data - sometimes happening after several refresh requests
- add ARIA attributes for autocomplete search
- force refresh stop data when waking mobile device from sleep
- prevent footer from overlapping search results on mobile
- re-evaluate caching on service worker (for PWA)
- add email notification with error logging
- clean up filter.js - DRY
- refactor file structure for app? [example](https://github.com/miguelgrinberg/flasky)
- run audits at web.dev, lighthouse, fae.disability.illinois.edu
