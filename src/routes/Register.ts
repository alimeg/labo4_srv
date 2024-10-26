// src/routes/pokemon.ts

import { Request, Response, Router } from 'express';
import PokemonUser from '../models/PokemonUser';
import bcrypt from 'bcrypt';
import { messages, getPreferredLanguage, Language } from '../utils/messages';

const router = Router();

router.post(
  "/registerpokemon",
  async (req: Request, res: Response): Promise<void> => {
    const { email, password, nom, prenom, numeroTel } = req.body;
    const language: Language = getPreferredLanguage(req); // Ensure language is of type Language

    // Basic input validation
    if (!email || !password || !nom || !prenom || !numeroTel) {
      res.status(400).json({ message: messages.requiredFields[language] });
      return;
    }

    try {
      // Check if user already exists
      const existingPokemonUser = await PokemonUser.findOne({ email });
      if (existingPokemonUser) {
        res.status(400).json({ message: messages.userExists[language] });
        return;
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 5);

      // Create a new user
      const newPokemonUser = new PokemonUser({
        email,
        password: hashedPassword,
        nom,
        prenom,
        numeroTel,
      });

      // Save the user to the database
      const savedUser = await newPokemonUser.save();
      res.status(201).json(savedUser);
    } catch (error) {
      console.error("Error during user registration:", error);
      res.status(500).json({ message: messages.registrationError[language] });
    }
  }
);

export default router;
