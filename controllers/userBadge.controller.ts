import express, { Router, Response, Request } from 'express';
import { UserBadgeService } from '../services/userBadge.service';
import { ServiceErrorCode } from '../services/service.result';

export class UserBadgeController {
    private userBadgeService: UserBadgeService;
    private router: Router;

    constructor(userBadgeService: UserBadgeService) {
        this.userBadgeService = userBadgeService;
        this.router = express.Router();
    }

    async awardBadge(req: Request, res: Response) {
        const { userId, badgeId } = req.body;
        const sr = await this.userBadgeService.awardBadge(userId, badgeId);
        switch (sr.errorCode) {
            case ServiceErrorCode.success:
                res.status(201).json(sr.result);
                break;
            default:
                res.status(500).end();
                break;
        }
    }

    async getUserBadges(req: Request, res: Response) {
        const { userId } = req.params;
        const sr = await this.userBadgeService.getUserBadges(userId);
        switch (sr.errorCode) {
            case ServiceErrorCode.success:
                res.json(sr.result);
                break;
            default:
                res.status(500).end();
                break;
        }
    }

    buildRoutes(): Router {
        this.router.post('/', this.awardBadge.bind(this));
        this.router.get('/:userId', this.getUserBadges.bind(this));
        return this.router;
    }
}
