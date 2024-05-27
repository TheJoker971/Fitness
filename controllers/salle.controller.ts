import express, {Router,Response,Request} from 'express';
import {AuthService, SalleService, UserService} from "../services";
import {ServiceErrorCode} from "../services";
import {UserMiddleware} from "../middlewares";
import {SessionMiddleware} from "../middlewares/session.middleware";


export class SalleController {

    private salleService : SalleService;
    private router: Router;

    constructor(salleService:SalleService,private authService : AuthService) {
        this.salleService = salleService;
        this.router = express.Router();
    }

    async createSalle(req: Request, res: Response){
        const sr = await this.salleService.create(
            req.body.name,
            req.body.country,
            req.body.city,
            req.body.way
        );
        switch (sr.errorCode) {
            case ServiceErrorCode.success:
                res.status(201).json(sr.result);
                break;
            default:
                res.status(500).end();
                break;
        }
    }

    async editSalle(req:Request,res:Response){

    }
    async getAllSalles(req: Request, res: Response ){
        const sr = await this.salleService.getAll();
        switch (sr.errorCode) {
            case ServiceErrorCode.success:
                res.json(sr.result);
                break;
            default:
                res.status(500).end();
                break;
        }
    }
    buildRoutes():Router{
        this.router.get('/',this.getAllSalles.bind(this));
        this.router.post('/',express.json(),SessionMiddleware.isLogged(this.authService),UserMiddleware.isOwner(),this.createSalle.bind(this));
        this.router.put('/edit/:id',express.json(),SessionMiddleware.isLogged(this.authService),UserMiddleware.isOwner(),this.editSalle.bind(this));
        return this.router;

    }
}