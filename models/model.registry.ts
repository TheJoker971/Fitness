import {Model,Mongoose} from 'mongoose';
import {ISalle,salleSchema} from "./salle.model";
import {IUser, userSchema} from "./user.model";
import {ISession, sessionSchema} from "./session.model";
import {IExerciseType,ExerciseTypeSchema} from "./exerciseType.model";
import {IBadge, BadgeSchema} from "./badge.model";
import {IUserBadge, UserBadgeSchema} from "./userBadge.model";
import {IChallenge, ChallengeSchema} from "./challenge.model";
import {IUserChallenge, userChallengeSchema} from "./userChallenge.model";

export class ModelRegistry{
    readonly mongoose : Mongoose;
    readonly userModel : Model<IUser>;
    readonly salleModel : Model<ISalle>;
    readonly sessionModel : Model<ISession>;
    readonly exerciseTypeModel : Model<IExerciseType>;
    readonly badgeModel : Model<IBadge>;
    readonly userBadgeModel : Model<IUserBadge>;
    readonly challengeModel : Model<IChallenge>;
    readonly userChallengeModel : Model<IUserChallenge>;

    constructor(mongoose:Mongoose) {
        this.mongoose = mongoose;
        this.userModel = mongoose.model('Users',userSchema);
        this.salleModel = mongoose.model('Salles',salleSchema);
        this.sessionModel = mongoose.model('Sessions',sessionSchema)
        this.exerciseTypeModel = mongoose.model('ExerciseTypes',ExerciseTypeSchema)
        this.badgeModel = mongoose.model('Badges',BadgeSchema)
        this.userBadgeModel = mongoose.model('UserBadges', UserBadgeSchema)
        this.challengeModel = mongoose.model('Challenges', ChallengeSchema)
        this.userChallengeModel = mongoose.model('UserChallenges', userChallengeSchema)
    }

}