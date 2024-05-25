import {NextFunction, RequestHandler, Request, Response} from "express";
import {LevelPermission} from "../utils";


export class UserMiddleware {

    static isWorker() : RequestHandler {
        return function(req: Request,res: Response,next: NextFunction) {
            const user = req.user;
            if (!user) {
                res.status(401).end();
                return;
            }
            if (typeof user === "string") {
                res.status(403).end();
                return;
            }
            const level = user.acceses;
            if (level < LevelPermission.worker) {
                res.status(403).end();
                return;
            }
            next();
        }
    }

    static isManager() : RequestHandler {
        return function(req: Request,res: Response,next: NextFunction) {
            const user = req.user;
            if (!user) {
                res.status(401).end();
                return;
            }
            if (typeof user === "string") {
                res.status(403).end();
                return;
            }
            const level = user.acceses;
            if (level < LevelPermission.manager) {
                res.status(403).end();
                return;
            }
            next();
        }
    }

    static isOwner() : RequestHandler {
        return function(req: Request,res: Response,next: NextFunction) {
            const user = req.user;
            if (!user) {
                res.status(401).end();
                return;
            }
            if (typeof user === "string") {
                res.status(403).end();
                return;
            }
            const level = user.acceses;
            console.log(level);
            if (level < LevelPermission.owner) {
                console.log("Not authorized");
                res.status(403).end();
                return;
            }
            console.log("Ok");
            next();
        }
    }
    static isAdmin() : RequestHandler {
        return function(req: Request,res: Response,next: NextFunction) {
            const user = req.user;
            if (!user) {
                res.status(401).end();
                return;
            }
            if (typeof user === "string") {
                res.status(403).end();
                return;
            }
            const level = user.acceses;
            if (level < LevelPermission.admin) {
                res.status(403).end();
                return;
            }
            next();
        }
    }

}