# unicam-beacon-server
Server in NodeJS più WebApp in Angular di ProximitySystem, un sistema per la domotica legata ai beacon.

## Installazione
Per installare ed eseguire proximitySystem sono necessari NodeJS e Bower

```
cd webserver
npm install
cd public
bower install
```
  
## Esucuzione
Per eseguire il webserver su PC è necessario settare una variabile d'ambiente per far
capire a node che si è su un PC e non su un RaspberryPI.

```
export NODE_ENV=development
cd webserver
node index.js
```  

Per far partire il tutto su un RaspberryPI basta il seguente comando

```
npm start
```
