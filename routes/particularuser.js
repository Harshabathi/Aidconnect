const express = require('express');
const router = express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync.js");
const Message = require('../models/message');
const User = require('../models/user');
const Aid = require('../models/aid.js');
const {checklogin} = require('../middleware.js');
const mongoose = require('mongoose');

router.get("/dashboard", checklogin, wrapAsync(async (req, res) => {
    let id = req.params.id;
    let user = await User.findById(id);
  
    if (user.role === 'donor') {
      let aids = await Aid.find({ donor: id }).populate("donor");
      aids = aids.map(aid => ({
        ...aid.toObject(),
        postedAgo: dayjs(aid.createdAt).fromNow()
      }));
      res.render("./user/donordashboard.ejs", { aids });
    } else {
      const maxDistance = 10000; 
      let aids = await Aid.find({
        coordinates: {
          $near: {
            $geometry: { type: "Point", coordinates: user.coordinates.coordinates },
            $maxDistance: maxDistance
          }
        },
        status: "available"
      }).populate("donor");
  
      aids = aids.map(aid => ({
        ...aid.toObject(),
        postedAgo: dayjs(aid.createdAt).fromNow()
      }));
     
      res.render("./user/recipientdashboard.ejs",{aids,dayjs});
    }
  }))
  
  
  router.get("/messages",checklogin,async (req,res)=>{
    const userId =new mongoose.Types.ObjectId(req.params.id);
  
    // Find all messages involving the user, most recent first
    const messages = await Message.find({ $or: [{ from: userId }, { to: userId }] })
      .sort({ time: -1 })
      .populate('from to');
  
    // Build a list of unique conversations
    const conversations = [];
    const seen = new Set();
  
    messages.forEach(msg => {
      const otherUser = msg.from._id.equals(userId) ? msg.to : msg.from;
      if (!seen.has(otherUser._id.toString())) {
        conversations.push({
          userId: otherUser._id,
          name: otherUser.username,
          subject: 'Regarding the aid posted ', // You can customize this
          lastMessage: msg.message,
          time: msg.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          unread: 0, // You can implement unread logic if you want
          status: 'active'
        });
        seen.add(otherUser._id.toString());
      }
    });
  
    
  
    let chat = [];
    if (conversations.length > 0) {
      chat = await Message.find({
        $or: [
          { from: userId, to: conversations[0].userId },
          { from: conversations[0].userId, to: userId }
        ]
      }).sort({ time: 1 });
    }
    res.render("./user/messages.ejs", { conversations, chat, currentUser: req.user });
  })
  
  
 router.get('/messages/:otherUserId',checklogin, async (req, res) => {
    const userId =new mongoose.Types.ObjectId(req.params.id);
    const otherUserId = new mongoose.Types.ObjectId(req.params.otherUserId);
  
    // Fetch all messages between the two users
    const chat = await Message.find({
      $or: [
        { from: userId, to: otherUserId },
        { from: otherUserId, to: userId }
      ]
    }).sort({ time: 1 });
  
    // Optionally, fetch the other user's info for the chat header
    const otherUser = await User.findById(otherUserId);
  
    res.render('./user/chat.ejs', {
      chat,
      otherUser,
      currentUser: req.user
    });
  });
  
module.exports = router;