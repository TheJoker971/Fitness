import {Model} from "mongoose";
import {ISalle, ModelRegistry} from "../models";
import {ServiceResult} from "./service.result";

export class SalleService {

    private salleModel: Model<ISalle>;

    constructor(private modelRegistry: ModelRegistry) {
        this.salleModel = modelRegistry.salleModel;
    }

    async create(name:string, country:string, city:string, way:string): Promise<ServiceResult<ISalle>> {
        console.log("Creating...");
        try {
            const salle = await this.salleModel.create({
                name: name,
                country: country,
                city: city,
                way: way
            });
            return ServiceResult.success(salle);
        } catch(err) {
            console.log("Not created");
            return ServiceResult.failed();
        }
    }

    async getAll(): Promise<ServiceResult<ISalle[]>> {
        try {
            const salles = await this.salleModel.find().exec();
            return ServiceResult.success(salles);
        } catch(err) {
            return ServiceResult.failed();
        }
    }

    async getById(id: string): Promise<ServiceResult<ISalle>> {
        try {
            const salle = await this.salleModel.findById(id).exec();
            if(salle) {
                return ServiceResult.success(salle);
            }
            return ServiceResult.notFound();
        } catch(err) {
            return ServiceResult.failed();
        }
    }
}