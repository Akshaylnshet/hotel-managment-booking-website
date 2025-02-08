const User=require("../models/user")

module.exports.rendersignupform=(req,res)=>{
    res.render("users/signup.ejs")
}

module.exports.signup=async(req,res)=>{
    try{
        let{username,email,password}=req.body;
    const newuser=new User({email,username});
    const registerduser=await User.register(newuser,password);
    console.log(registerduser);
    req.login(registerduser,(err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","welcome to wanderlust");
        res.redirect("/listings");
    })
    

    }
    catch(err){
        req.flash("error",err.message);
        res.redirect("/signup");
    }
    
}

module.exports.renderloginform=(req,res)=>{
    res.render("users/login.ejs")
}

module.exports.login=async(req,res)=>{
    req.flash("success","welcome back to worderlust u are loged in")
    let redirecturl=res.locals.redirecturl || "/listings"
    res.redirect(redirecturl);
}

module.exports.logout=(req,res,next)=>{
    req.logOut((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","user logged out successfully");
        res.redirect("/listings")
    })
}