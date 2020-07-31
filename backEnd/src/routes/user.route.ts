import {Router} from 'express';
import {UserController} from '../controllers/user.controller';
import { requirements  } from "../middleware/requirements.middleware";
import { auth  } from "../middleware/authentification.middleware";

export class UserRouter {
    public router=Router();
    private userController = new UserController();
    constructor() {
        this.intializeRoutes();
    }
    public intializeRoutes() {
        // using middlewares
        this.router.post('/create',[requirements(["email", "password", "name"])], this.userController.create);
        this.router.post('/login',[requirements(["email", "password"])], this.userController.login);
        this.router.get('/me',[auth], this.userController.me);
        this.router.delete('/delete',[requirements(['id'])], this.userController.delete);

       
      }
}








