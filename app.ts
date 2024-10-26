import express, { Application } from 'express';
import { initialisationDb } from './src/db/mongoose';
import favicon from 'serve-favicon';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';
import registerRoutes from './src/routes/Register'; // Register routes
import loginRoutes from './src/routes/Login'; // Login routes
import dotenv from 'dotenv';

dotenv.config(); 

const app: Application = express();
const port = 3011;

// Initialize the database
initialisationDb();

// Middleware
app.use(cors());
app.use(favicon(__dirname + '/favicon.ico'));
app.use(morgan('dev'));
app.use(bodyParser.json());

// Test route
app.get('/', (req, res) => {
  res.send('Bienvenue sur notre application Node.js!');
});

// Use the routes with a prefix
app.use('/api/register', registerRoutes); // Register router
app.use('/api/login', loginRoutes); // Login router
app.post('/test-register', (req, res) => {
  res.send('Test registration endpoint is working!');
});
// Error handling for 404
app.use((req, res) => {
  res.status(404).json({ message: 'Impossible de trouver la ressource demandée' });
});

// Start the server
app.listen(port, () => {
  console.log(`Notre application a démarré sur http://localhost:${port}`);
});
