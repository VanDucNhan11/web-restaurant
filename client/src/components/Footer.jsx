// code header vaoo day

import React from 'react'

const Footer = () => {
  return (
    <div className="w-full h-48  bg-bg-header flex items-center justify-center ">
        <div>
          <img className='w-w-logo h-h-logo mr-10' src="https://madamelan.vn/storage/logo-favicon/full-logo-min-1.png" alt="" />
        </div>
        <div className="text-white">
            <h1 className="text-xl">Địa chỉ</h1>
            <h3>số 48 Cao Thắng, Quận Hải Châu, <br/>TP. Đà Nẵng</h3>
        </div>
        <div className="text-white ml-20">
            <h1 className="text-xl">Giờ mở cửa</h1>
            <h3>6:30 - 21:30<br/>Monday - Sunday</h3>
        </div>
        <div className="text-white ml-20">
            <h1 className="text-xl">Liên hệ</h1>
            <h3>vanducnhan1102@gmail.com<br/>0899885260</h3>
        </div>
        <div className="text-white ml-20 ">
            <h1 className="text-xl">Theo dõi</h1>
            <div className="flex">
              <a href="#" className="hover:bg-white rounded-full p-1">
                <img src="..\src\pages\img\iconzalo.png" alt/>
              </a>
              <a href="#" className="hover:bg-white rounded-full p-1">
                <img src="..\src\pages\img\inconfacebook.png" alt/>
              </a>
              <a href="#" className="hover:bg-white rounded-full p-1">
                <img src="..\src\pages\img\iconinstagram.png" alt/>
              </a>
            </div>
        </div>
    </div>
  )
}

export default Footer
