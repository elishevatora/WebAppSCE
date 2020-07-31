import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
// import multer from 'multer';
import fileUpload from 'express-fileupload';
import cookieParser from 'cookie-parser';
import { InitiateMongoServer } from './config/db';
import { UserRouter} from "./routes/user.route";
import { MovieRouter } from "./routes/movie.route";
import { LikeRouter } from "./routes/like.route";
require('dotenv').config();

// var upload = multer();
const app = express();
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cors());
app.use(fileUpload());
// app.use(upload.any());
app.use(express.static('public'));
InitiateMongoServer();



app.use('/user',new UserRouter().router)
app.use('/movies',new MovieRouter().router)
app.use('/like',new LikeRouter().router)








app.all("*", (req, res) => {
    res.status(500).json({status:500,message:'path error'})
  })

const PORT = process.env.PORT || 3000;
const URL = process.env.URL || 'localHost';

app.listen(PORT, () => {
    if (process.env.PORT)
      console.log(`Server is running in http://${URL}:${PORT} from env`)
    else
      console.log(`Server is running in http://${URL}:${PORT}`)
  })