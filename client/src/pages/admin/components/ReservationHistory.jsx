import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

const ReservationHistory = () => {
  const currentUser = useSelector(state => state.user.currentUser);
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedReservation, setSelectedReservation] = useState(null);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/v1/reservations/user/${currentUser._id}`);
        setReservations(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    if (currentUser) {
      fetchReservations();
    }
  }, [currentUser]);

  const handleViewDetail = (reservation) => {
    setSelectedReservation(reservation);
  };

  const handleCloseModal = () => {
    setSelectedReservation(null);
  };

  const handleCancelReservation = async (reservationId) => {
    try {
      const response = await axios.delete(`http://localhost:3000/api/v1/reservations/${reservationId}`);
      if (response.status === 200) {
        const updatedReservations = reservations.filter(reservation => reservation._id !== reservationId);
        setReservations(updatedReservations);
        handleCloseModal();
      } else {
        throw new Error('Failed to cancel reservation');
      }
    } catch (error) {
      console.error('Error cancelling reservation:', error.message);
    }
  };

  const handleUpdateReservation = async (updatedReservation) => {
    try {
      const { status, selectedItems, ...dataToUpdate } = updatedReservation;
      const response = await axios.put(`http://localhost:3000/api/v1/reservations/${updatedReservation._id}`, {
        ...dataToUpdate,
        selectedItems
      });
      if (response.status === 200) {
        const data = response.data;
        const updatedReservations = reservations.map(reservation =>
          reservation._id === data._id ? data : reservation
        );
        setReservations(updatedReservations);
        handleCloseModal();
      } else {
        throw new Error('Failed to update reservation');
      }
    } catch (error) {
      console.error('Error updating reservation:', error.message);
    }
  };

  if (!currentUser) {
    return <div>Please log in to view reservation history</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }
  const sortedReservations = reservations.sort((a, b) => new Date(a.bookingDate) - new Date(b.bookingDate));
  return (
    <div className="p-4 sm:p-8">
      <h2 className="text-3xl font-semibold mb-6 text-center title-1 title-font">Lịch sử đặt bàn</h2>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="w-1/5 py-3 px-4 uppercase font-semibold text-sm text-center">Đặt ngày</th>
              <th className="w-1/5 py-3 px-4 uppercase font-semibold text-sm text-center">Thời gian</th>
              <th className="w-1/5 py-3 px-4 uppercase font-semibold text-sm text-center">Số lượng khách</th>
              <th className="w-1/5 py-3 px-4 uppercase font-semibold text-sm text-center">Trạng thái</th>
              <th className="w-1/5 py-3 px-4 uppercase font-semibold text-sm text-center">Chi tiết</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {sortedReservations.map((reservation, index) => (
              <tr key={index} className="hover:bg-gray-200 transition duration-200">
                <td className="w-1/5 py-3 px-4 text-center">{new Date(reservation.bookingDate).toLocaleDateString()}</td>
                <td className="w-1/5 py-3 px-4 text-center">{reservation.bookingTime}</td>
                <td className="w-1/5 py-3 px-4 text-center">{reservation.numberOfGuests}</td>
                <td className={`w-1/5 py-3 px-4 text-center ${reservation.status === 'đã xác nhận' ? 'text-green-500' : 'text-red-500'}`}>{reservation.status}</td>
                <td className="w-1/5 py-3 px-4 text-center">
                  <button onClick={() => handleViewDetail(reservation)} className="text-blue-500 hover:text-blue-700 focus:outline-none">xem chi tiết</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedReservation && (
        <ReservationDetailModal
          reservation={selectedReservation}
          onClose={handleCloseModal}
          onCancel={handleCancelReservation}
          onUpdate={handleUpdateReservation}
        />
      )}
    </div>
  );
};

const ReservationDetailModal = ({ reservation, onClose, onCancel, onUpdate }) => {
  const [cancelError, setCancelError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [updatedReservation, setUpdatedReservation] = useState({ ...reservation });
  const [menuItems, setMenuItems] = useState([]);
  const [loadingMenu, setLoadingMenu] = useState(false);
  const [selectedMenuItems, setSelectedMenuItems] = useState([]); // Chọn nhiều món từ menuItems
  const [showMenuModal, setShowMenuModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    setLoadingMenu(true);
    try {
      const response = await fetch('http://localhost:3000/api/v1/menu');
      if (!response.ok) {
        throw new Error('Failed to fetch menu items');
      }
      const data = await response.json();
      setMenuItems(data);
    } catch (error) {
      console.error('Error fetching menu items:', error.message);
    } finally {
      setLoadingMenu(false);
    }
  };

  const handleCancel = () => {
    const [hours, minutes] = reservation.bookingTime.split(':').map(Number);
    const bookingDateTime = new Date(reservation.bookingDate);
    bookingDateTime.setHours(hours, minutes);

    const now = new Date();
    const timeDifference = (bookingDateTime - now) / (1000 * 60 * 60);

    if (timeDifference < 0.5) {
      setCancelError('Bạn không thể huỷ đặt bàn trong vòng 30 phút trước thời gian đặt bàn');
    } else {
      onCancel(reservation._id);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedReservation({ ...updatedReservation, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(updatedReservation);
  };

  const handleAddSelectedItems = () => {
    const newItems = selectedMenuItems.map(item => ({
      itemName: item.itemName,
      quantity: 1,
      price: item.price,
    }));
    const updatedItems = [...updatedReservation.selectedItems, ...newItems];
    setUpdatedReservation({ ...updatedReservation, selectedItems: updatedItems });
    setSelectedMenuItems([]); // Reset selected menu items
  };

  const handleRemoveSelectedItem = (index) => {
    const updatedItems = [...updatedReservation.selectedItems];
    updatedItems.splice(index, 1);
    setUpdatedReservation({ ...updatedReservation, selectedItems: updatedItems });
  };

  const handleMenuItemToggle = (item) => {
    if (selectedMenuItems.includes(item)) {
      setSelectedMenuItems(selectedMenuItems.filter(selectedItem => selectedItem._id !== item._id));
    } else {
      setSelectedMenuItems([...selectedMenuItems, item]);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredMenuItems = menuItems.filter(item =>
    item.itemName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const [hours, minutes] = reservation.bookingTime.split(':').map(Number);
  const bookingDateTime = new Date(reservation.bookingDate);
  bookingDateTime.setHours(hours, minutes);

  const now = new Date();
  const timeDifference = (bookingDateTime - now) / (1000 * 60 * 60);

  const isUpdateAllowed = timeDifference >= 0.5 && reservation.status !== 'đã xác nhận';

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-gray-500 bg-opacity-50 flex items-center justify-center">
      <div className="relative bg-white  rounded-lg shadow-lg overflow-y-auto max-h-screen p-6">
        <div className="absolute top-0 right-0 p-2">
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 focus:outline-none">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <h2 className="text-xl text-red-600 font-semibold mb-4 text-center title-font">Chi tiết phiếu đặt bàn</h2>
        {editMode ? (
          <form onSubmit={handleSubmit}>
            <label>
              Họ và tên:
              <input
                type="text"
                name="fullName"
                value={updatedReservation.fullName}
                onChange={handleInputChange}
                className="block w-full mt-1 border rounded"
              />
            </label>
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={updatedReservation.email}
                onChange={handleInputChange}
                className="block w-full mt-1 border rounded"
              />
            </label>
            <label>
              Phone:
              <input
                type="tel"
                name="phone"
                value={updatedReservation.phone}
                onChange={handleInputChange}
                className="block w-full mt-1 border rounded"
              />
            </label>
            <label>
              Đặt ngày:
              <input
                type="date"
                name="bookingDate"
                value={new Date(updatedReservation.bookingDate).toISOString().split('T')[0]}
                onChange={handleInputChange}
                className="block w-full mt-1 border rounded"
                required
                min={new Date().toISOString().split('T')[0]}
                defaultValue={new Date().toISOString().split('T')[0]}
              />
            </label>
            <label>
              Thời gian:
              <input
                type="time"
                name="bookingTime"
                value={updatedReservation.bookingTime}
                onChange={handleInputChange}
                className="block w-full mt-1 border rounded"
              />
            </label>
            <label>
              Số lượng khách:
              <input
                type="number"
                name="numberOfGuests"
                value={updatedReservation.numberOfGuests}
                onChange={handleInputChange}
                className="block w-full mt-1 border rounded"
              />
            </label>
            <label>
              Món ăn:
              <div className="block w-full mt-1">
                <button
                  type="button"
                  onClick={() => setShowMenuModal(true)}
                  className="bg-blue-500 text-white px-4 py-1 rounded-full"
                >
                  Chọn món ăn
                </button>
              </div>
            </label>
            <h3 className="text-lg font-semibold mt-4">Danh sách món ăn đã chọn:</h3>
            <ul className="list-disc pl-5">
              {updatedReservation.selectedItems.map((item, index) => (
                <li key={index} className="flex justify-between items-center mt-1">
                  <div>
                    {item.itemName} - Giá: {item.price.toLocaleString('vi-VN')} VNĐ
                  </div>
                  <div className="flex items-center">
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => {
                        const newQuantity = parseInt(e.target.value);
                        const updatedItems = [...updatedReservation.selectedItems];
                        updatedItems[index].quantity = newQuantity;
                        setUpdatedReservation({ ...updatedReservation, selectedItems: updatedItems });
                      }}
                      className="w-16 mx-2 text-center"
                      min="1"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveSelectedItem(index)}
                      className="bg-red-500 text-white px-2 py-1 rounded-full"
                    >
                      Xóa
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <label>
              Ghi chú:
              <textarea
                name="note"
                value={updatedReservation.note}
                onChange={handleInputChange}
                className="block w-full mt-1 border rounded p-2"
              ></textarea>
            </label>
            <button
              onClick={() => setEditMode(false)}
              className="mt-4 ml-2 bg-gray-500 text-white px-4 py-2 rounded-full"
            >
              Hủy
            </button>
            <button type="submit" className="mt-4 ml-3 bg-blue-500 text-white px-4 py-2 rounded-full">
              Cập nhật
            </button>
            
          </form>
        ) : (
          <>
            <p><strong>Họ và tên:</strong> {reservation.fullName}</p>
            <p><strong>Email:</strong> {reservation.email}</p>
            <p><strong>Phone:</strong> {reservation.phone}</p>
            <p><strong>Đặt ngày:</strong> {new Date(reservation.bookingDate).toLocaleDateString()}</p>
            <p><strong>Thời gian:</strong> {reservation.bookingTime}</p>
            <p><strong>Số lượng khách:</strong> {reservation.numberOfGuests}</p>
            <p><strong>Ghi chú:</strong> {reservation.note}</p>
            <h3 className="text-lg font-semibold mt-4">Danh sách món ăn đã chọn:</h3>
            <ul className="list-disc pl-5">
              {reservation.selectedItems.map((item, index) => (
                <li key={index}>{item.itemName} - Số lượng: {item.quantity} - Giá: {item.price.toLocaleString('vi-VN')} VNĐ</li>
              ))}
            </ul>
            {timeDifference >= 0.5 && (
              <>
                <button
                  onClick={handleCancel}
                  className="mt-4 ml-2 bg-red-500 text-white px-4 py-2 rounded-full"
                >
                  Hủy đặt bàn
                </button>
                {isUpdateAllowed && (
                <button onClick={() => setEditMode(true)} className="mt-4 ml-3 bg-green-500 text-white px-4 py-2 rounded-full border-2 border-green-600 hover:bg-green-600 hover:border-green-700 hover:text-white">
                  Cập nhật
                </button>
                )}
                
              </>
            )}
            {cancelError && <p className="text-red-500 mt-2">{cancelError}</p>}
          </>
        )}
      </div>
      {showMenuModal && (
        <MenuModal
          menuItems={filteredMenuItems}
          selectedMenuItems={selectedMenuItems}
          handleMenuItemToggle={handleMenuItemToggle}
          handleAddSelectedItems={handleAddSelectedItems}
          onClose={() => setShowMenuModal(false)}
          searchTerm={searchTerm}
          handleSearchChange={handleSearchChange}
        />
      )}
    </div>
  );
};

const MenuModal = ({
  menuItems,
  selectedMenuItems,
  handleMenuItemToggle,
  handleAddSelectedItems,
  onClose,
  searchTerm,
  handleSearchChange,
}) => {
  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-gray-500 bg-opacity-50 flex items-center justify-center">
      <div className="relative bg-white w-96 rounded-lg shadow-lg p-4">
        <div className="absolute top-0 right-0 p-2 flex space-x-2">
          <button onClick={onClose} className="bg-red-500 text-white px-4 py-2 rounded-full focus:outline-none">
            Thoát
          </button>
        </div>
        <h2 className="text-xl font-semibold mb-4">Chọn món ăn</h2>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Tìm kiếm món ăn..."
          className="block w-full mb-4 p-2 border rounded"
        />
        <ul className="grid grid-cols-1 gap-2 max-h-60 overflow-y-auto">
          {menuItems.map((item) => (
            <li
              key={item._id}
              onClick={() => handleMenuItemToggle(item)}
              className={`p-2 border rounded cursor-pointer ${selectedMenuItems.some(
                (selectedItem) => selectedItem._id === item._id
              ) ? 'bg-green-200' : ''}`}
            >
              <div className="flex items-center">
                <img src={`http://localhost:3000/${item.image}`} alt={item.itemName} className="w-12 h-12 rounded-full mr-4" />
                <div>
                  <p className="font-semibold">{item.itemName}</p>
                  <p>{item.price.toLocaleString('vi-VN')} VNĐ</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <button
          type="button"
          onClick={() => {
            handleAddSelectedItems();
            onClose();
          }}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-full w-full"
        >
          Thêm món ăn
        </button>
      </div>
    </div>
  );
};




export default ReservationHistory;

