import express from 'express';
import {Mongoose} from 'mongoose';
import {MongooseUtils} from "./mogoose.utils";
import {ModelRegistry} from "../models";
import {AuthService, SalleService, ExerciseTypeService} from "../services";
import {AuthController, SalleController, ExerciseTypeController} from "../controllers";


export class AppUtils{

    static async launchAPI(){
        const db : Mongoose = await MongooseUtils.open();
        const registry = new ModelRegistry(db);
        const app = express();
        const salleService = new SalleService(registry);
        const exerciseTypeService = new ExerciseTypeService(registry);;
        const authService = new AuthService(registry);
        const salleController = new SalleController(salleService,authService);
        const authController = new AuthController(authService);
        const exerciseTypeController = new ExerciseTypeController(exerciseTypeService);

        app.use(express.json()); 

        app.use('/exerciseType',exerciseTypeController.buildRoutes());
        app.use('/salle',salleController.buildRoutes());
        app.use('/auth',authController.buildRoutes());
        app.listen(process.env.PORT,function(){
            console.log(`Listening on port ${process.env.PORT}`);
        });

    }
}