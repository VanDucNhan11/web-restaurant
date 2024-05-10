import React, { useState, useRef, useEffect } from 'react';

import { useInView } from 'react-intersection-observer';
import '../news/News.css';

const DetailNews = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [ref, inView] = useInView({ threshold: 0 });

  useEffect(() => {
    if (inView) {
      // Khi phần tử vào tầm nhìn, thiết lập isVisible thành true sau 1 giây
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [inView]);

  return (
    <div>
      <div className="relative">
        <img
          className="w-full"
          src="https://madamelan.vn/storage/img-2996-mdl-web-pc-tin-tuc-news-landing-page-vie-eng.jpg"
          alt=""
        />
        <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center text-6xl title-font">
          Tin Tức
        </h1>
        <div className="absolute mt-10 top-1/2 left-1/2 transform -translate-x-1/2 flex items-center text-white text-2xl font-light">
          <a href="/">Trang chủ</a>
          <span className="mx-2">/</span>
          <span>Tin tức</span>
        </div>
      </div>
      <section ref={ref} className={`tin-tuc ${isVisible ? 'visible' : ''}`}>
        <div className=" mx-auto  items-center justify-center md:w-3/4 pb-10 pt-10">
          <div className=" justify-items-center flex-wrap flex">
              <div className="col-md-9 w-4/5">
                <div class="flex items-center space-x-3 ">
                  <span class="date-view font-light mr-2 flex items-center">
                    <i class="fal"><ion-icon name="person-outline"></ion-icon></i>
                    <span class="ml-1">Super Admin</span>
                  </span>
                  |
                  <span class="date-view font-light flex items-center ">
                    <i class="fal"><ion-icon name="time-outline"></ion-icon></i>
                    <span class="ml-1 mr-2">06-05-2024</span>
                  </span>
                  |
                  <span class="date-view font-light mx-2 flex items-center">
                    <i class="fal mb-0"><ion-icon name="eye-outline"></ion-icon></i>  
                    <span class="ml-1">2282</span>
                  </span>
                </div>
                <div>
                  <div className="text-3xl mt-5 mb-5">
                    TOP 10 CÁC MÓN ĂN NGON ĐẶC SẢN ĐÀ NẴNG
                  </div>
                  <img src="https://madamelan.vn/storage/350950366-643849020964476-7010446790931598520-n.jpg" alt="" />
                  <div className="font-light font-size-content font-weight-bold py-3">
                    Du lịch Đà Nẵng nên ăn gì? Món ngon Đà Nẵng phải thử ở đâu? Nhà hàng nào có các món ngon đặc sản Đà Nẵng? Cùng tìm hiểu để chuyến đi thêm phần trọn vẹn nhé.
                  </div>
                  <div className="font-light font-size-content">
                    <p>Món ngon Đà Nẵng là điều khó có thể bỏ qua khi ghé thăm vùng đất xinh đẹp này. Mang đậm phong vị ẩm thực miền Trung nắng gió, ẩm thực xứ Đà mang nhiều đặc sắc của các vùng miền hội tụ.
                      <br/>
                      Du lịch Đà Nẵng nên ăn gì? Món ngon Đà Nẵng phải thử ở đâu? Nhà hàng nào có các món ngon đặc sản Đà Nẵng? Bạn không thể bỏ qua Nhà Hàng Madame Lân nằm bên bờ sông Hàn lộng gió, nơi có thể đón trọn view thành phố, lại sở hữu không gian rộng, thoáng mát và món ngon đặc sản ba miền. Chắc chắn rằng bạn sẽ có được trải nghiệm “tròn hương, đậm vị”.
                    </p>
                  </div>
                </div>
                <div className="categories font-light">
                    Danh mục
                    <span className="tag ml-4">Món ăn Madame Lân</span>
                </div>
                <div className="title title-font text-3xl pb-12 text-black">Bài viết liên quan</div>
                <div className="grid justify-items-center grid-cols-1 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
                  <div className="col-lg-4 col-md-4 col-12 mb-5 mr-6">
                      <a href="">
                        <img src="https://madamelan.vn/storage/tin-tuc/211121-mdl-bo-nuong-tang-sot-tieu-den-min.jpg" alt="" />
                        <div className="text-lg title-font pt-3">
                          BÒ NƯỚNG TẢNG SỐT TIÊU ĐEN – MỘT SẮC THÁI NỒNG ẤM
                        </div>
                      </a>
                  </div>
                  <div className="col-lg-4 col-md-4 col-12 mb-5 mr-6">
                      <a href="">
                        <img src="https://madamelan.vn/storage/tin-tuc/20211121-mdl-heo-nuong-kieu-tay-bac-final-min.jpg" alt="" />
                        <div className="text-lg title-font pt-3">
                          TRẢI NGHIỆM ẨM THỰC GIAO THOA VỚI HEO NƯỚNG KIỂU TÂY BẮC              
                        </div>
                      </a>
                  </div>
                </div>
              </div>
              <div className=" archive pl-10  lg:col-span-1">
                <label for className="title-font">- Lưu trữ</label>
                <ul className="text-red-800">
                  <li className="font-light font-size-content">
                    <a href="">
                      <span>Tháng 5, 2024 (1)</span> 
                    </a>
                  </li>
                  <li className="font-light font-size-content">
                    <a href="">
                      <span>Tháng 12, 2023 (1)</span> 
                    </a>
                  </li>
                  <li className="font-light font-size-content">
                    <a href="">
                      <span>Tháng 4, 2022 (4)</span> 
                    </a>
                  </li>
                  <li className="font-light font-size-content">
                    <a href="">
                      <span>Tháng 3, 2022 (4)</span> 
                    </a>
                  </li>
                  <li className="font-light font-size-content">
                    <a href="">
                      <span>Tháng 8, 2021 (3)</span> 
                    </a>
                  </li>
                  <li className="font-light font-size-content">
                    <a href="">
                      <span>Tháng 7, 2021 (2)</span> 
                    </a>
                  </li>
                </ul>
              </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default DetailNews
