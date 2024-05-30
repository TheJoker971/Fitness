import {Model,Mongoose} from 'mongoose';
import {ISalle,salleSchema} from "./salle.model";
import {IUser, userSchema} from "./user.model";
import {ISession, sessionSchema} from "./session.model";
import {IExerciseType,ExerciseTypeSchema} from "./exerciseType.model";

export class ModelRegistry{
    readonly mongoose : Mongoose;
    readonly userModel : Model<IUser>;
    readonly salleModel : Model<ISalle>;
    readonly sessionModel : Model<ISession>;
    readonly exerciseTypeModel : Model<IExerciseType>;

    constructor(mongoose:Mongoose) {
        this.mongoose = mongoose;
        this.userModel = mongoose.model('Users',userSchema);
        this.salleModel = mongoose.model('Salles',salleSchema);
        this.sessionModel = mongoose.model('Sessions',sessionSchema)
        this.exerciseTypeModel = mongoose.model('ExerciseType',ExerciseTypeSchema)
    }

}