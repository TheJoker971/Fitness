import express, { Router, Response, Request } from 'express';
import { CommunityChallengeService } from '../services/communityChallenge.service';
import { ServiceErrorCode } from '../services/service.result';

export class CommunityChallengeController {
    private communityChallengeService: CommunityChallengeService;
    private router: Router;

    constructor(communityChallengeService: CommunityChallengeService) {
        this.communityChallengeService = communityChallengeService;
        this.router = express.Router();
    }

    async createChallenge(req: Request, res: Response) {
        const { name, description, objectives, recommendedExercises, duration, difficulty, createdBy } = req.body;
        const sr = await this.communityChallengeService.createChallenge(name, description, objectives, recommendedExercises, duration, difficulty, createdBy);
        switch (sr.errorCode) {
            case ServiceErrorCode.success:
                res.status(201).json(sr.result);
                break;
            default:
                res.status(500).end();
                break;
        }
    }

    async getAllChallenges(req: Request, res: Response) {
        console.log('Fetching all challenges');
        const sr = await this.communityChallengeService.getAll();
        switch (sr.errorCode) {
            case ServiceErrorCode.success:
                res.json(sr.result);
                break;
            default:
                res.status(500).end();
                break;
        }
    }

    async getChallengeById(req: Request, res: Response) {
        const { id } = req.params;
        const sr = await this.communityChallengeService.getById(id);
        switch (sr.errorCode) {
            case ServiceErrorCode.success:
                res.json(sr.result);
                break;
            case ServiceErrorCode.notFound:
                res.status(404).end();
                break;
            default:
                res.status(500).end();
                break;
        }
    }

    async updateChallenge(req: Request, res: Response) {
        const { id } = req.params;
        const { name, description, objectives, recommendedExercises, duration, difficulty } = req.body;
        const sr = await this.communityChallengeService.updateChallenge(id, name, description, objectives, recommendedExercises, duration, difficulty);
        switch (sr.errorCode) {
            case ServiceErrorCode.success:
                res.json(sr.result);
                break;
            case ServiceErrorCode.notFound:
                res.status(404).end();
                break;
            default:
                res.status(500).end();
                break;
        }
    }

    async deleteChallenge(req: Request, res: Response) {
        const { id } = req.params;
        const sr = await this.communityChallengeService.deleteChallenge(id);
        switch (sr.errorCode) {
            case ServiceErrorCode.success:
                res.status(204).end();
                break;
            case ServiceErrorCode.notFound:
                res.status(404).end();
                break;
            default:
                res.status(500).end();
                break;
        }
    }

    buildRoutes(): Router {
        this.router.post('/', this.createChallenge.bind(this));
        this.router.get('/', this.getAllChallenges.bind(this));
        this.router.get('/:id', this.getChallengeById.bind(this));
        this.router.put('/:id', this.updateChallenge.bind(this));
        this.router.delete('/:id', this.deleteChallenge.bind(this));
        return this.router;
    }
}
