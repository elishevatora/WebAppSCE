import {Router} from 'express';
import {LikeController} from '../controllers/like.controller';
import { requirements  } from "../middleware/requirements.middleware";
import { auth  } from "../middleware/authentification.middleware";

export class LikeRouter {
    public router=Router();
    private userController = new LikeController();
    constructor() {
        this.intializeRoutes();
    }
    public intializeRoutes() {
        

        this.router.post('/addLike',[auth,requirements(["_idUser", "_idVideo"])], this.userController.addLike);
        this.router.get('/getallcomment',auth, this.userController.getallcomment);
        this.router.get('/user',auth, this.userController.getLikeForUser);
        this.router.delete('/remove/:id',auth, this.userController.delete);


       
      }
}








