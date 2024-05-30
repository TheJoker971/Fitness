import { Schema, Document, model, Model } from 'mongoose';

export interface IBadge extends Document {
    name: string;
    description: string;
    criteria: string;
    imageUrl: string;
}

export const BadgeSchema: Schema<IBadge> = new Schema({
    name: { 
        type: String, 
        required: true 
    },
    description: { 
        type: String, 
        required: true 
    },
    criteria: { 
        type: String, 
        required: true 
    },
    imageUrl: { 
        type: String, 
        required: true 
    }
}, {
    versionKey: false
});

const Badge: Model<IBadge> = model<IBadge>('Badge', BadgeSchema);

export default Badge;
