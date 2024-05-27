const Employee = require('../models/Employee.model');

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
  const photo = req.file ? req.file.buffer.toString('base64') : null; // Chuyển ảnh thành chuỗi base64

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
    if (!employee) return res.status(404).json({ message: 'Không tìm thấy nhân viên' });
    res.json(employee);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Cập nhật thông tin nhân viên
exports.updateEmployee = async (req, res) => {
    try {
      const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!employee) return res.status(404).json({ message: 'Không tìm thấy nhân viên' });
      res.json(employee);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };

// Xóa một nhân viên
exports.deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee) return res.status(404).json({ message: 'Không tìm thấy nhân viên' });
    res.json({ message: 'Đã xóa nhân viên' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
