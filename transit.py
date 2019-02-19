from flask import Flask, render_template, request, send_from_directory, jsonify, abort
import urllib.request, json 
import os
from config import Config

app = Flask(__name__)
app.config.from_object(Config)

api_key = app.config['CUMTD_KEY']
google_tracking_id = app.config['TRACKING_ID']

if app.config['SSL_REDIRECT'] == True:
	from flask_sslify import SSLify
	sslify = SSLify(app)

@app.context_processor
def inject_vars():
	return dict(google_tracking_id=google_tracking_id)

@app.errorhandler(404)
def not_found_error(error):
    return render_template('404.html'), 404

@app.errorhandler(500)
def internal_error(error):
    return render_template('500.html'), 500

@app.route('/offline')
def offline():
	return render_template('offline.html')

@app.route('/robots.txt')
@app.route('/manifest.json')
@app.route('/img/logo.png')
@app.route('/sw.js')
def static_from_root():
	return send_from_directory(app.static_folder, request.path[1:])

@app.route('/')
def index():
	return render_template('home.html')

@app.route('/<stop_id>')
def get_stop_data(stop_id):
	stop_data = "https://developer.mtd.org/api/v2.2/json/GetDeparturesByStop?key=" + api_key + "&stop_id=" + stop_id + "&pt=60"

	try:
		with urllib.request.urlopen(stop_data) as url:
			data = json.loads(url.read().decode())
	except urllib.error.HTTPError as e:
		if e.code == 404:
			abort(404)
		
	return json.dumps(data)

@app.route('/stop=<stop_id>_<stop_name>')
def get_stop(stop_id, stop_name):
	return render_template('stop.html', stop_id=stop_id, stop_name=stop_name)

###### Logging #######

import logging
from logging.handlers import RotatingFileHandler
import os

if not app.debug:
    if not os.path.exists('logs'):
        os.mkdir('logs')
    file_handler = RotatingFileHandler('logs/errors.log', maxBytes=10240, backupCount=10)
    file_handler.setFormatter(logging.Formatter(
        '%(asctime)s %(levelname)s: %(message)s [in %(pathname)s:%(lineno)d]'))
    file_handler.setLevel(logging.INFO)
    app.logger.addHandler(file_handler)
    app.logger.setLevel(logging.INFO)
    app.logger.info('Application startup')


if __name__ == '__main__':
    app.debug = False
    app.run()
