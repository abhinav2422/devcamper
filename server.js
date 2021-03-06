const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const errorHandler = require('./middleware/error');
const cookieParser = require('cookie-parser');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimiter = require('express-rate-limit');
const cors = require('cors');
const connectDB = require('./config/db');
const fileupload = require('express-fileupload');

// Environment Variables
dotenv.config({ path: './config/config.env' });

//Route Files
const bootcamps = require('./routes/bootcamps');
const courses = require('./routes/courses');
const auth = require('./routes/auth');
const users = require('./routes/users');
const reviews = require('./routes/reviews');

//Connect DB
connectDB();

const app = express();

//Body Parser
app.use(express.json());

// Cookie Parser
app.use(cookieParser());

// Mongo Sanitize (Prevent NoSql Injection)
app.use(mongoSanitize());

// Set Headers
app.use(helmet());

// Prevent Cross Site Scripting
app.use(xss());

// Rate Limiter
const limiter = rateLimiter({
  windowMs: 10 * 60 * 1000,
  max: 100,
});
app.use(limiter);

// Cross Origin Resource Sharing
app.use(cors());

//Logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// File Upload
app.use(fileupload());

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/v1/bootcamps', bootcamps);
app.use('/api/v1/courses', courses);
app.use('/api/v1/auth', auth);
app.use('/api/v1/users', users);
app.use('/api/v1/reviews', reviews);

app.use(errorHandler);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`)
);

//Handle Rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  //Exit app
  server.close(() => process.exit(1));
});
