 const mongoose = require("mongoose");
 const initdata= require("..init/data.js");
 const Listing=require("../modles.listing.js");


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

 const initdb = async()=>{
    await Listing.deleteMany({});
    await Listing.insertMany(initData.data);

    console.log("data was inserted");
 }
 initdb();