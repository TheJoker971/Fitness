import {Model,Mongoose} from 'mongoose';
import {ISalle,salleSchema} from "./salle.model";
import {IUser, userSchema} from "./user.model";
import {ISession, sessionSchema} from "./session.model";
import {IExerciseType, exerciseTypeSchema} from "./exerciseType.model";
import {IBadge, badgeSchema} from "./badge.model";
import {IUserBadge, userBadgeSchema} from "./userBadge.model";
import {IChallenge, challengeSchema} from "./challenge.model";
import {IUserChallenge, userChallengeSchema} from "./userChallenge.model";
import {exerciseChallengeSchema, IExerciseChallenge} from "./exerciseChallenge.model";
import {ICommunityChallenge, communityChallengeSchema} from "./communityChallenge.model";


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
    readonly exerciseChallengeModel : Model<IExerciseChallenge>;
    readonly communityChallengeModel : Model<ICommunityChallenge>;

    constructor(mongoose:Mongoose) {
        this.mongoose = mongoose;
        this.userModel = mongoose.model('Users',userSchema);
        this.salleModel = mongoose.model('Salles',salleSchema);
        this.sessionModel = mongoose.model('Sessions',sessionSchema);
        this.exerciseTypeModel = mongoose.model('ExerciseTypes',exerciseTypeSchema);
        this.badgeModel = mongoose.model('Badges',badgeSchema);
        this.userBadgeModel = mongoose.model('UserBadges', userBadgeSchema);
        this.challengeModel = mongoose.model('Challenges', challengeSchema);
        this.userChallengeModel = mongoose.model('UserChallenges', userChallengeSchema);
        this.exerciseChallengeModel = mongoose.model("ExerciseChallenges",exerciseChallengeSchema);
        this.communityChallengeModel = mongoose.model('CommunityChallenges', communityChallengeSchema)

    }
}