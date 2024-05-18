import React, { useState } from 'react';

const TableTable = ({ tables, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto shadow-md rounded-lg">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">ID</th>
            <th className="py-3 px-6 text-left">Seats</th>
            <th className="py-3 px-6 text-left">Type</th>
            <th className="py-3 px-6 text-left">Status</th>
            <th className="py-3 px-6 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {tables.map((table) => (
            <tr key={table.id} className="border-b border-gray-200 hover:bg-gray-100">
              <td className="py-3 px-6 text-left whitespace-nowrap">{table.id}</td>
              <td className="py-3 px-6 text-left">{table.seats}</td>
              <td className="py-3 px-6 text-left">{table.type}</td>
              <td className="py-3 px-6 text-left">{table.status}</td>
              <td className="py-3 px-6 text-center">
                <button
                  onClick={() => onEdit(table)}
                  className="bg-blue-500 text-white px-3 py-1 rounded mr-2 hover:bg-blue-700 transition duration-300"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(table.id)}
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

const TableManagement = () => {
  const [tables, setTables] = useState([
    { id: 1, seats: 4, type: 'Standard', status: 'Available' },
    { id: 2, seats: 6, type: 'VIP', status: 'Booked' },
    { id: 3, seats: 2, type: 'Standard', status: 'Available' },
  ]);

  const [editTable, setEditTable] = useState(null);

  const handleEdit = (table) => {
    setEditTable(table);
    // Add logic to open modal or form to edit table
  };

  const handleDelete = (id) => {
    setTables(tables.filter(table => table.id !== id));
    // Add logic to delete table from server
  };

  const handleAddTable = () => {
    const newTable = { id: tables.length + 1, seats: 4, type: 'Standard', status: 'Available' };
    setTables([...tables, newTable]);
    // Add logic to open modal or form to add new table
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-6 text-center title-1 title-font">Table Management</h1>
      <div className="flex justify-end mb-4">
        <button
          onClick={handleAddTable}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 transition duration-300"
        >
          Add Table
        </button>
      </div>
      <TableTable tables={tables} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default TableManagement;
