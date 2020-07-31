import { Request, Response } from "express";
import * as bcrypt from "bcryptjs";
import { User, Iuser } from "../models/user.model";
import * as fs from "fs";
import * as path from "path";
import * as jwt from "jsonwebtoken";
var privateKey = fs.readFileSync(path.join(__dirname, '../../', 'private.key'));


export class UserController {
    async create(req: Request, res: Response) {
        //verifier si tt ok
        const { email, password, name, type, age } = req.body;

        try {

            let u:any = await User.findOne({
                $or: [
                    { email },
                ]
            });
            if (u) {
                var msg: Array<string> = [];
                if (u.email == email) msg.push('Email Already Exists');
                return res.status(400).json({
                    error: 2342,
                    msg: msg
                });
            }

            let passCrypted = await bcrypt.hash(password, await bcrypt.genSalt(10));
            let userTemp: Iuser = {
                email: email,
                password: passCrypted,
                name: name,
                type: type,
                age: age,
            }
            let user = new User(userTemp);
            await user.save();
            const payload = {
                user: {
                    id: user.id
                }
            };


            jwt.sign(
                payload,
                privateKey,
                {
                    expiresIn: "2 days",
                    algorithm: 'RS256',
                },
                (err, token) => {
                    if (err) throw err;
                    res.status(200).json({
                        token
                    });
                }
            );
        } catch (error) {
            res.status(500).send({
                message: "Error in Saving"
            });
        }

    }
    async login(req: Request, res: Response) {
        const { email, password } = req.body;

        let u:any = await User.findOne({
            $or: [
                { email },
            ]
        });
        if (!u) {
            return res.status(500).json({
                error: 2,
                msg: 'user not exist'
            });
        }
        const isMatched = await bcrypt.compare(password, u.password);

        if (!isMatched) {
            return res.status(500).json({
                error: 2,
                msg: 'Password error'
            });
        }
        const payload = {
            user: {
                id: u.id
            }
        };


        jwt.sign(
            payload,
            privateKey,
            {
                expiresIn: "2 days",
                algorithm: 'RS256',
            },
            (err, token) => {
                if (err) throw err;
                return res.status(200).json({
                    token
                });
            }
        );


    }
    async me(req: Request, res: Response) {
        const id = req.body.user.id;
        let u = await User.findById(id,'-password');
        if (!u) {
           return  res.status(500).json({msg:'user not exist'})
            
        }
        return res.send(u);
    }


    async delete(req: Request, res: Response) {
        const id = req.body.id;
        res.send(await User.findByIdAndRemove(id));

    }

}