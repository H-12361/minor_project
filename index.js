const express = require("express");
const app= express();
const mongoose = require("mongoose");
const Listing = require("./modles/listing.js")
const path =require("path");


const Mongo_Url ="mongodb://127.0.0.1:27017/wonderlust";
  
main()
.then(()=>{
    console.log("connected to db");
})
.catch((err)=>{
  console.log(err);
})

async function main() {
 await mongoose.connect(Mongo_Url);   
}

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"))
app.use(express.urlencoded({ extended: true })); // form ke liye
app.use(express.json()); // agar JSON body bhejni ho



app.get("/", (req,res)=>{
    res.send("hi root node");
})

//index route
app.get("/listing",async(req,res)=>{
  const alllisting= await Listing.find({});
  res.render("listing/index",{alllisting});
})


//show route 
app.get("/list/:id", async(req,res)=>{
   let{id}=req.params;
   const listing=await Listing.findById(id);
   res.render("listing/show",{listing});
})
//create new list
app.get("/listing/new",(req,res)=>{
  res.render("listing/new.ejs");
})
// add existing main table
app.post("/listing",async(req,res)=>{
  const new_list = new Listing(req.body);
   await new_list.save();
  res.redirect("/listing");
})


//use for testing the route
// app.get("/listingtest", async (req,res)=>{
//    let sammpleListing= new Listing({
//     tittle:" My new rental home",
//     description:"hi everu one my home located on sln",
//     price:900,
//     location:"near bus stand",
//     country:"india"
//    });
//    await sammpleListing.save();
//    console.log("sample was saved");
//    res.send("test data sucess ");
// })





app.listen(8080,()=>{
 console.log("Server working port 8080 well");

});


