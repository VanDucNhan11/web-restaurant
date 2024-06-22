import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const Success = () => {
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Success component mounted');

    const saveReservationToDatabase = async () => {
      try {
        // Check if a save operation is already in progress
        if (localStorage.getItem('isSavingReservation') === 'true') {
          console.warn('A reservation is already being saved.');
          return;
        }
    
        // Set the flag to indicate that a save operation is in progress
        localStorage.setItem('isSavingReservation', 'true');
    
        const reservationData = JSON.parse(localStorage.getItem('reservationData'));
        if (!reservationData) {
          console.error('No reservation data found in localStorage');
          // Reset the flag as no valid data is found to save
          localStorage.removeItem('isSavingReservation');
          return;
        }
    
        console.log('Reservation Data:', reservationData);
    
        const response = await fetch(`http://localhost:3000/api/v1/reservations`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(reservationData),
        });
    
        if (!response.ok) {
          throw new Error('Failed to save reservation to database');
        }
    
        const result = await response.json();
        console.log('Reservation saved successfully:', result);
    
        // Set a flag in localStorage to indicate that the reservation has been saved
        localStorage.setItem('reservationSaved', 'true');
        
        // Remove the reservationData from localStorage after successful save
        localStorage.removeItem('reservationData');
      } catch (error) {
        console.error('Error saving reservation:', error);
        // Handle errors when saving the reservation
      } finally {
        // Reset the flag regardless of success or failure
        localStorage.removeItem('isSavingReservation');
      }
    };
    
    saveReservationToDatabase();

    setTimeout(() => {
      navigate('/');
    }, 3000);
  }, [navigate]);

  return (
    <div className="success-page flex flex-col items-center justify-center min-h-screen ">
      <FontAwesomeIcon icon={faCheckCircle} size="6x" className="text-black mb-8" />
      <h1 className="text-4xl text-center text-black mt-4">Đặt chỗ thành công</h1>
      <p className="text-center text-black mt-4">Bạn sẽ được chuyển hướng về trang chủ sau vài giây.</p>
    </div>
  );
};

export default Success;
