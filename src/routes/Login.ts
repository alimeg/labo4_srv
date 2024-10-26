import { Request, Response, Router } from 'express';
import PokemonUser from '../models/PokemonUser';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = Router();

// Define the route with explicit function typing
router.post(
  "/login",
  async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    // Basic input validation
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

      // Generate JWT token
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || '', { expiresIn: '1h' });
      res.status(200).json({ token, user });
    } catch (error) {
      console.error("Error during user login:", error);
      res.status(500).json({ message: "Une erreur est survenue lors de la connexion de l'utilisateur" });
    }
  }
);

export default router;
