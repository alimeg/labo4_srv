const PokemonUser = require('../modeles/PokemonUser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const privateKey = require('../auth/private_key');

module.exports = (app) => {
    app.post('/pokemonlogin', async (req, res) => {
        const { email, password } = req.body;

        // Vérifier que les champs requis sont présents
        if (!email || !password) {
            return res.status(400).json({ message: "Le nom d'utilisateur et le mot de passe sont requis." });
        }

        try {
            // Rechercher l'utilisateur par l'email
            const user = await PokemonUser.findOne({ email });

            // Vérifier si l'utilisateur existe
            if (!user) {
                const message = "L'utilisateur n'a pas été trouvé.";
                return res.status(404).json({ message });
            }

            // Comparer le mot de passe hashé avec celui fourni
            const isPasswordValid = await bcrypt.compare(password, user.password);

            // Vérifier la validité du mot de passe
            if (!isPasswordValid) {
                const message = "Le mot de passe est incorrect.";
                return res.status(401).json({ message });
            }

            // Générer le token JWT
            const token = jwt.sign(
                { userId: user._id,
                  firstName: user.prenom,
                  lastName: user.nom 
                },
                privateKey,
                { expiresIn: '24h' }
            );

            const message = "L'utilisateur est connecté avec succès.";
            res.json({ message, data: user, token });

        } catch (error) {
            console.error("Erreur lors de la connexion de l'utilisateur :", error);
            const message = "L'utilisateur n'a pas pu se connecter. Réessayez dans quelques instants.";
            res.status(500).json({ message, error });
        }
    });
};
