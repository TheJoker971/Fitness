import express, { Router, Response, Request } from 'express';
import { ExerciseTypeService } from '../services/exerciseType.service';
import { ServiceErrorCode } from '../services/service.result';

export class ExerciseTypeController {

    private exerciseTypeService: ExerciseTypeService;
    private router: Router;

    constructor(exerciseTypeService: ExerciseTypeService) {
        this.exerciseTypeService = exerciseTypeService;
        this.router = express.Router();
    }

    async createExerciseType(req: Request, res: Response) {
        const { name, description, targetedMuscles } = req.body;
        const sr = await this.exerciseTypeService.create(name, description, targetedMuscles);
        switch (sr.errorCode) {
            case ServiceErrorCode.success:
                res.status(201).json(sr.result);
                break;
            default:
                res.status(500).end();
                break;
        }
    }

    async updateExerciseType(req: Request, res: Response) {
        const { id } = req.params;
        const { name, description, targetedMuscles } = req.body;
        const sr = await this.exerciseTypeService.update(id, name, description, targetedMuscles);
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

    buildRoutes(): Router {
        this.router.post('/', express.json(), this.createExerciseType.bind(this));
        this.router.put('/:id', this.updateExerciseType.bind(this));
        return this.router;
    }
}
