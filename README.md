# unicam-beacon-server
Server in NodeJS più WebApp in Angular di ProximitySystem, un sistema per la domotica legata ai beacon.

## Installazione
Per installare ed eseguire proximitySystem sono necessari NodeJS e Bower

```
cd webserver
npm install
cd angular
bower install
```

## Database
Assicurarsi che il demone di MongoDB sia in esecuzione e lanciare il seguente comando per popolare il database con i dati iniziali

```
cd ..
node test/config/setup_tests.js
```

## Esucuzione
Per eseguire il webserver su PC è necessario settare una variabile d'ambiente per far
capire a node che si è su un PC e non su un RaspberryPI.

```
export NODE_ENV=development
node server.js
```  

Per far partire il tutto su un RaspberryPI basta il seguente comando

```
npm start
```
