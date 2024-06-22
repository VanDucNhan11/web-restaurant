import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

const DuyetPhieuDatBan = () => {
  const currentUser = useSelector(state => state.user.currentUser);
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [approveConfirmation, setApproveConfirmation] = useState(false);
  const [cancelConfirmation, setCancelConfirmation] = useState(false);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [selectedDetailReservation, setSelectedDetailReservation] = useState(null);
  const [cancelReason, setCancelReason] = useState('');
  const [filterType, setFilterType] = useState('all'); // New state for filter type
  const detailRef = useRef(null); // Ref for detail content

  // Function to handle cancel reason change
  const handleCancelReasonChange = (event) => {
    setCancelReason(event.target.value);
  };

  // Fetch reservations on component mount
  useEffect(() => {
    const fetchReservations = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/v1/reservations`);
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

    fetchReservations();
}, []);

const printToPdf = () => {
  if (!selectedDetailReservation) {
    console.error('No selected reservation data available.');
    return;
  }

  // Set fonts for pdfMake
  pdfMake.vfs = pdfFonts.pdfMake.vfs;

  // Create an array for selected items data
  const tableData = selectedDetailReservation.selectedItems.map(item => {
    return [item.itemName, item.quantity];
  });

  // Create document definition
  const documentDefinition = {
    content: [
      { text: 'Chi tiết phiếu đặt bàn', style: 'header' },
      { text: `Tên khách hàng: ${selectedDetailReservation.fullName}`, margin: [0, 10, 0, 0] },
      { text: `Email: ${selectedDetailReservation.email}`, margin: [0, 5, 0, 0] },
      { text: `Phone: ${selectedDetailReservation.phone}`, margin: [0, 5, 0, 0] },
      { text: `Đặt ngày: ${new Date(selectedDetailReservation.bookingDate).toLocaleDateString()}`, margin: [0, 5, 0, 0] },
      { text: `Thời gian đặt: ${selectedDetailReservation.bookingTime}`, margin: [0, 5, 0, 0] },
      { text: `Số lượng khách: ${selectedDetailReservation.numberOfGuests}`, margin: [0, 5, 0, 0] },
      { text: `Yêu cầu đặc biệt: ${selectedDetailReservation.note}`, margin: [0, 5, 0, 20] },
      {
          table: {
              headerRows: 1,
              widths: ['*', '*'],
              body: [
                  ['Tên món', 'Số lượng'],
                  ...tableData
              ]
          },
          margin: [0, 10, 0, 0], // Margin top: 10px
      },
      { 
          text: 'Vui lòng chuẩn bị món ăn trước thời gian khách đã đặt', 
          alignment: 'center', 
          margin: [0, 15, 0, 0],
          fontSize: 14,
          bold: true,
      },
    ],
    styles: {
      header: {
        fontSize: 18,
        bold: true,
        alignment: 'center',
        margin: [0, 0, 0, 10]
      }
    }
  };

  // Generate and download PDF
  try {
    pdfMake.createPdf(documentDefinition).download(`reservation_details_${selectedDetailReservation._id}.pdf`);
  } catch (error) {
    console.error('Error generating PDF:', error);
  }
};

  // Function to handle approval of a reservation
  const handleApproveReservation = (reservationId) => {
    setSelectedReservation(reservationId);
    setApproveConfirmation(true);
  };

  // Function to handle cancellation of a reservation
  const handleCancelReservation = (reservationId) => {
    setSelectedReservation(reservationId);
    setCancelConfirmation(true);
  };

  // Function to view details of a reservation
  const handleViewDetail = (reservationId) => {
    const selected = reservations.find(reservation => reservation._id === reservationId);
    setSelectedDetailReservation(selected);
    setDetailModalOpen(true);
  };

  // Function to confirm approval of a reservation
  const confirmApprove = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/v1/reservations/${selectedReservation}/approve`, {
        method: 'POST',
      });
      if (!response.ok) {
        throw new Error('Failed to approve reservation');
      }
      setApproveConfirmation(false);
      window.location.reload();
    } catch (error) {
      console.error('Error approving reservation:', error.message);
    }
  };

  // Function to confirm cancellation of a reservation
  const confirmCancel = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/v1/reservations/${selectedReservation}/cancel`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cancelReason }), // Send cancellation reason
      });
      if (!response.ok) {
        throw new Error('Failed to cancel reservation');
      }
      const updatedReservations = reservations.filter(reservation => reservation._id !== selectedReservation);
      setReservations(updatedReservations);
      setCancelConfirmation(false);
      setCancelReason('');
    } catch (error) {
      console.error('Error cancelling reservation:', error.message);
    }
  };

  // JSX for approval confirmation dialog
  const approveConfirmationDialog = (
    <div className="fixed inset-0 z-50 overflow-auto bg-gray-500 bg-opacity-50 flex items-center justify-center">
      <div className="relative bg-white w-96 rounded-lg shadow-lg">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Xác nhận duyệt đặt bàn</h2>
          <p>Bạn có chắc chắn muốn duyệt phiếu đặt bàn này không?</p>
          <div className="mt-4 flex justify-end">
            <button onClick={() => setApproveConfirmation(false)} className="mr-4 bg-gray-300 text-gray-800 px-4 py-2 rounded-full hover:bg-gray-400">Hủy</button>
            <button onClick={confirmApprove} className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600">Duyệt</button>
          </div>
        </div>
      </div>
    </div>
  );

  // JSX for cancellation confirmation dialog
  const cancelConfirmationDialog = (
    <div className="fixed inset-0 z-50 overflow-auto bg-gray-500 bg-opacity-50 flex items-center justify-center">
      <div className="relative bg-white w-96 rounded-lg shadow-lg">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Xác nhận huỷ đặt bàn</h2>
          <p>Bạn có chắc chắn muốn huỷ phiếu đặt bàn này không?</p>
          <div className="mt-4">
            <textarea
              className="w-full h-24 border border-gray-300 rounded-lg p-2 focus:outline-none focus:border-gray-500"
              placeholder="Nhập lý do huỷ đặt bàn..."
              value={cancelReason}
              onChange={handleCancelReasonChange}
            />
          </div>
          <div className="mt-4 flex justify-end">
            <button onClick={() => setCancelConfirmation(false)} className="mr-4 bg-gray-300 text-gray-800 px-4 py-2 rounded-full hover:bg-gray-400">Hủy</button>
            <button onClick={confirmCancel} className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600">Huỷ đặt bàn</button>
          </div>
        </div>
      </div>
    </div>
  );

  // JSX for detail modal
  const detailModal = (
    <div className="fixed inset-0 z-50 overflow-auto bg-gray-500 bg-opacity-50 flex items-center justify-center">
      <div className="relative bg-white w-96 rounded-lg shadow-lg">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Chi tiết phiếu đặt bàn</h2>
          <div ref={detailRef} className="mb-4">
            {selectedDetailReservation && (
              <>
                <p><span className="font-semibold">Người đặt:</span> {selectedDetailReservation.fullName}</p>
                <p><span className="font-semibold">Email:</span> {selectedDetailReservation.email}</p>
                <p><span className="font-semibold">Số điện thoại:</span> {selectedDetailReservation.phone}</p>
                <p><span className="font-semibold">Ngày đặt:</span> {new Date(selectedDetailReservation.bookingDate).toLocaleDateString()}</p>
                <p><span className="font-semibold">Thời gian đặt:</span> {selectedDetailReservation.bookingTime}</p>
                <p><span className="font-semibold">Số lượng khách:</span> {selectedDetailReservation.numberOfGuests}</p>
                <p><span className="font-semibold">Ghi chú:</span> {selectedDetailReservation.note}</p>
                <h3 className="text-lg font-semibold mt-4 ">Danh sách món ăn:</h3>
                <ul className="list-disc pl-5 mb-5">
                  {selectedDetailReservation.selectedItems.map((item, index) => (
                    <li key={index}>
                      {item.itemName} - Số lượng: {item.quantity}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
          <div className="flex justify-end">
            <button onClick={() => setDetailModalOpen(false)} className="bg-gray-300 text-gray-800 px-4 py-2 rounded-full hover:bg-gray-400">Đóng</button>
            <button onClick={printToPdf} className="bg-blue-500 ml-3 text-gray-800 px-4 py-2 rounded-full hover:bg-gray-400">Xuất PDF</button>
          </div>
        </div>
      </div>
    </div>
  );
  

  // Conditional rendering based on user authentication, loading state, and errors
  if (!currentUser) {
    return <div>Vui lòng đăng nhập để duyệt phiếu đặt bàn</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const now = new Date();

  // Filter reservations based on filterType
  const filteredReservations = reservations.filter(reservation => {
    const reservationDate = new Date(reservation.bookingDate);
    return filterType === 'all' ||
      (filterType === 'overdue' && now > reservationDate) ||
      (filterType === 'new' && now <= reservationDate);
  });

  // JSX for reservations table
  return (
    <div className="p-4 sm:p-8">
      <h2 className="text-3xl font-semibold mb-6 text-center title-1 title-font">Danh sách phiếu đặt bàn</h2>
      <div className="flex justify-center mb-4">
        <button
          onClick={() => setFilterType('all')}
          className={`px-4 py-2 rounded-full ${filterType === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'} mr-2`}
        >
          Tất cả
        </button>
        <button
          onClick={() => setFilterType('overdue')}
          className={`px-4 py-2 rounded-full ${filterType === 'overdue' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'} mr-2`}
        >
          Quá hạn
        </button>
        <button
          onClick={() => setFilterType('new')}
          className={`px-4 py-2 rounded-full ${filterType === 'new' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
        >
          Mới
        </button>
      </div>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="w-1/6 py-3 px-4 uppercase font-semibold text-sm text-center">Đặt ngày</th>
              <th className="w-1/6 py-3 px-4 uppercase font-semibold text-sm text-center">Thời gian</th>
              <th className="w-1/6 py-3 px-4 uppercase font-semibold text-sm text-center">Số khách</th>
              <th className="w-1/6 py-3 px-4 uppercase font-semibold text-sm text-center">Trạng thái</th>
              <th className="w-1/6 py-3 px-4 uppercase font-semibold text-sm text-center">Hành động</th>
              <th className="w-1/6 py-3 px-4 uppercase font-semibold text-sm text-center">Chi tiết</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {filteredReservations.map((reservation, index) => {
              const reservationDate = new Date(reservation.bookingDate);
              const reservationTimeParts = reservation.bookingTime.split(':');
              const reservationHour = parseInt(reservationTimeParts[0], 10);
              const reservationMinute = parseInt(reservationTimeParts[1], 10);
              const reservationDateTime = new Date(reservationDate);
              reservationDateTime.setHours(reservationHour);
              reservationDateTime.setMinutes(reservationMinute);

              const canApprove = now < reservationDateTime;
              const canCancel = now < reservationDateTime && (reservationDateTime - now > 60 * 60 * 1000);

              return (
                <tr key={index} className="hover:bg-gray-200 transition duration-200">
                  <td className="w-1/6 py-3 px-4 text-center">{reservationDate.toLocaleDateString()}</td>
                  <td className="w-1/6 py-3 px-4 text-center">{reservation.bookingTime}</td>
                  <td className="w-1/6 py-3 px-4 text-center">{reservation.numberOfGuests}</td>
                  <td className={`w-1/6 py-3 px-4 text-center ${reservation.status === 'chưa xác nhận' ? 'text-red-500' : 'text-green-500'}`}>{reservation.status}</td>
                  <td className="py-3 text-center">
                    {reservation.status === 'chưa xác nhận' && canApprove ? (
                      <button onClick={() => handleApproveReservation(reservation._id)} className="bg-green-500 hover:bg-green-700 text-white py-2 px-2 rounded focus:outline-none focus:shadow-outline mr-2 border-2 border-transparent">Duyệt</button>
                    ) : null}
                    {canCancel ? (
                      <button onClick={() => handleCancelReservation(reservation._id)} className="bg-red-500 hover:bg-red-700 text-white py-2 px-2 rounded focus:outline-none focus:shadow-outline border-2 border-transparent">Huỷ đặt bàn</button>
                    ) : null}
                  </td>
                  <td className="w-1/6 py-3 px-4 text-center">
                    <button onClick={() => handleViewDetail(reservation._id)} className="text-blue-500 hover:text-blue-700 focus:outline-none">Xem chi tiết</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {approveConfirmation && approveConfirmationDialog}
      {cancelConfirmation && cancelConfirmationDialog}
      {detailModalOpen && detailModal}
    </div>
  );
};

export default DuyetPhieuDatBan;

