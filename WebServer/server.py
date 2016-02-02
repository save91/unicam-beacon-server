import BaseHTTPServer
import SocketServer
#Importo le librerie necessarie
import RPi.GPIO as GPIO
import time
import signal
import json
from pymongo import MongoClient
from bson.json_util import dumps

PORT = 8000

DUMMY_GET = """<html><body>RaspberryPi<br><p>Hai acceso il led</p><form method='POST'><input type='submit' value='Spegni'></form></body></html>"""
DUMMY_POST = """<html><body>RaspberryPi<br><p>Hai spento il led</p></body></html>"""
DUMMY_LED = json.dumps({'id' : '1', 'nome': 'Led', 'descrizione': 'Accendi e spegni il led', 'url': 'img/ionic.png', 'stato': 'true', 'azioni': [{'nome': 'Accendi', 'url': 'accendi'}, {'nome': 'Spegni', 'url': 'spegni'}]})
DUMMY_APRIPORTA = json.dumps({'id' : '2', 'nome': 'Apriporta', 'descrizione': 'Apri la porta del tuo ufficio', 'url': 'img/ionic.png', 'stato': 'true', 'azioni': [{'nome': 'Apri', 'url': 'accendi'}]})
DUMMY_STATO = json.dumps({'stato' : 'ok'})

led = 24

def inizializza_LED():
	#Controlle che i GPIO pins siano pronti
	GPIO.setmode(GPIO.BCM)
	GPIO.setwarnings(False)
	#Setto il pin come output
	GPIO.setup(led, GPIO.OUT)

def accendi_LED(pin):
	GPIO.output(pin, 1)

def spegni_LED(pin):
	GPIO.output(pin, 0)

def clean_GPIO():
	GPIO.cleanup()

def rispondi(r, cod, type, data):
	r.send_response(200)
	if(type == 0):
		r.send_header("Content-type", "application/json")
	else: 
		r.send_header("text/html")
	r.send_header("Content-length", len(data))
	r.end_headers()
	r.wfile.write(data)
	
class ConnectionMongoDB():
        def __init__(self, ip="192.168.24.101", porta="27017"):
                self.client = MongoClient("mongodb://" + ip + ":" + porta)
                self.db = self.client.unicam

class MyHandler(BaseHTTPServer.BaseHTTPRequestHandler):
	def __init__(self,req,client_addr,server):
		BaseHTTPServer.BaseHTTPRequestHandler.__init__(self,req,client_addr,server)

	def do_GET(self):
		indirizzo=self.path.split('/')
		for i in range(len(indirizzo)):
			print i, ": ",indirizzo[i]
		print(indirizzo[0])
		if(indirizzo[1]=="beacons"):
			course = connession.db.beacons.find()
			l = list(course)
			DUMMY_JSON = dumps(l)
			rispondi(self, 200, 0, DUMMY_JSON)
		elif(len(indirizzo)==3 and indirizzo[1]=="beacon"):
			if(indirizzo[2]=="1"):
                        	rispondi(self, 200, 0, DUMMY_LED)
			elif(indirizzo[2]=="2"):
				rispondi(self, 200, 0, DUMMY_APRIPORTA)

		elif(indirizzo[1]=="accendi"):
			rispondi(self, 200, 0, DUMMY_STATO)
			accendi_LED(led)
			
		elif(indirizzo[1]=="spegni"):
			rispondi(self, 200, 0, DUMMY_STATO)
			spegni_LED(led)
		else:
			rispondi(self, 200, 1, DUMMY_GET)
			

	def do_POST(self):
		rispondi(self, 200, 1, DUMMY_POST)
		spegni_LED(led)

inizializza_LED()
connession = ConnectionMongoDB()
httpd = SocketServer.TCPServer(("", PORT), MyHandler)
print "in ascolto sulla porta", PORT
try:
    httpd.serve_forever()
except KeyboardInterrupt:
     pass
httpd.server_close()
clean_GPIO()
print "Server terminato con successo"
