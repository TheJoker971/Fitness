import {IUser, ModelRegistry} from "../models";
import {Model} from 'mongoose';
import {ServiceResult} from "./service.result";


export class UserService{
    private userModel: Model<IUser>
    constructor(private registry:ModelRegistry){
        this.userModel = registry.userModel;
    }


    async getAll():Promise<ServiceResult<IUser[]>>{
        try{
            const users = await this.userModel.find().exec();
            return ServiceResult.success(users);
        }catch(err){
            return ServiceResult.failed();
        }
    }
}