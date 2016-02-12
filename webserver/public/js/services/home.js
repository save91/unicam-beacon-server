angular.module('beaconApp.services.home',[])

.factory('Home', function() {
  return {
  	getMenu: function() {
			       return [{
               nome: "Gestisci i tuoi dispositivi",
               url: "#/dispositivi"
             }, {
               nome: "Gestione GPIO",
               url: "#/gpio"
             }, {
               nome: "Gestione utenti",
               url: "#/utenti"
             }, {
               nome: "Gestione operazioni",
               url: "#/operazioni"
             }, {
               nome: "Log",
               url: "#/log"
             }];
        }
  };
});
