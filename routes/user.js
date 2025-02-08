const express=require("express")
const router=express.Router();
const User=require("../models/user.js")
const wrapasync=require("../utils/wrapasync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

const userController=require("../controllers/users.js");
const user = require("../models/user.js");

router.route("/signup")
.get(userController.rendersignupform)// GET signup form
.post(wrapasync(userController.signup)) // POST signup form


router.route("/login")
.get(userController.renderloginform) // GET login form
.post(saveRedirectUrl,
    passport.authenticate("local",{ 
        failureRedirect: '/login',
        failureFlash:true 
    }),userController.login) //post login form

// GET logout route
router.get("/logout",userController.logout)

module.exports=router;



