const express=require("express");
const router = express.Router();
const wrapAsync= require("../util/errorusingwrapasync.js")
const Listing = require("../modles/listing.js")
const ExpressError= require("../util/ExpressError.js")//express error file use
const {listingSchema,reviewSchema}=require("../schema.js")// this file use to joi validate 

 

const validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);
  if (error) {
    let errmsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errmsg);
  } else {
    next();
  }
};


 
 
//  1. Index route - show all listings
router.get("/", wrapAsync(async (req, res) => {
 const alllisting = await Listing.find({});
  res.render("listing/index", { alllisting });
}));

//  2. New route - form to create listing (MUST come before :id route)
router.get("/new", (req, res) => {
  res.render("listing/new.ejs");
});

// Show route - show one listing (MUST come after /new and /:id/edit)
router.get("/:id", wrapAsync(async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id).populate("reviews");
  res.render("listing/show", { listing });
}));
  // 3. Create route - add listing to DB
//  Remove the extra spaces after "/listing"

  router.post("/",validateListing,wrapAsync(async (req, res,next) => {
    let new_list = new Listing(req.body.listing); 
   await new_list.save();
   res.redirect("/listing");

  }));


 
  
  // 7. Delete route
  router.delete("/:id",  wrapAsync(async (req, res) => {
    const { id } = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listing");
  }));
   // 5. Update route - apply changes
  router.put("/:id",validateListing,wrapAsync(async (req, res) => {
      const { id } = req.params;
     await Listing.findByIdAndUpdate(id, { ...req.body.listing });
     res.redirect(`/listing/${id}`);
   }));
   // 4. Edit route - show edit form
router.get(
  "/listing/:id/edit",
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listing/edit.ejs", { listing });
  })
);
 


module.exports = router;