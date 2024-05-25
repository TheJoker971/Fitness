import {Schema} from 'mongoose';
import {ISalle} from "./salle.model";

export interface IUser {
    login:string;
    password:string;
    acceses:number;
    salles:ISalle[] | [];
}

export const userSchema = new Schema<IUser> ({
    login :{
        type:Schema.Types.String,
        index:true,
        unique:true,
        required:true
    },
    password:{
        type: Schema.Types.String,
        required:true
    },
    acceses:{
        type:Schema.Types.Number,
        required:true
    },
    salles:{
        type:[Schema.Types.ObjectId],
        ref:'Salles',
        required:true
    }
},{
    versionKey:false // Permet d'enlever les version de la db
});
