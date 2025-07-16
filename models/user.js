const mongoose = require("mongoose");
const {Schema} = mongoose;
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    phoneno:{
        type:String,
        required:true,
    },
    location:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        required:true,
        enum:['donor','recipient'],
    },
    help:{
        type:String,
        required:true,
        enum:['Food','Clothing','Shelter','Medical','Baby Care','Education','Others'],
    },
    coordinates: {
        type: { type: String, enum: ['Point'], default: 'Point' },
        coordinates: { type: [Number], default: [0, 0] }, // [longitude, latitude]
    },
})
userSchema.plugin(passportLocalMongoose);
const User = mongoose.model("User",userSchema);

module.exports= User;