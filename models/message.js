const mongoose = require('mongoose');
const { Schema } = mongoose;

const messageSchema = new Schema({
  from: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  to: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  message: { type: String, required: true },
  time: { type: Date, default: Date.now },
  read: { type: Boolean, default: false }
});

const Message = mongoose.model('Message', messageSchema);
module.exports = Message;