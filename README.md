# MTD Bus

A web application for finding bus times for the [Champaign–Urbana Mass Transit District](https://mtd.org/)

## Setup

1. Request an API key from CUMTD at [https://developer.cumtd.com](https://developer.cumtd.com/).
2. Clone this repository and create a virtual enviornment with `python3 -m venv/venv`. Activate the virtual enviornment with `source venv/bin/activate` (for Windows, run `venv\Scripts\activate`). Install dependencies with `pip3 install -r requirements.txt`.
3. To run the site locally, set your API key as the enviornment variable "CUMTD_KEY" by running `export CUMTD_KEY=<YOUR_KEY_HERE>` (for Windows run `set CUMTD_KEY=<YOUR_KEY_HERE>`). If you're on a UNIX enviornment, you can add this command to .bashrc so that it runs each time a terminal is started, `sudo nano /home/UNIX_USERNAME/.bashrc`. With the variable set, run `python3 app.py`.

## Deploy on Heroku

1. Install the Heroku CLI.
2. Run the following commands with an initialized git repository:
```
heroku create
git push heroku master
```
3. Add the enviornment variable "CUMTD_KEY" to Heroku. Instructions here: [https://devcenter.heroku.com/articles/config-vars](https://devcenter.heroku.com/articles/config-vars). 
4. More details on deploying to Heroku using git can be found on Heroku's [Deploying with Git](https://devcenter.heroku.com/articles/git) page.

## TODO

- remove filters from homepage, move to a toggle interface in header?
- add autofocus on input on homepage?
- get a new domain name
- apply bootstrap framework?
- refactor file structure for app? [See Flasky repo](https://github.com/miguelgrinberg/flasky)
- add ARIA labels to buttons
- change filter button styles/behaviour
- run an audit at [https://web.dev/](https://web.dev/)
- stop refresh, add countdown, show last load time (Flask-Moment)
- use ajax to reload data, instead of meta refresh
- search stops by current location? show maps for stops?
- add Google Analytics
- how to add to homescreen (android only?)

## Reference

- https://developers.google.com/web/fundamentals/design-and-ui/responsive/
- https://developers.google.com/web/progressive-web-apps/checklist
- https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_aria-label_attribute

