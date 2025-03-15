const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema(
  {
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', 
      required: true,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', 
      required: true,
    },
    type: {
      type: String,
      enum: ['Join Request', 'Accepted', 'Declined','Pending'], 
      required: true,
    },
    project: {
      type : mongoose.Schema.Types.ObjectId,
      ref: 'Project',
      required: true,
    },
    
  },
  {
    timestamps: true, 
  }
);

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;
