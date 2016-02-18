//Oggetto user
users = {};

users.login = function (req, res) {
  console.log('login request');
  var pos = -1;
  for(var i = 0;i<req.users.length;i++) {
    if(req.users[i].username === req.body.username && users[i].psw === req.body.password) {
      pos = i;
      i = req.users.length;
    }
  }
  if(pos>=0) {
    //Invio tutto tranne la pasword
    res.status(200).send({
      nome: req.users[pos].nome,
      cognome: req.users[pos].cognome,
      permessi: req.users[pos].permessi,
      username: req.users[pos].username
    });
  }else {
    res.status(500).send("Errore nel login");
  }
};

users.utenti = function (req, res) {
    console.log('users request');
    res.status(200).send(req.users);

};

users.utente = function (req, res) {
  var trovato = -1;
  var i = 0;
  console.log('user request');
  while(trovato===-1 && i<req.users.length) {
    if(req.users[i].username===req.body.username) {
      trovato = i;
    }
    i++;
  }
  if(trovato>=0) {
    res.status(200).send(req.users[trovato]);
  } else {
    res.status(404).send('User not found.');
  }
};

users.aggiorna_utente = function (req, res, next) {
  var trovato = -1;
  var i = 0;
  console.log('user request');
  while(trovato===-1 && i<req.users.length) {
    if(req.users[i].username===req.body.username) {
      trovato = i;
    }
    i++;
  }
  if(trovato>=0) {
    req.users[trovato].nome = req.body.nome;
    req.users[trovato].cognome = req.body.cognome;
    req.users[trovato].permessi = req.body.permessi;
    req.users[trovato].bloccato = req.body.bloccato;
    res.status(200).send(req.users[trovato]);
    next();
  } else {
    res.status(500).send('Oops, Something went wrong!');
  }
};

users.blocca_utente = function (req, res, next) {
  console.log('block user request');
  var i = 0;
  var trovato = -1;
  while(trovato === -1 && i < req.users.length) {
    if(req.users[i].username===req.body.username) {
      req.users[i].bloccato = true;
    }
    i++;
  }
  res.status(200).send(req.users);
  next();
};

users.sblocca_utente = function (req, res, next) {
  console.log('block user request');
  var i = 0;
  var trovato = -1;
  while(trovato === -1 && i < req.users.length) {
    if(req.users[i].username===req.body.username) {
      req.users[i].bloccato = false;
    }
    i++;
  }
  res.status(200).send(req.users);
  next();
};

module.exports = users;
