const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Importer le modèle PokemonUser
const PokemonUser = require('../modeles/PokemonUser');

// Se connecter à la base de données MongoDB
mongoose.connect('mongodb+srv://pokemon:pokemon123@cluster0.dhtbbzq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Vérifier la connexion à la base de données
mongoose.connection.on('connected', () => {
  console.log('Connexion à MongoDB réussie !');
});

mongoose.connection.on('error', (err) => {
  console.error('Erreur de connexion à MongoDB :', err);
});

// Initialiser la base de données
const initialisationDb = async () => {
  try {
    console.log("La base de données a été synchronisée");
  } catch (error) {
    console.error("Erreur lors de l'initialisation de la base de données", error);
  }
};

module.exports = {
  initialisationDb,
  PokemonUser
};
