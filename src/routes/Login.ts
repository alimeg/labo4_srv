import { Router, Request, Response } from 'express';
import PokemonUser from '../models/PokemonUser';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = Router();

router.post(
  '/',
  async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: "Email et mot de passe sont requis" });
      return;
    }

    try {
      const user = await PokemonUser.findOne({ email });
      if (!user) {
        res.status(400).json({ message: "Email ou mot de passe incorrect" });
        return;
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        res.status(400).json({ message: "Email ou mot de passe incorrect" });
        return;
      }

      const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY || '', { expiresIn: '1h' });
      res.status(200).json({ token, user });
    } catch (error) {
      console.error("Error during user login:", error);
      res.status(500).json({ message: "Une erreur est survenue lors de la connexion de l'utilisateur" });
    }
  }
);

export default router;
