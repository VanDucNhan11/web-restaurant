const Employee = require('../models/Employee.model');
const fs = require('fs');
const path = require('path');

// Lấy danh sách tất cả nhân viên
exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Tạo mới một nhân viên
exports.createEmployee = async (req, res) => {
  const { name, dob, gender, position, startDate, phone, email, address, status } = req.body;
  let photo = req.file ? req.file.path : '';

  if (req.file) {
    const newImagePath = `${req.file.path}.png`;
    fs.renameSync(req.file.path, newImagePath);
    photo = newImagePath;
  }

  const employee = new Employee({
    name,
    dob,
    gender,
    position,
    startDate,
    phone,
    email,
    address,
    status,
    photo
  });

  try {
    const newEmployee = await employee.save();
    res.status(201).json(newEmployee);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Lấy thông tin một nhân viên
exports.getEmployee = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.json(employee);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching employee', error });
  }
};
// Cập nhật thông tin nhân viên
exports.updateEmployee = async (req, res) => {
  const { id } = req.params;
  const { name, dob, gender, position, startDate, phone, email, address, status } = req.body;
  let photo = req.file ? req.file.path : '';

  if (req.file) {
    const newImagePath = `${req.file.path}.png`;
    fs.renameSync(req.file.path, newImagePath);
    photo = newImagePath;
  }

  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(id, {
      name,
      dob,
      gender,
      position,
      startDate,
      phone,
      email,
      address,
      status,
      photo: photo || req.body.photo
    }, { new: true });

    res.json(updatedEmployee);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Xóa một nhân viên
exports.deleteEmployee = async (req, res) => {
  const { id } = req.params;

  try {
    await Employee.findByIdAndDelete(id);
    res.json({ message: 'Đã xóa nhân viên' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.getEmployeesByPosition = async (req, res) => {
  try {
    const position = decodeURIComponent(req.query.position);
    const count = await Employee.countDocuments({ position });
    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching employee count by position', error });
  }
};