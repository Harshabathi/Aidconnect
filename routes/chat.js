const express = require('express');
const router = express.Router({mergeParams:true});
const Message = require('../models/message');
const User = require('../models/user');

// Get all conversations for a user
router.get('/conversations/:userId', async (req, res) => {
  const userId = req.params.userId;
  const messages = await Message.find({ $or: [{ from: userId }, { to: userId }] })
    .sort({ time: -1 })
    .populate('from to');

  const conversations = [];
  const seen = new Set();

  messages.forEach(msg => {
    const otherUser = msg.from._id.equals(userId) ? msg.to : msg.from;
    if (!seen.has(otherUser._id.toString())) {
      conversations.push({
        userId: otherUser._id,
        name: otherUser.username,
        lastMessage: msg.message,
        time: msg.time
      });
      seen.add(otherUser._id.toString());
    }
  });

  res.json(conversations);
});

// Get chat history between two users
router.get('/history/:userId/:otherUserId', async (req, res) => {
  const { userId, otherUserId } = req.params;
  const chat = await Message.find({
    $or: [
      { from: userId, to: otherUserId },
      { from: otherUserId, to: userId }
    ]
  }).sort({ time: 1 });
  res.json(chat);
});

module.exports = router;
