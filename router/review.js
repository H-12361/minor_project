const express =require("express");
const router= express.Router({mergeParams:true});

const wrapAsync= require("../util/errorusingwrapasync.js")
const ExpressError= require("../util/ExpressError.js")//express error file use 
const {validateReview, isLoggedIn, isreviewAothor}=require("../middleware.js");
const { destroyreview, reviewused ,} = require("../controllers/reviewconto.js");



 //reviews routes
router.post("/",isLoggedIn,validateReview,wrapAsync(reviewused));

 // Delete review route
router.delete("/:reviewId"  ,isLoggedIn,isreviewAothor,wrapAsync(destroyreview));

module.exports =router;