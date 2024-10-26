import mongoose, { Document, Schema } from 'mongoose';

// Define an interface that extends Document to type the PokemonUser
interface IPokemonUser extends Document {
    email: string;
    password: string;
    nom: string;
    prenom: string;
    numeroTel: number;
}

// Create the schema using the IPokemonUser interface
const PokemonUserSchema: Schema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: (v: string) => /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(v),
            message: 'Le format de l\'adresse e-mail est invalide.'
        }
    },
    password: {
        type: String,
        required: true,
        validate: {
            validator: (v: string) => v.length >= 6,
            message: 'Le mot de passe doit contenir au moins 6 caractères.'
        }
    },
    nom: {
        type: String,
        required: true
    },
    prenom: {
        type: String,
        required: true
    },
    numeroTel: {
        type: Number,
        required: true
    }
});

// Create the model
const PokemonUser = mongoose.model<IPokemonUser>('PokemonUser', PokemonUserSchema);

export default PokemonUser;
