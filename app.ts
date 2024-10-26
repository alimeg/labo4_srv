import express, { Application } from 'express';
import { initialisationDb } from './src/db/mongoose';
import favicon from 'serve-favicon';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';
import registerRoutes from './src/routes/Register'; // Adjust this path
import loginRoutes from './src/routes/Login'; // Adjust this path

const app: Application = express();
const port = 3011;

// Initialize the database
initialisationDb(); // Assuming this handles connection internally

// Middleware
app.use(cors());
app.use(favicon(__dirname + '/favicon.ico'));
app.use(morgan('dev'));
app.use(bodyParser.json());

// Test route
app.get('/', (req, res) => {
  res.send('Bienvenue sur notre application Node.js!');
});

// Use the routes
app.use(registerRoutes); // Use the register router
app.use(loginRoutes); // Use the login router

// Error handling for 404
app.use((req, res) => {
  res.status(404).json({ message: 'Impossible de trouver la ressource demandée' });
});

// Start the server
app.listen(port, () => {
  console.log(`Notre application a démarré sur http://localhost:${port}`);
});
