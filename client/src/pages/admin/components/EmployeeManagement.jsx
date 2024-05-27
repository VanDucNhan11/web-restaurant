import React, { useState, useEffect } from 'react';
import axios from 'axios';



const Modal = ({ isOpen, onClose, title, children }) => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    if (isOpen) {
      const handleScroll = () => {
        setScrollPosition(window.pageYOffset);
      };

      window.addEventListener('scroll', handleScroll);

      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, [isOpen]);

  return (
    <div className={`fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50 ${isOpen ? 'block' : 'hidden'}`}>
      <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
        <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4" style={{ maxHeight: '80vh', overflowY: 'auto', position: 'relative', top: -scrollPosition }}>
          <div className="sm:items-start">
            <div className="mt-3 text-center sm:mt-0 sm:text-left">
              <h3 className="text-lg text-center leading-6 font-medium text-gray-900">
                {title}
              </h3>
              <div className="mt-2">
                {children}
              </div>
            </div>
          </div>
        </div>
        <div className="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <button
            onClick={onClose}
            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};


const EmployeeManagement = () => {
  const [employees, setEmployees] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [editEmployee, setEditEmployee] = useState(null);
  const [detailEmployee, setDetailEmployee] = useState(null);

  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');
  const [position, setPosition] = useState('');
  const [startDate, setStartDate] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [status, setStatus] = useState('');
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/v1/employees');
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const handleEdit = (employee) => {
    setEditEmployee(employee);
    setName(employee.name);
    setDob(employee.dob);
    setGender(employee.gender);
    setPosition(employee.position);
    setStartDate(employee.startDate);
    setPhone(employee.phone);
    setEmail(employee.email);
    setAddress(employee.address);
    setStatus(employee.status);
    setPhoto(employee.photo);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/v1/employees/${id}`);
      setEmployees(employees.filter(employee => employee._id !== id));
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const employeeData = new FormData();
    employeeData.append('name', name);
    employeeData.append('dob', dob);
    employeeData.append('gender', gender);
    employeeData.append('position', position);
    employeeData.append('startDate', startDate);
    employeeData.append('phone', phone);
    employeeData.append('email', email);
    employeeData.append('address', address);
    employeeData.append('status', status);
    if (photo) {
      employeeData.append('photo', photo);
    }

    try {
      if (editEmployee) {
        await axios.put(`http://localhost:3000/api/v1/employees/${editEmployee._id}`, employeeData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        console.log('Employee updated successfully');
      } else {
        await axios.post('http://localhost:3000/api/v1/employees', employeeData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        console.log('Employee added successfully');
      }
      setEditEmployee(null);
      setIsModalOpen(false);
      fetchEmployees();
    } catch (error) {
      console.error('Error saving employee:', error);
    }
  };

  const handleAddEmployee = () => {
    setEditEmployee(null);
    setName('');
    setDob('');
    setGender('');
    setPosition('');
    setStartDate('');
    setPhone('');
    setEmail('');
    setAddress('');
    setStatus('');
    setPhoto(null);
    setIsModalOpen(true);
  };

  const handleViewDetails = (employee) => {
    setDetailEmployee(employee);
    setIsDetailModalOpen(true);
  };

  return (
    <div className="container mx-auto w-full p-6">
      <h1 className="text-3xl font-semibold mb-6 text-center">Quản lý nhân viên</h1>
      <div className="flex justify-end mb-4">
        <button
          onClick={handleAddEmployee}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 transition duration-300"
        >
          Thêm nhân viên
        </button>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editEmployee ? 'Chỉnh sửa nhân viên' : 'Thêm nhân viên'}>
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Họ và Tên:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Ngày sinh:</label>
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Giới tính:</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            >
              <option value="">Chọn giới tính</option>
              <option value="Male">Nam</option>
              <option value="Female">Nữ</option>
              <option value="Other">Khác</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Chức vụ:</label>
            <input
              type="text"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Ngày bắt đầu:</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Số điện thoại:</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Địa chỉ:</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Trạng thái:</label>
            <input
              type="text"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Ảnh:</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setPhoto(e.target.files[0])}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="mr-2 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-400 hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray"
            >
              Hủy bỏ
            </button>
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {editEmployee ? 'Lưu thay đổi' : 'Thêm nhân viên'}
            </button>
          </div>
        </form>
      </Modal>

      <Modal isOpen={isDetailModalOpen} onClose={() => setIsDetailModalOpen(false)} title="Chi tiết nhân viên">
        {detailEmployee && (
          <div>
            <p><strong>ID:</strong> {detailEmployee._id}</p>
            <p><strong>Họ và Tên:</strong> {detailEmployee.name}</p>
            <p><strong>Ngày sinh:</strong> {detailEmployee.dob}</p>
            <p><strong>Giới tính:</strong> {detailEmployee.gender}</p>
            <p><strong>Chức vụ:</strong> {detailEmployee.position}</p>
            <p><strong>Ngày bắt đầu:</strong> {detailEmployee.startDate}</p>
            <p><strong>Số điện thoại:</strong> {detailEmployee.phone}</p>
            <p><strong>Email:</strong> {detailEmployee.email}</p>
            <p><strong>Địa chỉ:</strong> {detailEmployee.address}</p>
            <p><strong>Trạng thái:</strong> {detailEmployee.status}</p>
            {detailEmployee.photo && (
              <div>
                <strong>Ảnh:</strong>
                <img src={`data:image/jpeg;base64,${detailEmployee.photo}`} alt="Employee" />
              </div>
            )}
          </div>
        )}
      </Modal>

      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">ID</th>
              <th className="py-3 px-6 text-left">Họ và Tên</th>
              <th className="py-3 px-6 text-left">Chức vụ</th>
              <th className="py-3 px-6 text-left">Số điện thoại</th>
              <th className="py-3 px-6 text-left">Trạng thái</th>
              <th className="py-3 px-6 text-center">Hành động</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {employees.map((employee) => (
              <tr key={employee._id} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6 text-left whitespace-nowrap">{employee._id}</td>
                <td className="py-3 px-6 text-left">{employee.name}</td>
                <td className="py-3 px-6 text-left">{employee.position}</td>
                <td className="py-3 px-6 text-left">{employee.phone}</td>
                <td className="py-3 px-6 text-left">{employee.status}</td>
                <td className="py-3 px-6 text-center">
                  <button
                    onClick={() => handleViewDetails(employee)}
                    className="bg-blue-500 text-white px-3 py-1 rounded mr-2 hover:bg-blue-700 transition duration-300"
                  >
                    Xem chi tiết
                  </button>
                  <button
                    onClick={() => handleEdit(employee)}
                    className="bg-blue-500 text-white px-3 py-1 rounded mr-2 hover:bg-blue-700 transition duration-300"
                  >
                    Sửa
                  </button>
                  <button
                    onClick={() => handleDelete(employee._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700 transition duration-300"
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeManagement;

