const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./util/ExpressError.js"); //express error file use
const Mongo_Url = "mongodb://127.0.0.1:27017/wonderlust";
const listing = require("./router/listing.js");
const reviews = require("./router/review.js");

main()
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(Mongo_Url);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true })); // use to read undefined data post by post method
app.use(express.json()); // agar JSON body bhejni ho
app.use(methodOverride("_method")); //used to send put req
app.engine("ejs", ejsMate); //use to templating
app.use(express.static(path.join(__dirname, "/public")));

app.get("/", (req, res) => {
  res.send("hi root node");
});


app.use("/listing", listing);
app.use("/listing/:id/reviews", reviews);

// // test the expresserror
// // app.all * means all route check and no route prensent in your backend
app.all(/.*/, (req, res, next) => {
  next(new ExpressError(404, "Page not found!"));
});

//middleware
app.use((err, req, res, next) => {
  let { status = 500, message = "something went wrong" } = err;
  // res.status(status).send(message);
  res.status(status).render("error.ejs", { message });
});

app.listen(8080, () => {
  console.log("Server working port 8080 well");
});
