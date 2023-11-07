// importing express framework
const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());

// importing .env parser
const dotenv = require('dotenv');
dotenv.config();

// importing monogodb database
const connectDB = require('./config/db');
connectDB();

// importing Routes
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const profileRoutes = require('./routes/profile.routes');
const houseRoutes = require('./routes/house.route');
const locationRoutes = require('./routes/location.routes');

// Running Global middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Running Routers
app.use('/api/v1', authRoutes);
app.use('/api/v1', userRoutes);
app.use('/api/v1', houseRoutes);
app.use('/api/v1', locationRoutes);
app.use('/api/v1', profileRoutes);

// Error Middlewares
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

// //Not found URL middleware
app.use(notFound);

//Error handler for the whole app
app.use(errorHandler);

//initializing server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server at http://localhost:${port}`);
});
