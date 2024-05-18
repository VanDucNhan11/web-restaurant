import React, { useState } from 'react';

const EmployeeTable = ({ employees, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto shadow-md rounded-lg">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">ID</th>
            <th className="py-3 px-6 text-left">Name</th>
            <th className="py-3 px-6 text-left">Position</th>
            <th className="py-3 px-6 text-left">Email</th>
            <th className="py-3 px-6 text-left">Salary</th>
            <th className="py-3 px-6 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {employees.map((employee) => (
            <tr key={employee.id} className="border-b border-gray-200 hover:bg-gray-100">
              <td className="py-3 px-6 text-left whitespace-nowrap">{employee.id}</td>
              <td className="py-3 px-6 text-left">{employee.name}</td>
              <td className="py-3 px-6 text-left">{employee.position}</td>
              <td className="py-3 px-6 text-left">{employee.email}</td>
              <td className="py-3 px-6 text-left">{employee.salary}</td>
              <td className="py-3 px-6 text-center">
                <button
                  onClick={() => onEdit(employee)}
                  className="bg-blue-500 text-white px-3 py-1 rounded mr-2 hover:bg-blue-700 transition duration-300"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(employee.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700 transition duration-300"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const EmployeeManagement = () => {
  const [employees, setEmployees] = useState([
    { id: 1, name: 'John Doe', position: 'Manager', email: 'john@example.com', salary: '5000' },
    { id: 2, name: 'Jane Smith', position: 'Developer', email: 'jane@example.com', salary: '4000' },
    { id: 3, name: 'Sam Johnson', position: 'Designer', email: 'sam@example.com', salary: '4500' },
  ]);

  const [editEmployee, setEditEmployee] = useState(null);

  const handleEdit = (employee) => {
    setEditEmployee(employee);
    // Add logic to open modal or form to edit employee
  };

  const handleDelete = (id) => {
    setEmployees(employees.filter(employee => employee.id !== id));
    // Add logic to delete employee from server
  };

  const handleAddEmployee = () => {
    const newEmployee = { id: employees.length + 1, name: 'New Employee', position: 'New Position', email: 'new@example.com', salary: '0' };
    setEmployees([...employees, newEmployee]);
    // Add logic to open modal or form to add new employee
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-6 text-center title-1 title-font">Quản lý nhân viên</h1>
      <div className="flex justify-end mb-4">
        <button
          onClick={handleAddEmployee}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 transition duration-300"
        >
          Add Employee
        </button>
      </div>
      <EmployeeTable employees={employees} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default EmployeeManagement;
