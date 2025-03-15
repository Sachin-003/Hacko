const Notification = require('../models/notificationModel'); // Adjust path if needed

const getAllNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find();
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch notifications', error: error.message });
  }
};

const getNotificationById = async (req, res) => {
  const { id } = req.params;
  try {
    const notification = await Notification.findById(id);
    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }
    res.status(200).json(notification);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch notification', error: error.message });
  }
};

const createNotification = async (req, res) => {
  const { recipient, sender, type, project } = req.body; // Fixed spelling

  try {
    const newNotification = new Notification({ recipient, sender, type, project });
    await newNotification.save();
    res.status(201).json({ message: 'Notification created successfully', newNotification });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create notification', error: error.message });
  }
};

const updateNotification = async (req, res) => {
  const { id } = req.params;
  const { recipient, sender, type, project } = req.body; // Fixed spelling

  try {
    const updatedNotification = await Notification.findByIdAndUpdate(
      id,
      { recipient, sender, type, project },
      { new: true }
    );
    if (!updatedNotification) {
      return res.status(404).json({ message: 'Notification not found' });
    }
    res.status(200).json({ message: 'Notification updated successfully', updatedNotification });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update notification', error: error.message });
  }
};

const deleteNotification = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedNotification = await Notification.findByIdAndDelete(id);
    if (!deletedNotification) {
      return res.status(404).json({ message: 'Notification not found' });
    }
    res.status(200).json({ message: 'Notification deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete notification', error: error.message });
  }
};

const getProjectRequests = async (req, res) => {
  const { recipient_id } = req.params;

  try {
    const myRequests = await Notification.find({ recipient: recipient_id });

    if (myRequests.length === 0) {
      return res.status(404).json({ success: false, message: 'No project requests found for the recipient' });
    }

    res.status(200).json({ success: true, data: myRequests });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching project requests', error: error.message });
  }
};

const getSendRequests = async (req, res) => {
  const { sender_id } = req.params;

  try {
    const myRequests = await Notification.find({ sender: sender_id });

    if (myRequests.length === 0) {
      return res.status(404).json({ success: false, message: 'You have no pending requests.' });
    }

    res.status(200).json({ success: true, data: myRequests });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching sent requests', error: error.message });
  }
};

module.exports = {
  getAllNotifications,
  getNotificationById,
  createNotification,
  updateNotification,
  deleteNotification,
  getProjectRequests,
  getSendRequests,
};
