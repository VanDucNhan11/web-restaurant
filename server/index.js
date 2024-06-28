const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');



const userRoutes = require('./routes/User.route');
const categoryRoutes = require('./routes/Category.route'); 
const menuRoutes = require('./routes/Menu.route');
const postRoutes = require('./routes/Post.route');
const banRoutes = require('./routes/Table.route');
const employeeRoutes = require('./routes/Employee.route');
const reservationRoutes = require('./routes/Reservation.route');
const invoiceRoute = require('./routes/Invoice.Route');
const recruitmentRoute = require('./routes/Recruitment.route');
const roleRoute = require('./routes/Role.route');
const positionRoute = require('./routes/Position.route')

const app = express();

require('dotenv').config();
app.use(express.json());



app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
  optionsSuccessStatus: 200,
}));

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/v1/user', userRoutes);
app.use('/api/v1/categories', categoryRoutes); 
app.use('/api/v1/menu', menuRoutes);
app.use('/api/v1/posts', postRoutes);
app.use('/api/v1/tables', banRoutes);
app.use('/api/v1/employees', employeeRoutes);
app.use('/api/v1/reservations', reservationRoutes);
app.use('/api/v1/invoices', invoiceRoute);
app.use('/api/v1/recruitments', recruitmentRoute);
app.use('/api/v1/roles', roleRoute);
app.use('/api/v1/positions', positionRoute);



app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  res.status(statusCode).json({
    success: false,
    statusCode,
    message
  });
});

mongoose.connect(process.env.MONGOBD_URL)
  .then(() => {
    console.log('Mongodb connection successful');
  })
  .catch(() => {
    console.log('Mongodb connection error');
  });

app.listen(3000, () => {
  console.log('Server listening on port 3000');
  
});
