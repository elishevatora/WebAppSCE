import { Movie, myMovie } from './../models/movie.model';
import { Request, Response } from "express";
import tiktok from "tiktok-scraper";
import fs from "fs";
import path from "path";
import { musicID } from "../models/movie.model";

const TikTokScraper = require('tiktok-scraper');

const mongoconnection = require("mongoose");

export class MovieController {
    async getall(req: Request, res: Response) {

        var data = [];
        const hashtag = TikTokScraper.hashtagEvent("salad", { number: 50 });
        hashtag.on('data', json => {
            data.push(json)
        });
        hashtag.on('done', (json) => {
            res.json(data)

        });
        hashtag.on('error', error => {
            res.status(500).send('Error')
        });
        hashtag.scrape();
    }

    async getByMusicID(req: Request, res: Response) {
        try {
            await mongoconnection.connection.db.dropCollection(
                "movies"
            );
        } catch (error) {
            console.log(error);


        }
        let data: any = {};
        let current;
        for (let index = 0; index < musicID.MUSIC.length; index++) {
            const element = musicID.MUSIC[index];
            if (Object.keys(data).length == 3) {
                do {
                    current = await TikTokScraper.music(musicID.current, { number: 20 });
                    if (current && current.collector && current.collector.length > 0) {
                        data[musicID.current] = current.collector;
                        Movie.insertMany(current.collector, (err, docs) => { });
                        break;
                    }
                } while (true);
            }
            do {
                current = await TikTokScraper.music(element, { number: 20 });
                if (current && current.collector && current.collector.length > 0) {
                    data[element] = current.collector;
                    Movie.insertMany(current.collector, (err, docs) => { });

                    break;
                }
            } while (true);


        }
        let data2: any = {};
        for (let index = 0; index < musicID.MUSIC.length; index++) {
            const element = musicID.MUSIC[index];
            data2[element] = JSON.parse(JSON.stringify(await Movie.find({ "musicMeta.musicId": element }).limit(20)))

        }
        data2[musicID.current] = JSON.parse(JSON.stringify(await Movie.find({ "musicMeta.musicId": musicID.current }).limit(20)))
        let currentMy = JSON.parse(JSON.stringify(await myMovie.find({ "musicMeta.musicId": musicID.current }).limit(20)))
        data2[musicID.current] = [...currentMy, ...data2[musicID.current]];
        return res.send({ data: data2, currentChallenge: musicID.current });

    }


    async uploadVid(req: any, res: Response) {
        try {
            if (!req.files) {
                throw new Error("file not found");

            }
            // accessing the file
            const myFile = req.files.file;
            if (!myFile) throw new Error("Error occured");
            if (!new RegExp("(video\/*)").test(myFile.mimetype)) throw new Error(`Please upload just video :::=>FileType:${myFile.mimetype}`);



            //  mv() method places the file inside public directory
            myFile.mv(`${__dirname}/../public/${myFile.name}`, function (err) {
                if (err) {
                    console.log(err)
                    throw new Error("Error occured");
                }
                let upload = defaultVideo;
                upload.videoUrl = `http://localhost:3000/movies/id/${myFile.name}`
                upload.text = myFile.name
                upload.musicMeta.musicId = musicID.current;
                upload.musicMeta = JSON.parse(req.body.musicMeta);
                var newMovie = new myMovie(upload);
                newMovie.id = newMovie._id;
                newMovie.save();
                // returing the response with file path and name
                return res.send({ name: myFile.name, path: `/${myFile.name}` });
            });
        } catch (error) {
            return res.status(500).send({ msg: error.message })

        }
    }
    async getmybyid(req: any, res: Response) {

        try {
            if (!fs.existsSync(path.resolve(`${__dirname}/../public/${req.params.id}`))) throw new Error("File not found");

            return res.sendFile(path.resolve(`${__dirname}/../public/${req.params.id}`));
        } catch (error) {
            return res.status(404).send(error.message);
        }
    }



}


let defaultVideo = {
    "id": "",
    "text": "Wait what? #cosplay #Harleyquinn #harleyquinncosplay #wipe #morror #fyp #foryou #foryoupage",
    "createTime": 1589070890,
    "authorMeta": {
        "id": "6648212816929538053",
        "secUid": "MS4wLjABAAAArtd9vZI7dM7FtUzyYbcTF1TPjgw17esqVQWAmgD_fW2qJgIz0hhX3rDkWYOeA3aW",
        "name": "iamlaurencompton",
        "nickName": "LaurenCompton",
        "verified": true,
        "signature": "Chat w me in the comments \n🤩",
        "avatar": "https://p16-va-tiktok.ibyteimg.com/img/musically-maliva-obj/1663466159059974~c5_1080x1080.jpeg"
    },
    "musicMeta": {
        "musicId": "6820654145293273090",
        "musicName": "Wipe It Down",
        "musicAuthor": "BMW KENNY",
        "musicOriginal": false,
        "playUrl": "https://sf-tk-sg.ibytedtos.com/obj/tiktok-obj/041da1dcd1cbfb6dba0ee9968e000126.m4a",
        "coverThumb": "https://p16-tiktokcdn-com.akamaized.net/aweme/100x100/tos-alisg-i-0000/60ecd3a4a433475db7af2c3ef3571bb8.jpeg",
        "coverMedium": "https://p16-tiktokcdn-com.akamaized.net/aweme/200x200/tos-alisg-i-0000/60ecd3a4a433475db7af2c3ef3571bb8.jpeg",
        "coverLarge": "https://p16-tiktokcdn-com.akamaized.net/aweme/720x720/tos-alisg-i-0000/60ecd3a4a433475db7af2c3ef3571bb8.jpeg"
    },
    "covers": {
        "default": "https://p16-tiktok-va.ibyteimg.com/obj/tos-maliva-p-0068/75345ff1b80f4c30b072a068cf99ce89?x-expires=1596290400&x-signature=ItMdNjozo3iKN1cBKsCXDp0cXIs%3D",
        "origin": "https://p16-tiktok-va.ibyteimg.com/obj/tos-maliva-p-0068/32aaded5f1be4b98ab72c7aeca51670c_1589070892?x-expires=1596290400&x-signature=9UQES3z%2FrchEfkb6XRCqb3ndcE8%3D",
        "dynamic": "https://p16-tiktok-va.ibyteimg.com/obj/tos-maliva-p-0068/b6679db6d8f146f9aa9519689065f126_1589070894?x-expires=1596290400&x-signature=myotXgy8oGFjsATvgCxNndtWW1U%3D"
    },
    "webVideoUrl": "",
    "videoUrl": "https://v16m.tiktokcdn.com/abab3ea6e848a43f67eaf16ecba8958f/5f232729/video/tos/useast2a/tos-useast2a-pve-0068/7c8903b8227a450b845194d3ab8b73f5/?a=1233&br=3878&bt=1939&cr=0&cs=0&dr=0&ds=3&er=&l=20200730140137010190189042090936A1&lr=tiktok_m&mime_type=video_mp4&qs=0&rc=ajszM3Y1bTxudDMzNjczM0ApO2c4ZGVlOjw1NzQ8OzZmaWc2bGZzcGAxbG9fLS0yMTZzc2MvYjY1XjQzLjA1MTFhY2M6Yw%3D%3D&vl=&vr=",
    "videoUrlNoWaterMark": "",
    "videoMeta": {
        "height": 1024,
        "width": 576,
        "duration": 8
    },
    "diggCount": 6100000,
    "shareCount": 132500,
    "playCount": 64600000,
    "commentCount": 27200,
    "downloaded": false,
    "mentions": [],
    "hashtags": [
    ],
    "__v": 0
};