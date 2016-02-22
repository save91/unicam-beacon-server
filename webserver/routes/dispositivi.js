//Oggetto dispositivi
var dispositivi = {};

dispositivi.dispositivo_edit_ibeacon = function (req, res, next) {
  console.log('edit dispositivo request');
  var id_dispositivo = parseInt(req.body.id_dispositivo);
  var id_ibeacon = parseInt(req.body.id_ibeacon);
  var trovato = -1;
  var i = 0;
  while(trovato === -1 && i < req.dispositivi.length) {
    if(req.dispositivi[i].id === id_dispositivo) {
        req.dispositivi[i].id_ibeacon = id_ibeacon;
        trovato = i;
      }
    i++;
  }
  res.status(200).send({status:"1", dispositivi: req.dispositivi});
  next();
};

dispositivi.dispositivo = function (req, res) {
  console.log('dispositivo request');
  var i = 0;
  var trovato = -1;
  var id = parseInt(req.body.id);
  while(trovato===-1 && i<req.dispositivi.length) {
    if(req.dispositivi[i].id===id) {
      trovato = i;
    }
    i++;
  }
  if(trovato>=0) {
    res.status(200).send(req.dispositivi[trovato]);
  }
};

dispositivi.salva_dispositivo = function (req, res, next) {
  var trovato = -1;
  var i = 0;
  var id = parseInt(req.body.id);
  var automatico;
  if(req.body.automatico === "true" || req.body.automatico === true) {
    automatico = true;
  }else {
    automatico = false;
  }
  while(trovato===-1 && i<req.dispositivi.length) {
    if(req.dispositivi[i].id===id) {
      trovato = i;
    }
  i++;
  }
  if(trovato>=0) {
    req.dispositivi[trovato].automatico = automatico;
  }
  res.status(200).send({"status":"1","dispositivi":req.dispositivi});
  next();
};

dispositivi.dispositivi = function (req, res) {
  console.log('dispositivi request');
  res.status(200).send(req.dispositivi);
};

dispositivi.dispositivi_output = function (req, res) {
  console.log('dispositivi output request');
  var dispositivo = {};
  var dispositivi_output = [];
  var j = 0;
  var trovato;
  //if(req.user) {
  //  if(req.user.bloccato !== true) {
      for(var i = 0; i < req.dispositivi.length; i++) {
        if(req.dispositivi[i].io === "output" && req.dispositivi[i].id_GPIO !== 0) {
          dispositivo = {};
          dispositivo.nome = req.dispositivi[i].nome;
          dispositivo.descrizione = req.dispositivi[i].descrizione;
          dispositivo.stato = req.dispositivi[i].stato;
          dispositivo.distanza = "Sconosciuta";
          dispositivo.proximity = "ProximityFar";
          dispositivo.automatico = req.dispositivi[i].automatico;
          dispositivo.disabilitato = 0;
          dispositivo.uuid = 0;
          dispositivo.major = 0;
          dispositivo.minor = 0;
          j = 0;
          trovato = -1;
          while(trovato === -1 && j < req.dispositivi.length) {
            if(req.dispositivi[j].id === req.dispositivi[i].id_ibeacon) {
              trovato = 1;
              dispositivo.uuid = req.dispositivi[j].caratteristiche.uuid;
              dispositivo.major = req.dispositivi[j].caratteristiche.major;
              dispositivo.minor = req.dispositivi[j].caratteristiche.minor;
            }
            j++;
          }
          j = 0;
          trovato = -1;
          while(trovato === -1 && j < req.dispositivi.length) {
            if(req.gpio[j].id === req.dispositivi[i].id_GPIO) {
              trovato = 1;
              if(req.gpio[j].stato === true || req.gpio[j].stato === 1) {
                dispositivo.stato = true;
              }else {
                dispositivo.stato = false;
              }
            }
            j++;
          }
          dispositivo.id_GPIO = req.dispositivi[i].id_GPIO;
          dispositivi_output.push(dispositivo);
        }
      }
    res.status(200).send(dispositivi_output);
  /*}else{
    res.status(403).send([]);
  }
}else {
  res.status(403).send([]);
}*/
};

dispositivi.aggiungi_dispositivo = function (req, res, next) {
  console.log('add dispositivo request');
  var newDispositivo = {
    id: Date.now(),
    type: req.body.type,
    io: req.body.io,
    nome: req.body.nome,
    descrizione: req.body.descrizione,
    permessi: " ",
    id_GPIO: 0,
    id_ibeacon: 0,
    caratteristiche: req.body.caratteristiche
  }
  req.dispositivi.push(newDispositivo);
    res.status(200).send({status: "1", dispositivi: req.dispositivi});
    next();
};

dispositivi.elimina_dispositivo = function (req, res, next) {
  var trovato = -1;
  var i = 0;
  var id = parseInt(req.body.id);
  console.log('delete dispositivo request');
  while(trovato===-1 && i<req.dispositivi.length) {
    if(req.dispositivi[i].id===id) {
      trovato = i;
    }
    i++;
  }
  if(trovato>=0) {
    req.dispositivi.splice(trovato,1);
  }
    res.status(200).send({"status":"1","dispositivi":req.dispositivi});
    next();
};

module.exports = dispositivi;
