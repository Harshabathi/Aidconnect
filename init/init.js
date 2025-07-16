const Aid = require("../models/aid.js");
const data = require("./data.js");
const mongoose =require("mongoose");
const User = require("../models/user.js");
const geocode = require("../geocodeutility.js");
const dbUrl ='mongodb://127.0.0.1/War'

async function main() {
  try {
    
    await mongoose.connect(dbUrl);
    console.log("✅ MongoDB connected successfully.Inserting Data");
  } catch (err) {
    console.log("❌ MongoDB connection failed:Unable to insert data", err);
  }
}
main();

async function prepareAidData(aids, donorId) {
  // Map over aids and geocode each one
  const updatedData = await Promise.all(aids.map(async (aid) => {
      const [longitude, latitude] = await geocode(aid.pickuplocation);
      return {
          ...aid,
          donor: donorId,
          coordinates: {
              type: 'Point',
              coordinates: [longitude, latitude]
          }
      };
  }));
  return updatedData;
}

const initializeDB = async ()=>{
    try{
     await Aid.deleteMany({});
     await User.deleteMany({});

     console.log("Inserting Data.....");
    
     const newDonar = new User({
      username:"Harshabathi",
      email:"harsha@gmail.com",
      phoneno:"8309729957",
      location:"sujathanagar,pendurthi",
      role:"donor",
      help:"Clothing",
     });

     const [longitude, latitude] = await geocode("sujathanagar,pendurthi");
     newDonar.coordinates = { type: 'Point', coordinates: [longitude, latitude] };
     await newDonar.save();
     console.log("newDonar Saved");
     
     const updateddata = await prepareAidData(data,newDonar._id);
     await Aid.insertMany(updateddata);
     console.log("Data inserted Sucessfully");}
     catch(err){
      console.log(`Error while inserting data ,${err}`);
     }

}

initializeDB();

