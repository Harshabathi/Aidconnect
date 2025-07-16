const mongoose = require("mongoose");
const {Schema} = mongoose;
const User = require("./user.js");

const aidSchema = new Schema({
    title :{
      type: String,
   },
    priority: {
    type: String,
    enum: ['High priority','Medium priority','Low priority'],  
    required: true,                 
  },
  category:{
    type:String,
    enum:['Food','Clothing','Shelter','Medical','Baby Care','Education','Others'],
    required: true,
  },
  description :{
    type:String
  },
  availability:{
    type : Number,
    required:true,
  },
  pickuplocation:{
    type: String,
    required:true,
  },
  coordinates: {
    type: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: { type: [Number], default: [0, 0] }, // [longitude, latitude]
},
  status: { 
    type: String, 
    enum: ["available", "claimed", "expired", "in transit"], 
    default: "available" 
  },
  donor:{
     type:Schema.Types.ObjectId,
     ref:"User",
   }, 
},{timestamps:true}
)

aidSchema.index({coordinates:'2dsphere'});

const Aid = mongoose.model("Aid",aidSchema);
module.exports = Aid;