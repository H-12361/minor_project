const express = require("express");
const router = express.Router();

const wrapAsync = require("../util/errorusingwrapasync.js");
const Listing = require("../modles/listing.js");
const { isLoggedIn, isowner, validateListing } = require("../middleware.js");
const multer = require("multer");
const { storage } = require("../cloudconfig.js");
const upload = multer({ storage });

const {
  index,
  newform,
  showalldata,
  createlisting,
  removelist,
  updatelist,
  editlist,
} = require("../controllers/listing.js");

router.get("/new", isLoggedIn, newform);

router
  .route("/")
  .get(wrapAsync(index))
  .post(
    isLoggedIn,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(createlisting)
  );

router
  .route("/:id")
  .get(isLoggedIn, wrapAsync(showalldata))
  .put(
    isLoggedIn,
    isowner,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(updatelist)
  )
  .delete(isLoggedIn, isowner, wrapAsync(removelist));

router.get("/:id/edit", isLoggedIn, isowner, wrapAsync(editlist));

module.exports = router;
