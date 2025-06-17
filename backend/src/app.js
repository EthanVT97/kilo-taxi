// backend/src/app.js
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { createServer } = require('http');
const { Server } = require('socket.io');
const { connectDB } = require('./utils/database');
const { connectRedis } = require('./utils/redis');
const logger = require('./utils/logger');

const app = express();
const server = createServer(app);

// Security Middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
}));

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
}));

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    error: 'Too many requests from this IP, please try again later.',
    errorMy: 'ဤ IP မှ တောင်းဆိုမှု များလွန်းပါသည်။ နောက်မှ ပြန်လည်ကြိုးစားပါ။'
  }
});

app.use('/api/', limiter);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Socket.io Setup
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    methods: ["GET", "POST"]
  }
});

// Database Connection
connectDB();
connectRedis();

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/bookings', require('./routes/bookings'));
app.use('/api/drivers', require('./routes/drivers'));
app.use('/api/payments', require('./routes/payments'));

// Socket.io Connection Handler
io.on('connection', (socket) => {
  logger.info(`User connected: ${socket.id}`);
  
  socket.on('join-room', (bookingId) => {
    socket.join(`booking-${bookingId}`);
    logger.info(`User joined booking room: ${bookingId}`);
  });
  
  socket.on('driver-location-update', async (data) => {
    try {
      // Store driver location in Redis
      await redisClient.set(
        `driver:${data.driverId}:location`,
        JSON.stringify(data.location),
        'EX',
        60 // expire in 60 seconds
      );
      
      // Broadcast to booking room
      socket.to(`booking-${data.bookingId}`).emit('driver-location', data.location);
    } catch (error) {
      logger.error('Error updating driver location:', error);
    }
  });
  
  socket.on('disconnect', () => {
    logger.info(`User disconnected: ${socket.id}`);
  });
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).json({
    error: 'Something went wrong!',
    errorMy: 'တစ်ခုခု မှားယွင်းနေပါသည်!'
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
