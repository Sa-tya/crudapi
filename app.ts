import express from 'express';
const cookieParser = require('cookie-parser')
import api = require('./router/api');
const cors = require('cors');
const app: any = express();
import { Request, Response } from 'express';
import auth from './middleware/auth'
import user = require('./router/user');

app.use(cookieParser());
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(function(req:Request, res:Response, next:any) {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//     next();
//   });
// app.use('/',(req:Request,res:Response)=>{
//     console.log(req);
// })
app.get('/',auth, (req: Request, res: Response) => {
    res.send({login:'true'});
})
app.use('/user',user);
app.use('/', api);

module.exports = app;
