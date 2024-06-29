const mongoose = require('mongoose');

const PokemonUserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function(v) {
        return /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(v);
      },
      message: 'Le format de l\'adresse e-mail est invalide.'
    }
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return v.length >= 6;
      },
      message: 'Le mot de passe doit contenir au moins 8 caractères.'
    }
  },
  nom: {
    type: String,
    required: true
  },
  prenom: {
    type: String,
    required: true
  },
  numeroTel: {
    type: Number,
    required: true
  }
});

const PokemonUser = mongoose.model('PokemonUser', PokemonUserSchema);

module.exports = PokemonUser;
