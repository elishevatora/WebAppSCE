import { Request, Response } from "express";
import { Like } from "../models/like.model";
import mongoose from "mongoose";


export class LikeController {
   async addLike(req: Request, res: Response) {
      try {
         const { _idUser, _idVideo } = req.body
         let like = new Like({ from: _idUser, vid: _idVideo });
         await like.save();
         res.send(like);
      } catch (error) {
         return res.status(500).send({ msg: error.errmsg });
      }

   }
   async delete(req: Request, res: Response) {
      try {
         // if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
         //    return res.status(500).json({ msg: "id not valid" });
         // }
         const _idVideo = req.params.id;
         res.send(await Like.deleteOne({ vid: _idVideo,from:req.body.user.id }));
      } catch (error) {
         return res.status(500).send({ msg: error.errmsg });

      }

   }
   getallcomment(req: Request, res: Response) {
      Like.findOne({}).populate('from', '-password').populate('vid').exec(function (err, resu) {
         if (err) {
            return res.status(500).send(err);
         }
         return res.status(200).json(resu);
      })
   }
   getLikeForUser(req: Request, res: Response) {
      if (!mongoose.Types.ObjectId.isValid(req.body.user.id)) {
         return res.status(500).json({ msg: "id not valid" });
      }
      let video: string[] = [];
      Like.find({ from: req.body.user.id }).select("vid").exec(function (err, resu) {
         if (err) {
            return res.status(500).send(err);
         }
         resu.forEach((element: any) => {
            video.push(element.vid)

         });
         return res.status(200).json(video);
      })
   }
   getLikeForvid(req: Request, res: Response) {
      Like.findOne({}).populate('from', '-password').populate('vid').exec(function (err, resu) {
         if (err) {
            return res.status(500).send(err);
         }
         return res.status(200).json(resu);
      })
   }


}


