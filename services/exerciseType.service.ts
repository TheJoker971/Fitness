import {Model} from "mongoose";
import { IExerciseType, ModelRegistry } from '../models';
import { ServiceResult } from './service.result';

export class ExerciseTypeService {

    private exerciseTypeModel: Model<IExerciseType>;

    constructor(private modelRegistry: ModelRegistry) {
        this.exerciseTypeModel = modelRegistry.exerciseTypeModel;
    }

    async create(name: string, description: string, targetedMuscles: string[]): Promise<ServiceResult<IExerciseType>> {
        try {
            const exerciseType = await this.exerciseTypeModel.create({ name, description, targetedMuscles });
            return ServiceResult.success(exerciseType);
        } catch (err) {
            return ServiceResult.failed();
        }
    }

    async update(id: string, name: string, description: string, targetedMuscles: string[]): Promise<ServiceResult<IExerciseType>> {
        try {
            const updatedExerciseType = await this.exerciseTypeModel.findByIdAndUpdate(
                id, 
                { name, description, targetedMuscles }, 
                { new: true }
            ).exec();
            if (updatedExerciseType) {
                return ServiceResult.success(updatedExerciseType);
            }
            return ServiceResult.notFound();
        } catch (err) {
            return ServiceResult.failed();
        }
    }
}