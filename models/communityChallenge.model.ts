import { Schema, Document, model, Model, Types } from 'mongoose';

export interface ICommunityChallenge extends Document {
    name: string;
    description: string;
    objectives: string[];
    recommendedExercises: string[];
    duration: number; 
    difficulty: string; // Difficulté du défi: facile, intermédiaire, difficile
    createdBy: Types.ObjectId; // Référence à l'utilisateur qui a créé le défi
}

export const communityChallengeSchema: Schema<ICommunityChallenge> = new Schema({
    name: { 
        type: String, 
        required: true 
    },
    description: { 
        type: String, 
        required: true 
    },
    objectives: [{ 
        type: String, 
        required: true 
    }],
    recommendedExercises: [{ 
        type: String, 
        required: true 
    }],
    duration: { 
        type: Number, 
        required: true 
    },
    difficulty: { 
        type: String, 
        required: true, 
        enum: ['facile', 'intermédiaire', 'difficile'] 
},
    createdBy: { 
        type: Schema.Types.ObjectId, 
        ref: 'User', 
    required: true 
}
}, {
    versionKey: false
});

