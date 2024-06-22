import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const ReservationHistory = () => {
  const currentUser = useSelector(state => state.user.currentUser);
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedReservation, setSelectedReservation] = useState(null);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/v1/reservations/user/${currentUser._id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch reservations');
        }
        const data = await response.json();
        setReservations(data);
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
      const response = await fetch(`http://localhost:3000/api/v1/reservations/${reservationId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to cancel reservation');
      }
      // Update the reservations list after cancellation
      const updatedReservations = reservations.filter(reservation => reservation._id !== reservationId);
      setReservations(updatedReservations);
      // Close the modal
      handleCloseModal();
    } catch (error) {
      console.error('Error cancelling reservation:', error.message);
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
            {reservations.map((reservation, index) => (
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
        />
      )}
    </div>
  );
};

const ReservationDetailModal = ({ reservation, onClose, onCancel }) => {
  const [cancelError, setCancelError] = useState(null);

  const handleCancel = () => {
    // Combine bookingDate and bookingTime to create a Date object for the booking
    const [hours, minutes] = reservation.bookingTime.split(':').map(Number);
    const bookingDateTime = new Date(reservation.bookingDate);
    bookingDateTime.setHours(hours, minutes);

    // Calculate the time difference between now and the booking time
    const now = new Date();
    const timeDifference = (bookingDateTime - now) / (1000 * 60 * 60); // Time difference in hours

    if (timeDifference < 0.5) {
      setCancelError('Bạn không thể huỷ đặt bàn trong vòng 30 phút trước thời gian đặt bàn');
    } else {
      onCancel(reservation._id);
    }
  };

  // Combine bookingDate and bookingTime to create a Date object for the booking
  const [hours, minutes] = reservation.bookingTime.split(':').map(Number);
  const bookingDateTime = new Date(reservation.bookingDate);
  bookingDateTime.setHours(hours, minutes);

  // Calculate the time difference between now and the booking time
  const now = new Date();
  const timeDifference = (bookingDateTime - now) / (1000 * 60 * 60); // Time difference in hours

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-gray-500 bg-opacity-50 flex items-center justify-center">
      <div className="relative bg-white w-96 rounded-lg shadow-lg">
        <div className="absolute top-0 right-0 p-2">
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 focus:outline-none">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Chi tiết phiếu đặt bàn</h2>
          <p><strong>Họ và tên:</strong> {reservation.fullName}</p>
          <p><strong>Email:</strong> {reservation.email}</p>
          <p><strong>Phone:</strong> {reservation.phone}</p>
          <p><strong>Đặt ngày:</strong> {new Date(reservation.bookingDate).toLocaleDateString()}</p>
          <p><strong>Thời gian:</strong> {reservation.bookingTime}</p>
          <p><strong>Số lượng khách:</strong> {reservation.numberOfGuests}</p>
          <p><strong>Ghi chú:</strong> {reservation.note}</p>
          <p><strong>Trạng thái:</strong> {reservation.status}</p>
          <h3 className="text-lg font-semibold mt-4">Danh sách món ăn:</h3>
          <ul className="list-disc pl-5">
            {reservation.selectedItems.map((item, index) => (
              <li key={index}>
                {item.itemName} - Số lượng: {item.quantity} - Giá: {item.price}
              </li>
            ))}
          </ul>
          {timeDifference < 5 ? (
            <p className="text-red-500 mt-4">Bạn không thể huỷ đặt bàn trong vòng 30 phút trước thời gian đặt bàn</p>
          ) : (
            <button onClick={handleCancel} className="mt-4 bg-red-500 text-white px-4 py-2 rounded-full border-2 border-red-600 hover:bg-red-600 hover:border-red-700 hover:text-white">Huỷ đặt bàn</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReservationHistory;
