 const mongoose = require("mongoose");
 const initdata= require("../init/data.js");
 const Listing=require("../modles/listing.js");


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
    initdata.data= initdata.data.map((obj)=>({...obj,owner:"69242c45e0583ea5e7947c00"}));
    await Listing.insertMany(initdata.data);

    console.log("data was inserted");
 }
 initdb();