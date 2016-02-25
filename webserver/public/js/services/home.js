angular.module('beaconApp.services.home',[])

.factory('Home', function() {
  return {
  	getMenu: function() {
      var menu = [];
      menu.push({nome: "Gestisci i tuoi dispositivi", url: "#/dispositivi"});
      menu.push({nome: "Gestione GPIO", url: "#/gpio"});
      menu.push({nome: "Gestione utenti", url: "#/utenti"});
      menu.push({nome: "Gestione operazioni", url: "#/operazioni"});
      if(!window.localStorage['Authorization']) {
        menu.push({nome: "Login", url: "#/login"});
      } else {
        menu.push({nome: "Logout", url: "#/login"})
      }
			return menu;
    }
  };
});
