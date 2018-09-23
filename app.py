from flask import Flask, render_template, request, send_from_directory
from flask_sslify import SSLify
import urllib.request, json 

app = Flask(__name__)
#sslify = SSLify(app)

@app.route('/robots.txt')
def static_from_root():
    return send_from_directory(app.static_folder, request.path[1:])

@app.route('/manifest.json')
def static_from_root_1():
    return send_from_directory(app.static_folder, request.path[1:])

@app.route('/logo.png')
def static_from_root_2():
    return send_from_directory(app.static_folder, request.path[1:])

@app.route('/')
def index():

	all_stops = "https://developer.cumtd.com/api/v2.2/json/getroutes?key=f43367cb918d4110af23345fff93f294"

	with urllib.request.urlopen(all_stops) as url:
		all_stops_data = json.loads(url.read().decode())

	return render_template('home.html', all_stops_data=all_stops_data)

@app.route('/stop=<stop>')
def get_stop(stop):

	stop_data = "https://developer.cumtd.com/api/v2.2/json/GetDeparturesByStop?key=f43367cb918d4110af23345fff93f294&stop_id=" + stop + "&pt=60"

	stop_title = "https://developer.cumtd.com/api/v2.2/json/GetStop?key=f43367cb918d4110af23345fff93f294&stop_id=" + stop 

	with urllib.request.urlopen(stop_data) as url:
		data = json.loads(url.read().decode())
		
	with urllib.request.urlopen(stop_title) as url2:
		title = json.loads(url2.read().decode())

	return render_template('stop.html', data=data, title=title)

if __name__ == '__main__':
    app.debug = False
    app.run()