const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review");

const listingSchema = new Schema({
  title: { type: String,
     required: true 
    },
  description: String,
 image: {
  url: String,
  filename: String,
},
  price: {
    type: Number,
    default: 0,
  },
  location: String,
  country: String,
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  owner:{
    type:Schema.Types.ObjectId,
    ref:"User",
  }
});

//  Correct middleware — before delete
listingSchema.pre("findOneAndDelete", async function (next) {
  const listing = await this.model.findOne(this.getQuery());
  if (listing) {
    await Review.deleteMany({ listing: listing._id });
  }
  next();
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
