import {Schema} from 'mongoose';
import {IExercice} from "./exercice.model";



export interface ISeance {
    exercices : IExercice[] | [];
    duration : string;
    burnedCal:number;
    weight:number;
}

export const seanceSchema = new Schema<ISeance> ({
    exercices:{
        type:[Schema.Types.ObjectId],
        required:true
    },
    duration:{
        type:Schema.Types.String,
        required: true
    },
    burnedCal:{
        type: Schema.Types.Number,
        required : true
    },
    weight:{
        type: Schema.Types.Number,
        required:true
    }
},{
    versionKey:false // Permet d'enlever les version de la db
});
