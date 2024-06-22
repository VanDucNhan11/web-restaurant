import React from 'react';

const Footer = () => {
  return (
    <div className="w-full h-auto lg:h-48 bg-bg-header flex flex-wrap lg:items-center justify-center p-5 lg:p-0">
      <div className="mb-5 lg:mb-0">
        <img className='mr-10' src="https://madamelan.vn/storage/logo-favicon/logo.png" alt="" />
      </div>
      <div className="text-white mb-5 lg:mb-0 lg:ml-20 pr-5 " style={{ fontFamily: "VLCAMILA" }}>
        <h1 className="text-xl">Địa chỉ</h1>
        <h3>Số 04 Bạch Đằng, Phường<br /> Quận Hải Châu, TP. Đà Nẵng</h3>
      </div>
      <div className="text-white mb-5 lg:mb-0 lg:ml-20 " style={{ fontFamily: "VLCAMILA" }}>
        <h1 className="text-xl">Giờ mở cửa</h1>
        <h3>6:30 - 21:30<br />Monday - Sunday</h3>
      </div>
      <div className="flex flex-col  text-white mb-5 lg:mb-0 lg:ml-20" style={{ fontFamily: "VLCAMILA" }}>
        <h1 className="text-xl">Liên hệ</h1>
        <h3>madamelann@gmail.com<br />0899885260</h3>
      </div>
      <div className="flex flex-col items-center justify-center text-white mb-5 lg:mb-0 lg:ml-20" style={{ fontFamily: "VLCAMILA" }}>
        <h1 className="text-xl">Theo dõi</h1>
        <div className="flex mt-2">
          <a href="#" target="_blank" className="hover:bg-white rounded-full p-1 mr-2">
            <img src="..\src\pages\img\iconzalo.png" alt="Zalo" />
          </a>
          <a href="https://www.facebook.com/madamelan" target="_blank" className="hover:bg-white rounded-full p-1 mr-2">
            <img src="..\src\pages\img\inconfacebook.png" alt="Facebook" />
          </a>
          <a href="https://www.instagram.com/madame.lan.restaurant?fbclid=IwZXh0bgNhZW0CMTAAAR0DHNNLyN_53zt8pUyFhiIoOtkZKoq_PtEeNy9GtNZ_e4fw-VbLGXQGFiA_aem_ZmFrZWR1bW15MTZieXRlcw"  target="_blank" className="hover:bg-white rounded-full p-1">
            <img src="..\src\pages\img\iconinstagram.png" alt="Instagram" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
