const express = require('express')
const mongoose = require('mongoose');
const cors = require('cors');

const userRoutes = require('./routes/User.route');
const app = express();

require('dotenv').config()
app.use(express.json());

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
  optionsSuccessStatus: 200,
}));


app.use('/api/v1/user', userRoutes);


app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  res.status(statusCode).json({
    success: false,
    statusCode,
    message
  })
})

mongoose.connect(process.env.MONGOBD_URL)
  .then(() => {
    console.log('Mongodb connection successful');
  })
  .catch(() => {
    console.log('Mongodb connection error');
  });

// const port = process.env.PORT || 4000
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});