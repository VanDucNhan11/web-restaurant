import React from 'react';
import { useParams } from 'react-router-dom';

const PaymentDetail = () => {
  const { qrCodeUrl } = useParams();

  return (
    <div className="payment-detail flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl text-center mt-20">Thanh Toán</h1>
      <div className="mt-10">
        <p className="text-center mb-5">Vui lòng quét mã QR để thanh toán</p>
        <img src={decodeURIComponent(qrCodeUrl)} alt="VNPAY QR Code" />
      </div>
    </div>
  );
};

export default PaymentDetail;
