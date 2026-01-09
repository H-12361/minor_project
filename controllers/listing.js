const Listing = require("../modles/listing");

module.exports.index = async (req, res) => {
  const { q } = req.query;
  let filter = {};

  if (q) {
    filter.$or = [
      { title: { $regex: q, $options: "i" } },
      { location: { $regex: q, $options: "i" } }
    ];
  }

  const alllisting = await Listing.find(filter);
    if (alllisting.length === 0 && q) {
    req.flash("error", "No listings available");
  }

  res.render("listing/index", { alllisting, q });
}
  



module.exports.newform = (req, res) => {
  res.render("listing/new.ejs");
};

module.exports.showalldata = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    })
    .populate("owner");
  if (!listing) {
    req.flash("error", "Listing you requested doesn't exist !");
    return res.redirect("/listing");
  }

  res.render("listing/show", { listing });
};
module.exports.editlist = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing you requested doesn't exist !");
    return res.redirect("/listing");
  }
  let originalImg_URL=listing.image.url;
 originalImg_URL=originalImg_URL.replace("/upload","/upload/h_250,w_250")
  res.render("listing/edit.ejs", { listing,originalImg_URL });
};
module.exports.updatelist = async (req, res) => {
  const { id } = req.params;
  let listing=await Listing.findByIdAndUpdate(id, { ...req.body.listing });
   if( typeof req.file !== 'undefined'){ 
  let url=req.file.path;
  let filename= req.file.filename;
  listing.image={url ,filename}
  await listing.save();
}
  req.flash("success", "listing updated");
  res.redirect(`/listing/${id}`);
};

module.exports.removelist = async (req, res) => {
  const { id } = req.params;
  await Listing.findByIdAndDelete(id);
  req.flash("success", "Deleted Listing");
  res.redirect("/listing");
};


module.exports.createlisting = async (req, res) => {
  try {
    const listing = new Listing(req.body.listing);

    if (req.file) {
      listing.image = {
        url: req.file.path,
        filename: req.file.filename,
      };
    }

    listing.owner = req.user._id;

    await listing.save();

    req.flash("success", "New Listing Created!");
    res.redirect("/listing");
  } catch (err) {
    console.error("CREATE LISTING ERROR:", err);
    res.status(500).send(err.message);
  }
};
