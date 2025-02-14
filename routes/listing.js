const express=require("express")
const router=express.Router();
const Listing=require("../models/listing.js")
const wrapasync=require("../utils/wrapasync.js")
const {isLoggedIn,isowner,validateListing}=require("../middleware.js")

const listingControler=require("../controllers/listings.js")

const multer  = require('multer')
const {storage}=require("../cloudconfig.js")
const upload = multer({ storage })
 
//for "/" route
router.route("/")
.get(wrapasync(listingControler.index)) //index route
.post(isLoggedIn,
     // upload.single('listing[image]'),
     validateListing,
     wrapasync(listingControler.createListing)) //create route

//new route
router.get("/new",isLoggedIn,listingControler.renderNewform)

//for "/:id" route
router.route("/:id")
.get(wrapasync(listingControler.showListing))//show route
.put(isLoggedIn,isowner,upload.single('listing[image]'),validateListing,wrapasync(listingControler.updateListing)) //update route
.delete(isLoggedIn,isowner,wrapasync(listingControler.deleteListing)) //delete route



//edit route
router.get("/:id/edit",isLoggedIn,isowner,wrapasync(listingControler.renderEditform))

module.exports=router;