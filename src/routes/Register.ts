import { Request, Response, Router } from 'express';
import PokemonUser from '../models/PokemonUser';
import bcrypt from 'bcrypt';

const router = Router();

// Define the route with explicit function typing to avoid TypeScript's overload issue
router.post(
  "/registerpokemon",
  async (req: Request, res: Response): Promise<void> => {
    const { email, password, nom, prenom, numeroTel } = req.body;

    // Basic input validation
    if (!email || !password || !nom || !prenom || !numeroTel) {
      res.status(400).json({ message: "Tous les champs sont requis" });
      return;
    }

    try {
      // Check if user already exists
      const existingPokemonUser = await PokemonUser.findOne({ email });
      if (existingPokemonUser) {
        res.status(400).json({ message: "Un utilisateur avec cet e-mail existe déjà" });
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
      res.status(500).json({ message: "Une erreur est survenue lors de l'enregistrement de l'utilisateur" });
    }
  }
);

export default router;
