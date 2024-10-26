// src/utils/messages.ts

import { Request } from 'express';

export type Language = 'fr' | 'en';

export const messages = {
  requiredFields: {
    fr: "Tous les champs sont requis",
    en: "All fields are required",
  },
  userExists: {
    fr: "Un utilisateur avec cet e-mail existe déjà",
    en: "A user with this email already exists",
  },
  registrationError: {
    fr: "Une erreur est survenue lors de l'enregistrement de l'utilisateur",
    en: "An error occurred during user registration",
  },
};

export const getPreferredLanguage = (req: Request): Language => {
  const lang = (req.headers['accept-language'] as string) || '';
  return lang.includes('fr') ? 'fr' : 'en'; // Default to English if French is not present
};
