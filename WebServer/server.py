import BaseHTTPServer
import SocketServer
#Importo le librerie necessarie
import RPi.GPIO as GPIO
import time
import signal
import json

PORT = 8000

DUMMY_GET = """<html><body>RaspberryPi<br><p>Hai acceso il led</p><form method='POST'><input type='submit' value='Spegni'></form></body></html>"""
DUMMY_POST = """<html><body>RaspberryPi<br><p>Hai spento il led</p></body></html>"""
DUMMY_JSON = json.dumps([{'id' : '1', 'nome': 'Led', 'descrizione': 'Accendi e spegni il led', 'url': 'img/ionic.png'},{'id' : '2', 'nome': 'Apriporta', 'descrizione': 'Apri la porta del tuo ufficio', 'url': 'img/ionic.png'}])
DUMMY_LED = json.dumps({'id' : '1', 'nome': 'Led', 'descrizione': 'Accendi e spegni il led', 'url': 'img/ionic.png'})
DUMMY_APRIPORTA = json.dumps({'id' : '2', 'nome': 'Apriporta', 'descrizione': 'Apri la porta del tuo ufficio', 'url': 'img/ionic.png'})
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


class MyHandler(BaseHTTPServer.BaseHTTPRequestHandler):
	def __init__(self,req,client_addr,server):
		BaseHTTPServer.BaseHTTPRequestHandler.__init__(self,req,client_addr,server)

	def do_GET(self):
		indirizzo=self.path.split('/')
		for i in range(len(indirizzo)):
			print i, ": ",indirizzo[i]
		print(indirizzo[0])
		if(indirizzo[1]=="beacons"):
			self.send_response(200)
			self.send_header("Content-type", "application/json")
			self.send_header("Content-length", len(DUMMY_JSON))
			self.end_headers()
			self.wfile.write(DUMMY_JSON)
		elif(len(indirizzo)==3 and indirizzo[1]=="beacon"):
			self.send_response(200)
                        self.send_header("Content-type", "application/json")
			if(indirizzo[2]=="1"):
                        	self.send_header("Content-length", len(DUMMY_LED))
                        	self.end_headers()
                        	self.wfile.write(DUMMY_LED)
			elif(indirizzo[2]=="2"):
				self.send_header("Content-length", len(DUMMY_APRIPORTA))
                                self.end_headers()
                                self.wfile.write(DUMMY_APRIPORTA)

		elif(indirizzo[1]=="accendi"):
			self.send_response(200)
                        self.send_header("Content-type", "application/json")
                        self.send_header("Content-length", len(DUMMY_STATO))
                        self.end_headers()
                        self.wfile.write(DUMMY_STATO)
			accendi_LED(led)
			
		elif(indirizzo[1]=="spegni"):
			self.send_response(200)
                        self.send_header("Content-type", "application/json")
                        self.send_header("Content-length", len(DUMMY_STATO))
                        self.end_headers()
                        self.wfile.write(DUMMY_STATO)
			spegni_LED(led)
		else:
			self.send_response(200)
                        self.send_header("Content-type", "text/html")
                        self.send_header("Content-length", len(DUMMY_GET))
                        self.end_headers()
                        self.wfile.write(DUMMY_GET)
			accendi_LED(led)

	def do_POST(self):
		self.send_response(404)
		self.send_header("Content-type", "text/html")
		self.send_header("Content-length", len(DUMMY_POST))
		self.end_headers()
		self.wfile.write(DUMMY_POST)
		spegni_LED(led)

inizializza_LED()
httpd = SocketServer.TCPServer(("", PORT), MyHandler)
print "in ascolto sulla porta", PORT
try:
    httpd.serve_forever()
except KeyboardInterrupt:
     pass
httpd.server_close()
clean_GPIO()
print "Server terminato con successo"
