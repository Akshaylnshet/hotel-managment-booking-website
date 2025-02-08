const express=require("express")
const router=express.Router({mergeParams:true});
const wrapasync=require("../utils/wrapasync.js")
const Review=require("../models/review.js");
const Listing=require("../models/listing.js")
const {validateReview, isLoggedIn,isreviewAuthor}=require("../middleware.js")

const reviewController=require("../controllers/reviews.js")

//reviews post route
router.post("/",isLoggedIn ,validateReview ,wrapasync (reviewController.createareview))

//review delete route
router.delete("/:reviewId",isLoggedIn,isreviewAuthor,wrapasync (reviewController.deletereview))


module.exports=router;