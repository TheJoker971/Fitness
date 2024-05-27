import express, {Router,Request,Response} from 'express';
import {AuthService, ServiceErrorCode} from "../services";

export class AuthController{
    private authService : AuthService;
    private router: Router;

    constructor(authService: AuthService){
        this.authService = authService;
        this.router = express.Router();
    }


    async register(req: Request, res: Response){
        const sr = await this.authService.reg(
            req.body.login,
            req.body.password
        );
        switch (sr.errorCode){
            case ServiceErrorCode.success:
                res.status(201).json(sr.result);
                break;
            default:
                res.status(500).end();
                break;
        }
    }

    async login(req: Request, res: Response){
        const sr = await this.authService.log(
            req.body.login,
            req.body.password
        );
        switch (sr.errorCode){
            case ServiceErrorCode.success:
                res.status(201).json(sr.result);
                break;
            case ServiceErrorCode.notFound:
                res.status(404).end();
                break;
            default:
                res.status(500).end();
                break;
        }
    }

    buildRoutes() : Router{
        this.router.post('/register',express.json(),this.register.bind(this));
        this.router.post('/login',express.json(),this.login.bind(this));
        return this.router;
    }
}