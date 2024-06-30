import { Model } from 'mongoose';
import { ICommunityChallenge, ModelRegistry } from '../models';
import { ServiceResult, ServiceErrorCode } from './service.result';

export class CommunityChallengeService {
    private communityChallengeModel: Model<ICommunityChallenge>;

    constructor(private modelRegistry: ModelRegistry) {
        this.communityChallengeModel = modelRegistry.communityChallengeModel;
    }

    async createChallenge(name: string, description: string, objectives: string[], recommendedExercises: string[], duration: number, difficulty: string, createdBy: string): Promise<ServiceResult<ICommunityChallenge>> {
        try {
            const challenge = await this.communityChallengeModel.create({ name, description, objectives, recommendedExercises, duration, difficulty, createdBy });
            return ServiceResult.success(challenge);
        } catch (err) {
            console.error('Error creating challenge:', err);
            return ServiceResult.failed();
        }
    }

    async getAll(): Promise<ServiceResult<ICommunityChallenge[]>> {
        try {
            const challenges = await this.communityChallengeModel.find().populate('createdBy').exec();
            return ServiceResult.success(challenges);
        } catch (err) {
            console.error('Error retrieving challenges:', err);
            return ServiceResult.failed();
        }
    }

    async getById(id: string): Promise<ServiceResult<ICommunityChallenge>> {
        try {
            const challenge = await this.communityChallengeModel.findById(id).populate('createdBy').exec();
            if (challenge) {
                return ServiceResult.success(challenge);
            }
            return ServiceResult.notFound();
        } catch (err) {
            console.error('Error retrieving challenge by ID:', err);
            return ServiceResult.failed();
        }
    }

    async updateChallenge(id: string, name: string, description: string, objectives: string[], recommendedExercises: string[], duration: number, difficulty: string): Promise<ServiceResult<ICommunityChallenge>> {
        try {
            const updatedChallenge = await this.communityChallengeModel.findByIdAndUpdate(id, { name, description, objectives, recommendedExercises, duration, difficulty }, { new: true }).exec();
            if (updatedChallenge) {
                return ServiceResult.success(updatedChallenge);
            }
            return ServiceResult.notFound();
        } catch (err) {
            console.error('Error updating challenge:', err);
            return ServiceResult.failed();
        }
    }

    async deleteChallenge(id: string): Promise<ServiceResult<ICommunityChallenge>> {
        try {
            const deletedChallenge = await this.communityChallengeModel.findByIdAndDelete(id).exec();
            if (deletedChallenge) {
                return ServiceResult.success(deletedChallenge);
            }
            return ServiceResult.notFound();
        } catch (err) {
            console.error('Error deleting challenge:', err);
            return ServiceResult.failed();
        }
    }
}
