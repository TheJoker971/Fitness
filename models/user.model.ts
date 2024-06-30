import {Schema} from 'mongoose';
import {ISalle} from "./salle.model";

export interface IUser {
    login:string;
    password:string;
    accesses:number;
    active:boolean;
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
    accesses:{
        type:Schema.Types.Number,
        required:true
    },
    active:{
        type:Schema.Types.Boolean,
        required:true
    }
},{
    versionKey:false // Permet d'enlever les version de la db
});
