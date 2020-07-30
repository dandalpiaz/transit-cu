from flask import Flask, render_template, request, send_from_directory, jsonify, abort, escape, current_app
import urllib.request, json
import os
from app.main import bp

@bp.context_processor
def inject_vars():
	return dict(google_tracking_id=current_app.config['TRACKING_ID'])

@bp.errorhandler(404)
def not_found_error(error):
    return render_template('404.html'), 404

@bp.errorhandler(500)
def internal_error(error):
    return render_template('500.html'), 500

@bp.route('/offline')
def offline():
	return render_template('offline.html')

@bp.route('/robots.txt')
@bp.route('/manifest.json')
@bp.route('/img/logo.png')
@bp.route('/sw.js')
def static_from_root():
	return send_from_directory(current_app.static_folder, request.path[1:])

@bp.route('/')
def index():
	return render_template('home.html')

@bp.route('/<stop_id>')
def get_stop_data(stop_id):

	api_key = current_app.config['CUMTD_KEY']

	stop_data = "https://developer.mtd.org/api/v2.2/json/GetDeparturesByStop?key=" + api_key + "&stop_id=" + stop_id + "&pt=60"

	try:
		with urllib.request.urlopen(stop_data) as url:
			data = json.loads(url.read().decode())
	except urllib.error.HTTPError as e:
		if e.code == 404:
			abort(404)
		
	return json.dumps(data)

@bp.route('/stop=<stop_id>_<stop_name>')
def get_stop(stop_id, stop_name):
	return render_template('stop.html', stop_id=stop_id, stop_name=stop_name)
