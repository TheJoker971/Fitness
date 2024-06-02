import {Schema} from 'mongoose';

export interface IExercice{
    name:string;
    reps:number;
}

export const  exerciceModel = new Schema<IExercice>({
        name:{
            type: Schema.Types.String,
            required : true
        },
        reps:{
            type: Schema.Types.Number,
            required: true
        }
    },{
        versionKey:false
    }
)