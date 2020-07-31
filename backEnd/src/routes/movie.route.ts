import {Router} from 'express';
import {MovieController} from '../controllers/movie.controller';
import { requirements  } from "../middleware/requirements.middleware";
import { auth  } from "../middleware/authentification.middleware";

export class MovieRouter {
    public router=Router();
    private movieController = new MovieController();
    constructor() {
        this.intializeRoutes();
    }
    public intializeRoutes() {
        // using middlewares
        this.router.get('/get', this.movieController.getall);
        this.router.get('/getbymusic', this.movieController.getByMusicID);
        this.router.post('/uploadVid', this.movieController.uploadVid);
        this.router.get('/id/:id', this.movieController.getmybyid);
 

       
      }
}








