// == .env
require('dotenv').config();
// == require module
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');

// == require router
const routerBook = require('./router/routerBook');
const routerAuthor = require('./router/routerAuthor');
const router = require('./router/router');

const PORT = process.env.PORT || 3000;
const server = express();


// == Configuration CORS
server.use(bodyParser.json()); // => req.body va contenir le JSON de la req
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

// == mongoose coonect
mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true});


// == morgan (pour avoir les chemins de requete dans le terminal en "clair")
server.use(morgan("dev"));

// == pour les fichiers statiques
server.use(express.static("public"));

// server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: false}));
server.set('trust proxy', 1);

// == router
server.use(routerAuthor);
server.use(routerBook);
// == router global en dernier!!!!
server.use(router);


// == on lance le serveur
server.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});


