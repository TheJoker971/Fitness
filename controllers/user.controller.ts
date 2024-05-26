import {Router,Request,Response} from 'express';
import {UserMiddleware} from "../middlewares";
import {AuthService, ServiceErrorCode, UserService} from "../services";
import {SessionMiddleware} from "../middlewares/session.middleware";


export class UserController{


    constructor(private router:Router,private authService: AuthService,private userService:UserService){

    }

    editUser(req:Request,res:Response){

    }

    deleteUser(req:Request,res:Response){

    }

    async getUsers(req:Request,res:Response){
        const sr = await this.userService.getAll();
        switch(sr.errorCode){
            case ServiceErrorCode.success:
                res.status(200).json(sr.result);
                break;
            default:
                res.status(500).end();
        }
    }

    buildRoutes(){
        this.router.put('/edit/:id',SessionMiddleware.isLogged(this.authService),UserMiddleware.isAdmin(),this.editUser.bind(this));
        this.router.delete('/delete/:id',SessionMiddleware.isLogged(this.authService),UserMiddleware.isAdmin(),this.deleteUser.bind(this));
        this.router.get('/',SessionMiddleware.isLogged(this.authService),UserMiddleware.isAdmin(),this.getUsers.bind(this));
    }
}