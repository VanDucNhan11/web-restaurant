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
  const [editEmployee, setEditEmployee] = useState({});
  const [detailEmployee, setDetailEmployee] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/v1/employees');
      setEmployees(response.data);
    } catch (error) {
      console.error('Có lỗi xảy ra khi lấy danh sách nhân viên:', error);
    }
  };

  const handleEdit = (employee) => {
    setEditEmployee(employee);
    setImagePreview(`http://localhost:3000/${employee.photo}`);
    setIsModalOpen(true);
  };

  const handleViewDetails = (employee) => {
    setDetailEmployee(employee);
    setIsDetailModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/v1/employees/${id}`);
      setEmployees(employees.filter(employee => employee._id !== id));
    } catch (error) {
      console.error('Có lỗi xảy ra khi xóa nhân viên:', error);
    }
  };

  const handleSave = async (event) => {
    event.preventDefault();

    try {
      if (!editEmployee.name || !editEmployee.dob || !editEmployee.gender || !editEmployee.position || !editEmployee.startDate || !editEmployee.phone || !editEmployee.email || !editEmployee.address || !editEmployee.status) {
        alert('Vui lòng điền đầy đủ thông tin');
        return;
      }

      const formData = new FormData();
      formData.append('name', editEmployee.name);
      formData.append('dob', editEmployee.dob);
      formData.append('gender', editEmployee.gender);
      formData.append('position', editEmployee.position);
      formData.append('startDate', editEmployee.startDate);
      formData.append('phone', editEmployee.phone);
      formData.append('email', editEmployee.email);
      formData.append('address', editEmployee.address);
      formData.append('status', editEmployee.status);

      if (editEmployee.photo && editEmployee.photo instanceof File) {
        formData.append('photo', editEmployee.photo);
      }

      if (editEmployee._id) {
        await axios.put(`http://localhost:3000/api/v1/employees/${editEmployee._id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      } else {
        const response = await axios.post('http://localhost:3000/api/v1/employees', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        setEmployees([...employees, response.data]);
      }

      setIsModalOpen(false);
      setEditEmployee({});
      setImagePreview(null);
      fetchEmployees();
    } catch (error) {
      console.error('Có lỗi xảy ra khi lưu nhân viên:', error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEditEmployee({ ...editEmployee, photo: file });
      const imageURL = URL.createObjectURL(file);
      setImagePreview(imageURL);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-6 text-center title-1 title-font">Quản lý nhân viên</h1>
      <div className="flex justify-end mb-4">
        <button onClick={() => { setEditEmployee({}); setIsModalOpen(true); }} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 transition duration-300">Thêm nhân viên</button>
      </div>
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
                  <button onClick={() => handleViewDetails(employee)} className="bg-blue-500 text-white px-3 py-1 rounded mr-2 hover:bg-blue-700 transition duration-300">Xem chi tiết</button>
                  <button onClick={() => handleEdit(employee)} className="bg-blue-500 text-white px-3 py-1 rounded mr-2 hover:bg-blue-700 transition duration-300">Sửa</button>
                  <button onClick={() => handleDelete(employee._id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700 transition duration-300">Xóa</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editEmployee._id ? "Chỉnh sửa nhân viên" : "Thêm nhân viên"}>
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Họ và Tên:</label>
            <input
              type="text"
              value={editEmployee.name || ''}
              onChange={(e) => setEditEmployee({ ...editEmployee, name: e.target.value })}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Ngày sinh:</label>
            <input
              type="date"
              value={editEmployee.dob ? editEmployee.dob.split('T')[0] : ''}
              onChange={(e) => setEditEmployee({ ...editEmployee, dob: e.target.value })}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div>
          <label className="block text-sm font-medium text-gray-700">Giới tính:</label>
            <input
              type="text"
              value={editEmployee.gender || ''}
              onChange={(e) => setEditEmployee({ ...editEmployee, gender: e.target.value })}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              list="gender-options"
              required
            />
            <datalist id="gender-options">
              <option value="Nam" />
              <option value="Nữ" />
            </datalist>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Chức vụ:</label>
            <input
              type="text"
              value={editEmployee.position || ''}
              onChange={(e) => setEditEmployee({ ...editEmployee, position: e.target.value })}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Ngày bắt đầu:</label>
            <input
              type="date"
              value={editEmployee.startDate ? editEmployee.startDate.slice(0, 10) : ''}
              onChange={(e) => setEditEmployee({ ...editEmployee, startDate: e.target.value })}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Số điện thoại:</label>
            <input
              type="text"
              value={editEmployee.phone || ''}
              onChange={(e) => setEditEmployee({ ...editEmployee, phone: e.target.value })}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email:</label>
            <input
              type="email"
              value={editEmployee.email || ''}
              onChange={(e) => setEditEmployee({ ...editEmployee, email: e.target.value })}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Địa chỉ:</label>
            <input
              type="text"
              value={editEmployee.address || ''}
              onChange={(e) => setEditEmployee({ ...editEmployee, address: e.target.value })}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div>
          <label className="block text-sm font-medium text-gray-700">Trạng thái:</label>
          <input
            type="text"
            value={editEmployee.status || ''}
            onChange={(e) => setEditEmployee({ ...editEmployee, status: e.target.value })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            list="status-options"
            required
          />
          <datalist id="status-options">
            <option value="Đang làm việc" />
            <option value="Tạm nghỉ" />
            <option value="Nghỉ việc" />
          </datalist>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Ảnh:</label>
            <input
              type="file"
              onChange={handleImageChange}
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-600 hover:file:bg-indigo-100"
            />
            {imagePreview && (
              <img src={imagePreview} alt="Preview" className="w-16 h-16 object-cover mt-2" />
            )}
          </div>
          <div className="flex justify-end">
            <button onClick={() => setIsModalOpen(false)} className="bg-gray-500 text-white px-4 py-2 rounded mr-2 hover:bg-gray-700 transition duration-300">Hủy</button>
            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 transition duration-300">Lưu</button>
          </div>
        </form>
      </Modal>

      {detailEmployee && (
          <Modal isOpen={isDetailModalOpen} onClose={() => setIsDetailModalOpen(false)} title="Chi tiết nhân viên">
            <div>
              <p><strong>ID:</strong> {detailEmployee._id}</p>
              <p><strong>Họ và Tên:</strong> {detailEmployee.name}</p>
              <p><strong>Ngày sinh:</strong> {detailEmployee.dob ? new Date(detailEmployee.dob).toLocaleDateString() : ''}</p>
              <p><strong>Giới tính:</strong> {detailEmployee.gender}</p>
              <p><strong>Chức vụ:</strong> {detailEmployee.position}</p>
              <p><strong>Ngày bắt đầu:</strong> {detailEmployee.startDate ? new Date(detailEmployee.startDate).toLocaleDateString() : ''}</p>
              <p><strong>Số điện thoại:</strong> {detailEmployee.phone}</p>
              <p><strong>Email:</strong> {detailEmployee.email}</p>
              <p><strong>Địa chỉ:</strong> {detailEmployee.address}</p>
              <p><strong>Trạng thái:</strong> {detailEmployee.status}</p>
              {detailEmployee.photo && (
                <img src={`http://localhost:3000/${detailEmployee.photo}`} alt={detailEmployee.name} className=" object-cover mt-2" />
              )}
            </div>
        </Modal>
      )}
    </div>
  );
};

export default EmployeeManagement;



