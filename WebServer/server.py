import BaseHTTPServer
import SocketServer
#Importo le librerie necessarie
#import RPi.GPIO as GPIO
import time
import signal

PORT = 8000

DUMMY_GET = """<html><body>CiaoMondo<br><p>Questa e' una risposta ad una chiamata in get</p><form method='POST'><input type='submit' value='test'></form></body></html>"""
DUMMY_POST = """<html><body>CiaoMondo<br><p>Questa e' una risposta ad una chiamata in post</p></body></html>"""

#def inizializza_LED():
#    #Controlle che i GPIO pins siano pronti
#    GPIO.setmode(GPIO.BCM)
#    GPIO.setwarnings(False)
#    #Setto il pin come output
#    led = 24
#    GPIO.setup(led, GPIO.OUT)
#
#def accendi_LED(pin):
#    GPIO.output(pin, 1)
#
#def spegni_LED(pin):
#    GPIO.output(pin, 0)
#
#def clean_GPIO():
#    GPIO.cleanup()


def dividi_URL(url):
    return url.split('/')

class MyHandler(BaseHTTPServer.BaseHTTPRequestHandler):
	def __init__(self,req,client_addr,server):
		BaseHTTPServer.BaseHTTPRequestHandler.__init__(self,req,client_addr,server)

	def do_GET(self):

		print self.path
		self.send_response(200)
		self.send_header("Content-type", "text/html")
		self.send_header("Content-length", len(DUMMY_GET))
		self.end_headers()
		self.wfile.write(DUMMY_GET)


	def do_POST(self):
		self.send_response(200)
		self.send_header("Content-type", "text/html")
		self.send_header("Content-length", len(DUMMY_POST))
		self.end_headers()
		self.wfile.write(DUMMY_POST)

httpd = SocketServer.TCPServer(("", PORT), MyHandler)
print "in ascolto sulla porta", PORT
try:
    httpd.serve_forever()
except KeyboardInterrupt:
     pass
httpd.server_close()
print "Server terminato con successo"
