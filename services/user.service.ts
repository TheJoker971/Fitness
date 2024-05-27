import {IUser, ModelRegistry} from "../models";
import {Model} from 'mongoose';
import {ServiceResult} from "./service.result";


export class UserService{
    private userModel: Model<IUser>
    constructor(private registry:ModelRegistry){
        this.userModel = registry.userModel;
    }


    async deleteUser(id:string){
        try{
            await this.userModel.findByIdAndDelete(id).exec();
            return ServiceResult.success(undefined);
        }catch(err){
            return ServiceResult.failed();
        }
    }
    async editUser(id:string,active:boolean){
        try{
            const update = await this.userModel.updateOne({
                _id:id
            },{$set:{active:active}});
            return ServiceResult.success(update);
        }catch(err){
            return ServiceResult.failed();
        }


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