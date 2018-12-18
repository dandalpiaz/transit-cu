from flask import Flask, render_template, request, send_from_directory, jsonify
import urllib.request, json 
import os
from config import Config

app = Flask(__name__)
app.config.from_object(Config)

api_key = app.config['CUMTD_KEY']
google_tracking_id = app.config['TRACKING_ID']

if app.config['SSL_REDIRECT']:
	from flask_sslify import SSLify
	sslify = SSLify(app)

@app.context_processor
def inject_vars():
	return dict(google_tracking_id=google_tracking_id)

@app.route('/robots.txt')
@app.route('/manifest.json')
@app.route('/logo.png')
def static_from_root():
	return send_from_directory(app.static_folder, request.path[1:])

@app.route('/')
def index():
	return render_template('home.html')

@app.route('/<stop_id>')
def get_stop_data(stop_id):
	stop_data = "https://developer.cumtd.com/api/v2.2/json/GetDeparturesByStop?key=" + api_key + "&stop_id=" + stop_id + "&pt=60"

	try:
		with urllib.request.urlopen(stop_data, timeout=25) as url:
			data = json.loads(url.read().decode())
	except:
		return ""
		
	return jsonify(data)

@app.route('/stop=<stop_id>_<stop_name>')
def get_stop(stop_id, stop_name):		
	return render_template('stop.html', stop_id=stop_id, stop_name=stop_name)


if __name__ == '__main__':
    app.debug = False
    app.run()