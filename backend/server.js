const express = require('express');
const mongoose = require('mongoose');


const cors = require('cors');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');


// Load environment variables
dotenv.config();

const app = express();
const http = require('http');
const server = http.createServer(app);
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json()); // Parse JSON request bodies
app.use(cors()); // Enable CORS

const Message = require("./models/Message")

const { Server } = require("socket.io");
const io = new Server(server,{
  cors:{
    origin : "http://localhost:5173",
    methods : ["GET","POST"],
    credentials : true,
  }
});


// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// JWT Authentication Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Access token required' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = user; // Attach decoded user info to the request
    next();
  });
};

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the CodeMingle API!' });
});

// Import API routes
const userRoutes = require('./routes/userRoutes');
const projectRoutes = require('./routes/projectRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');

// Use API routes
app.use('/api/users', userRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/auth',authRoutes);
app.use("/api/tasks", taskRoutes);

io.on('connection', (socket) => {
  console.log('a user connected');
  console.log("id:", socket.id);
  socket.on("join_room", async (room) => {
    socket.join(room);
    console.log(`User ${socket.id} joined room: ${room}`);

    // Load messages from MongoDB
    const messages = await Message.find({ room }).sort({ timestamp: 1 });
    socket.emit("load_messages", messages);
  });

  // Handle sending messages
  socket.on("send_message", async ({ room, sender, text }) => {
    const message = new Message({ room, sender, text });
    await message.save();
    
    io.to(room).emit("receive_message", message);
  });

  socket.on("disconnect", () => {
    console.log(`User Disconnected: ${socket.id}`);
  });
})

app.get("/messages/:projectId", async (req, res) => {
  const { projectId } = req.params;
  const messages = await Message.find({ room: projectId }).sort({ timestamp: 1 });
  res.json(messages);
});

app.post("/messages", async (req, res) => {
  const newMessage = new Message(req.body);
  await newMessage.save();
  res.status(201).send("Message saved");
});


// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error' });
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
