const Listing=require("./models/listing.js")
const ExpressError=require("./utils/expresserror.js")
const {listingSchema}=require("./schema.js")
const {reviewSchema}=require("./schema.js")
const Review = require("./models/review.js")

module.exports.isLoggedIn=(req,res,next)=>{
    console.log(req.path,"..",req.originalUrl);
    if(!req.isAuthenticated())
        {
            req.session.redirecturl=req.originalUrl;
            req.flash("error","you must be logged in to create listing");
            return res.redirect("/login")
        }
        next();
}

module.exports.saveRedirectUrl=(req,res,next)=>{
    if(req.session.redirecturl){
        res.locals.redirecturl=req.session.redirecturl;
    }
    next()
}

module.exports.isowner =async(req,res,next)=>{
    let {id}=req.params;
    let listing=await Listing.findById(id);
    if(!listing.owner._id.equals(res.locals.curruser._id)){
        req.flash("error","you dont have the access to edit")
        return res.redirect(`/listings/${id}`);

    }
    next()
}

// module.exports.validateListing=(req,res,next)=>{
//     let {error}=listingSchema.validate(req.body);
    
//     if(error){
//         let errmsg=error.details.map((el)=>el.message).join(",")
//         console.log("Validation data:", req.body);
//         throw new ExpressError(400,errmsg);
//     }
//     else{
//         next();
//     }
// }
module.exports.validateListing = (req, res, next) => {
    console.log("Incoming request body:", req.body); // Log full request body

    let { error } = listingSchema.validate(req.body);
    if (error) {
        let errmsg = error.details.map((el) => el.message).join(", ");
        console.error("Validation error:", errmsg);
        throw new ExpressError(400, errmsg);
    } else {
        next();
    }
};

module.exports.validateReview=(req,res,next)=>{
    let {error}=reviewSchema.validate(req.body);
   
    if(error){
        let errmsg=error.details.map((el)=>el.message).join(",")
        throw new ExpressError(400,errmsg);
    }
    else{
        next();
    }
}

module.exports.isreviewAuthor =async(req,res,next)=>{
    let {id,reviewId}=req.params;
    let review=await Review.findById(reviewId);
    if(!review.author._id.equals(res.locals.curruser._id)){
        req.flash("error","you dont have the access to delete")
        return res.redirect(`/listings/${id}`);

    }
    next()
}
