import { Router, Request, Response } from 'express';
import { messages, getPreferredLanguage, Language } from '../utils/messages';
import PokemonUser from '../models/PokemonUser';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const router = Router();

router.post(
  '/',
  async (req: Request, res: Response): Promise<void> => {
    const { email, password, nom, prenom, numeroTel } = req.body;
    const language: Language = getPreferredLanguage(req);

    if (!email || !password || !nom || !prenom || !numeroTel) {
      res.status(400).json({ message: messages.requiredFields[language] });
      return;
    }

    try {
      const existingUser = await PokemonUser.findOne({ email });
      if (existingUser) {
        res.status(400).json({ message: messages.userExists[language] });
        return;
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new PokemonUser({
        email,
        password: hashedPassword,
        nom,
        prenom,
        numeroTel,
      });

      const savedUser = await newUser.save();

      const token = jwt.sign({ id: savedUser._id }, process.env.SECRET_KEY || '', { expiresIn: '1h' });

      res.status(201).json({
        success: true,
        token,
        user: {
          email: savedUser.email,
          nom: savedUser.nom,
          prenom: savedUser.prenom,
          numeroTel: savedUser.numeroTel,
        },
      });
    } catch (error: unknown) {  // Explicitly typing the error
      if (error instanceof Error) {
        console.error("Error during user registration:", error.message); // Log the detailed error
        res.status(500).json({
          message: "Une erreur est survenue lors de l'enregistrement de l'utilisateur",
          error: error.message, // Include the error message for debugging
        });
      } else {
        console.error("Unexpected error:", error);
        res.status(500).json({
          message: "Une erreur inattendue est survenue.",
        });
      }
    }
  }
);

export default router;
