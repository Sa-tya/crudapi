require("dotenv").config();
require("../config/database").connect();
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const cors = require('cors');
import { Request,Response } from "express"
var cookieParser = require('cookie-parser');

var router = express.Router();
const User = require("../model/user");
router.use(cors());
router.use(cookieParser());

router.post("/signup", async (req:Request, res:Response) => {
  try {
    // Get user input
    const { username, email, password } = req.query;

    // Validate user input
    if (!(email && password && username)) {
      res.status(400).send("All input is required");
    }
    else {
      // check if user already exist
      // Validate if user exist in our database
      const oldUser = await User.findOne({ email });

      if (oldUser) {
        return res.status(409).send("User Already Exist. Please Login");
      }
      else {
        //Encrypt user password
        const encryptedPassword = await bcrypt.hash(password, 10);

        // Create user in our database
        const user = await User.create({
          username,
          email: email.toString().toLowerCase(), // sanitize: convert email to lowercase
          password: encryptedPassword,
        });

        // res.status(201).json(user);
        res.redirect('/login');
      }
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/login", async (req:Request, res:Response) => {
  try {
    // Get user input
    const { email, password } = req.body;
    // console.log(email,password)
    // Validate user input
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }
    // Validate if user exist in our database
    const user = await User.findOne({ email });
    // console.log(user)
    if(!user) res.status(404).send('You are not registered, Please First Signup');
    
    if (await bcrypt.compare(password, user.password)) {
      // Create token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "12h",
        }
      );

      // save user token
      user.token = token;
      await user.save();
      // console.log(user);
      // save cookie in client side 
      // res.cookie('token', token);
      // console.log(res.cookie)
      res.status(200).json(token);
      // res.redirect('/welcome');
    }
    else
      res.status(400).send("Invalid Credentials");
  } catch (err) {
    console.log(err);
  }
});

// This should be the last route else any after it won't work
router.use("*", (req:Request, res:Response) => {
  res.status(404).json('Its a wrong URL content not found');
});

module.exports = router;