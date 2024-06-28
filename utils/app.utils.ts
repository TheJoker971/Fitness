import express from 'express';
import {Mongoose} from 'mongoose';
import {MongooseUtils} from "./mogoose.utils";
import {ModelRegistry} from "../models";
import {
    AuthService,
    SalleService,
    ExerciseTypeService,
    BadgeService,
    UserBadgeService,
    ChallengeService,
    UserChallengeService,
    UserService,
    ExerciseChallengeService
} from "../services";
import {AuthController, SalleController, ExerciseTypeController, BadgeController, UserBadgeController, ChallengeController, UserChallengeController,UserController} from "../controllers";
import {ExerciseChallengeController} from "../controllers/exerciseChallenge.controller";



export class AppUtils{

    static async launchAPI(){
        const db : Mongoose = await MongooseUtils.open();
        const registry = new ModelRegistry(db);
        const app = express();
        const salleService = new SalleService(registry);
        const exerciseTypeService = new ExerciseTypeService(registry);
        const badgeService = new BadgeService(registry);
        const userBadgeService = new UserBadgeService(registry);
        const authService = new AuthService(registry);
        const challengeService = new ChallengeService(registry);
        const userChallengeService = new UserChallengeService(registry);
        const userService = new UserService(registry);
        const exerciseChallengeService  = new ExerciseChallengeService(registry);
      
        const userController = new UserController(authService,userService);
        const salleController = new SalleController(salleService,authService);
        const authController = new AuthController(authService);
        const exerciseTypeController = new ExerciseTypeController(exerciseTypeService);
        const badgeController = new BadgeController(badgeService);
        const userBadgeController = new UserBadgeController(userBadgeService);
        const challengeController = new ChallengeController(challengeService);
        const userChallengeController = new UserChallengeController(userChallengeService);
        const exerciseChallengeController = new ExerciseChallengeController(registry,exerciseChallengeService);

        app.use(express.json()); 


        app.use('/userBadge', userBadgeController.buildRoutes());
        app.use('/badge', badgeController.buildRoutes());
        app.use('/exerciseType',exerciseTypeController.buildRoutes());
        app.use('/salle',salleController.buildRoutes());
        app.use('/auth',authController.buildRoutes());
        app.use('/challenge',challengeController.buildRoutes());
        app.use('/userChallenges', userChallengeController.buildRoutes());
        app.use('/user',userController.buildRoutes());
      
        app.listen(process.env.PORT,function(){
            console.log(`Listening on port ${process.env.PORT}`);
        });

    }
}