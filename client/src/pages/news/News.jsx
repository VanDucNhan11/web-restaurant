// code  vaoo day

import React, { useState, useRef, useEffect } from 'react';

import { useInView } from 'react-intersection-observer';
import '../news/News.css';
import DetailNews from "./DetailNews"

const News = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [ref, inView] = useInView({ threshold: 0 });

  useEffect(() => {
    if (inView) {
      // Khi phần tử vào tầm nhìn, thiết lập isVisible thành true sau 1 giây
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 300);
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
      <section ref={ref} className={`tin-tuc ${isVisible ? 'visible' : ''}`} >
          <div className="mx-auto  items-center justify-center pb-10 md:w-2/3 pt-10"> 
            <div className="grid justify-items-center grid-cols-1 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 ">
                <a className="pin-item" href="">
                  <img src="https://madamelan.vn/storage/350950366-643849020964476-7010446790931598520-n.jpg" alt="" />
                  <div className="pin-title title-font pt-3">TOP 10 CÁC MÓN ĂN NGON ĐẶC SẢN ĐÀ NẴNG</div>
                  <div className="text-base text-gray-700 font-light pt-2">06-05-2024</div>
                  <div className="text-base text-gray-700 font-light pt-2">
                    <p>
                        Du lịch Đà Nẵng nên ăn gì? Món ngon Đà Nẵng phải thử ở đâu? Nhà hàng nào có các món ngon đặc sản Đà Nẵng? Cùng tìm hiểu để chuyến đi thêm phần trọn vẹn nhé.
                    </p>
                  </div>
                  <div className=" pb-3">
                      <span className="title-font text-red-800 font-size-contnet">
                          Chi tiết
                          <i className="ml-1 -pb-1"><ion-icon name="arrow-forward-outline"></ion-icon></i>
                      </span>
                  </div>
                </a>
                <a className="pin-item " href="">
                  <img src="https://madamelan.vn/storage/tin-tuc/20211121-mdl-heo-nuong-kieu-tay-bac-final-min.jpg" alt="" />
                  <div className="pin-title title-font pt-3">TRẢI NGHIỆM ẨM THỰC GIAO THOA VỚI HEO NƯỚNG KIỂU TÂY BẮC</div>
                  <div className="text-base text-gray-700 font-light pt-2">06-04-2022</div>
                  <div className="text-base text-gray-700 font-light pt-2">
                    <p>
                    Sự giao thoa giữa ẩm thực nước bạn với hương vị ẩm thực Tây Bắc dung dị, chất phác như chính con người miền sơn cước đã trở thành nguồn cảm hứng cho món Heo nướng kiểu Tây Bắc của Madame Lân – nhà hàng Đà Nẵng chuyên món ăn Việt.
                    </p>
                  </div>
                  <div className=" pb-3">
                      <span className="title-font text-red-800 font-size-contnet">
                          Chi tiết
                          <i className="ml-1 -pb-1"><ion-icon name="arrow-forward-outline"></ion-icon></i>
                      </span>
                  </div>
                </a>
                <a className="pin-item " href="">
                  <img src="https://madamelan.vn/storage/tin-tuc/4f163413862849761039.jpg" alt="" />
                  <div className="pin-title title-font pt-3">
                      THƯỞNG THỨC HƯƠNG VỊ BIỂN CẢ VỚI VẸM XÀO HÚNG DỪA
                  </div>
                  <div className="text-base text-gray-700 font-light pt-2">15-03-2022</div>
                  <div className="text-base text-gray-700 font-light pt-2">
                    <p>
                        Làm thế nào một hương vị mạnh mẽ như húng quế có thể hoà quyện với sự mềm mại, ngậy béo của dừa và tạo nên một hương vị đầy ấn tượng? Bạn sẽ có câu trả lời khi thưởng thức món Vẹm xào húng dừa của Madame Lân – nhà hàng Đà Nẵng bên bờ sông Hàn.
                    </p>
                  </div>
                  <div className=" pb-3">
                      <span className="title-font text-red-800 font-size-contnet">
                          Chi tiết
                          <i className="ml-1 -pb-1"><ion-icon name="arrow-forward-outline"></ion-icon></i>
                      </span>
                  </div>
                </a> 
                <a className="pin-item " href="">
                  <img src="https://madamelan.vn/storage/p1107778-1.jpg" alt="" />
                  <div className="pin-title title-font pt-3">
                      Triển lãm "Trong ngọc trắng ngà" tại Đà Nẵng với 35 kiệt tác, 14 danh họa Đông Dương
                  </div>
                  <div className="text-base text-gray-700 font-light pt-2">28-12-2023</div>
                  <div className="text-base text-gray-700 font-light pt-2">
                    <p>
                        Triển lãm nghệ thuật "Trong ngọc trắng ngà" khai mạc tại Đà Nẵng, mang đến không gian kết nối cộng đồng yêu nghệ thuật với 35 tác phẩm từ 14 danh họa Đông Dương.
                    </p>
                  </div>
                  <div className=" pb-3">
                      <span className="title-font text-red-800 font-size-contnet">
                          Chi tiết
                          <i className="ml-1 -pb-1"><ion-icon name="arrow-forward-outline"></ion-icon></i>
                      </span>
                  </div>
                </a>      
            </div>
          </div>
      </section>
    </div>
  );
};

export default News;