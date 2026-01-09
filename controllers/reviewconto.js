const Listing=require("../modles/listing");
const Review=require("../modles/review");


module.exports.reviewused=( async(req,res)=>{
let listing=await Listing.findById(req.params.id);

   let newReview = new Review({
        ...req.body.review,
        listing: listing._id,
        author: req.user._id    // ⭐ FIXED — req.user exists now
    });
     
await newReview.save();
 listing.reviews.push(newReview._id);   // ⭐ REQUIRED!
await listing.save();
req.flash("success","New review add")

res.redirect(`/listing/${listing._id}`); 
});

module.exports.destroyreview= (async(req,res)=>{
  let { id,reviewId}= req.params;
  await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}})
  await Review.findByIdAndDelete(reviewId);
   req.flash("success","review deleted")

  res.redirect(`/listing/${id}`)
});