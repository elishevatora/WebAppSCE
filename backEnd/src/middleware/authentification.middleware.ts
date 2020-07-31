
import * as jwt from "jsonwebtoken";
import * as fs from "fs";
import * as path from "path";

var cert = fs.readFileSync(path.join(__dirname,'../../', 'public.key'));

export var auth=(req, res, next)=>{
  const token = req.header("token")||req.cookies.token;
  if (!token) return res.status(401).json({ message: "Auth Error" });

  try {
    const decoded = jwt.verify(token,cert);
    req.body.user = decoded.user;
    next();
  } catch (e) {
    // console.error(e);
    res.status(500).send({ message: "Invalid Token" });
  }
};
