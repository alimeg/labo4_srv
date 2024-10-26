// const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');

// // Importer le modèle PokemonUser
// const PokemonUser = require('../modeles/PokemonUser');

// // Se connecter à la base de données MongoDB
// mongoose.connect('mongodb+srv://pokemon:pokemon123@cluster0.dhtbbzq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
// });

// // Vérifier la connexion à la base de données
// mongoose.connection.on('connected', () => {
//   console.log('Connexion à MongoDB réussie !');
// });

// mongoose.connection.on('error', (err) => {
//   console.error('Erreur de connexion à MongoDB :', err);
// });

// // Initialiser la base de données
// const initialisationDb = async () => {
//   try {
//     console.log("La base de données a été synchronisée");
//   } catch (error) {
//     console.error("Erreur lors de l'initialisation de la base de données", error);
//   }
// };

// module.exports = {
//   initialisationDb,
//   PokemonUser
// };
// src/db/mongoose.ts
import mongoose from 'mongoose';
import PokemonUser from '../models/PokemonUser'; // Adjust the path according to your project structure

const uri = 'mongodb+srv://pokemon:pokemon123@cluster0.dhtbbzq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

const connectDb = async () => {
    try {
        await mongoose.connect(uri, {

        });
        console.log('Connexion à MongoDB réussie !');
    } catch (error) {
        console.error('Erreur de connexion à MongoDB :', error);
    }
};

const initialisationDb = async () => {
    await connectDb(); // Ensure the connection is established
    console.log("La base de données a été synchronisée");
};

// Export the initialization function and the model
export { initialisationDb, PokemonUser };
