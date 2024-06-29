const express = require('express');
const mongoose = require('./src/db/mongoose');
const favicon = require('serve-favicon');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Initialisation de la base de données Mongoose
mongoose.initialisationDb();

const port = 3011;

// Middleware CORS pour gérer les requêtes Cross-Origin
app.use(cors());

// Middleware pour servir l'icône favicon et le logging des requêtes
app
  .use(favicon(__dirname + '/favicon.ico'))
  .use(morgan('dev'))
  .use(bodyParser.json());

// Route de test à la racine
app.get('/', (req, res) => {
  res.send('Bienvenue sur notre application Node.js!');
});

// Routes pour l'enregistrement et la connexion des utilisateurs
require('./src/routes/Login')(app);
require('./src/routes/Register')(app);


// Gestion des erreurs 404
app.use((req, res) => {
  const message = 'Impossible de trouver la ressource demandée';
  res.status(404).json({ message });
});

app.listen(port, () => {
  console.log(`Notre application a démarré sur http://localhost:${port}`);
});
