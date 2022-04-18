const jwt = require("jsonwebtoken");
import { Response, Request } from "express";
const config = process.env;

const verifyToken = (req:Request, res:Response, next:any) => {
  // console.log(req.params);
  const token = req.body.token || req.query.token || req.cookies.token || req.headers["x-access-token"];
// console.log('token',token)
  if (!token) {
    return res.status(200).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    // req.user = decoded;
    // console.log('decoded',decoded);
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

export default verifyToken;