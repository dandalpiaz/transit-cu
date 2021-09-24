# Transit CU

🚍 A web application for finding bus times for the [Champaign–Urbana Mass Transit District](https://mtd.org/) (CUMTD).

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
```

5. Now you can run:

```bash
flask run
```

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

- separate API request for stop title, instead of using title in URL
- debug intermittent error when auto refreshing stop data - sometimes happening after several refresh requests
- add ARIA attributes for autocomplete search
- force refresh stop data when waking mobile device from sleep
- re-evaluate caching on service worker (for PWA)
- add email notification with error logging
- clean up filter.js - DRY
- refactor file structure for app? [example](https://github.com/miguelgrinberg/flasky)
- run audits at web.dev, lighthouse, fae.disability.illinois.edu
