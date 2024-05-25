import {Schema} from 'mongoose'
export interface ISalle {
    name: string;
    country: string;
    city: string;
    way: string;
}

export const salleSchema = new Schema<ISalle>({
    name:{
        type: Schema.Types.String,
        required: true
    },
    country: {
        type:Schema.Types.String,
        required:true
    },
    city: {
        type:Schema.Types.String,
        required: true
    },
    way:{
        type:Schema.Types.String,
        required:true
    }
},{
    versionKey: false
});