//const PokemonUser = require("../db/mongoose");
const bcrypt = require("bcrypt");
//const { PokemonUser } = require('../db/mongoose');
const PokemonUser = require('../modeles/PokemonUser');
module.exports = (app) => {
  app.post("/registerpokemon", (req, res) => {
    const { email, password, nom, prenom, numeroTel } = req.body;

    // Validation basique des entrées
    if (!email || !password || !nom || !prenom || !numeroTel) {
      return res.status(400).json({ message: "Tous les champs sont requis" });
    }
    console.log(PokemonUser);
    PokemonUser.findOne({ email })
      .then(existingPokemonUser => {
        if (existingPokemonUser) {
          throw { status: 400, message: "Un utilisateur avec cet e-mail existe déjà" };
        }
        return bcrypt.hash(password, 5);
      })
      .then(hashedPassword => {
        const newPokemonUser = new PokemonUser({
          email: email,
          password: hashedPassword,
          nom: nom,
          prenom: prenom,
          numeroTel: numeroTel
        });
        return newPokemonUser.save();
      })
      .then(pokemonuser => {
        res.status(201).json(pokemonuser);
      })
      .catch(error => {
        if (error.status) {
          res.status(error.status).json({ message: error.message });
        } else {
          console.error(error);
          res.status(500).json({ message: "Une erreur est survenue lors de l'enregistrement de l'utilisateur", data: error });
        }
      });
  });
};
