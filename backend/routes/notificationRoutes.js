const express = require('express');
const router = express.Router();
const {
  getAllNotifications,
  createNotification,
  getNotificationById,
  updateNotification,
  deleteNotification,
  getProjectRequests,
  getSendRequests,
} = require('../controllers/notificationController');  // Adjust path if needed

// Route to get all notifications
router.get('/', getAllNotifications);

// Route to get notifications for a recipient
router.get('/recipient/:recipient_id', getProjectRequests);

// Route to get notifications sent by a sender
router.get('/sender/:sender_id', getSendRequests);

// Route to get a notification by ID
router.get('/:id', getNotificationById);

// Route to create a new notification
router.post('/', createNotification);

// Route to update a notification by ID
router.put('/:id', updateNotification);

// Route to delete a notification by ID
router.delete('/:id', deleteNotification);

module.exports = router;
