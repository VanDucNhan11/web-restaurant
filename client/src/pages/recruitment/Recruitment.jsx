import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link
import { useInView } from 'react-intersection-observer';
import '../recruitment/Recruitment.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';
import slide_image_1 from '../img/td-1.jpg';
import slide_image_2 from '../img/td-2.jpg';
import slide_image_3 from '../img/td-3.jpg';
import slide_image_4 from '../img/td-4.jpg';
import slide_image_5 from '../img/td-5.jpg';
import slide_image_6 from '../img/td-6.jpg';
import slide_image_7 from '../img/td-7.jpg';

const Recruitment = () => {
  const [jobs, setJobs] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [ref, inView] = useInView({ threshold: 0 });

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/recruitments');
        setJobs(response.data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobs();
  }, []);

  useEffect(() => {
    if (inView) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [inView]);

  return (
    <div>
      <div className="relative">
        <img className="w-full h-full" src="https://madamelan.vn/storage/tuyen-dung/tuyendung-pc-min.jpg" alt="" />
        <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center text-4xl md:text-6xl title-font">Tuyển dụng</h1>
        <div className="absolute mt-10 top-1/2 left-1/2 transform -translate-x-1/2 flex items-center text-white text-lg md:flex-row md:text-2xl font-light">
          <a href="/" className="mb-2 md:mb-0 md:mr-2">Trang chủ</a>
          <span className="md:mx-2">/</span>
          <span className="mb-2 md:mb-0 md:mr-2 ">Tuyển dụng</span>
        </div>
      </div>
      <div className="a-backround">
        <div className="mb-10 justify-center items-center md:mx-auto max-w-full md:max-w-3xl xl:max-w-6xl" style={{ width: "1110px" }}>
          <div className="">
            <div className="text-center title title-font md:text-4xl">Văn hóa & con người Madame Lân</div>
          </div>
          <div className="text-center font-light text-lg md:text-lg mt-4">
            <p>Tại Madame Lân, con người được xem là tài sản và là yếu tố tiên quyết cho sự thành công. Chúng tôi luôn chú trọng đầu tư vào đào tạo nghề nghiệp cho đội ngũ nhân sự, xây dựng các chương trình đào tạo đặc biệt cho từng nhóm nhân sự và coi đó là đầu tư quyết định sự phát triển bền vững của thương hiệu.</p>
            <p className="pt-3">Với văn hoá đề cao tinh thần gắn kết, học hỏi lẫn nhau, yêu thương và sẻ chia, tập thể đội ngũ Madame Lân luôn hướng tới những giá trị nhân văn và hành động vì nhân văn. Chúng tôi cùng nhau xây dựng một tập thể đoàn kết - một đại gia đình Madame Lân - nhằm hiện thực hoá tầm nhìn và sứ mệnh cũng như mang đến những giá trị tích cực cho cộng đồng và xã hội.</p>
          </div>
        </div>
        <div className="container justify-center items-center mx-auto">
          <Swiper
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={true}
            loop={true}
            slidesPerView={'auto'}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 100,
              modifier: 2.5,
            }}
            pagination={{ el: '.swiper-pagination', clickable: true }}
            navigation={{
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
              clickable: true,
            }}
            modules={[EffectCoverflow, Pagination, Navigation]}
            className="swiper_container"
          >
            <SwiperSlide>
              <img src={slide_image_1} alt="slide_image" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={slide_image_2} alt="slide_image" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={slide_image_3} alt="slide_image" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={slide_image_4} alt="slide_image" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={slide_image_5} alt="slide_image" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={slide_image_6} alt="slide_image" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={slide_image_7} alt="slide_image" />
            </SwiperSlide>

            <div className="slider-controler">
              <div className="swiper-button-prev slider-arrow">
                <ion-icon name="arrow-back-outline"></ion-icon>
              </div>
              <div className="swiper-button-next slider-arrow">
                <ion-icon name="arrow-forward-outline"></ion-icon>
              </div>
              <div className="swiper-pagination"></div>
            </div>
          </Swiper>
        </div>
      </div>
      <section ref={ref} className={`tin-tuc ${isVisible ? 'visible' : ''}`}>
        <div className="mx-auto items-center justify-center pb-10 md:w-2/3">
          <div className="title content-font-light text-center">Nhà hàng Madame Lân tuyển dụng các vị trí:</div>
          <div className="grid justify-items-center grid-cols-1 gap-y-10 sm:grid-cols-2 lg:grid-cols-2">
            {jobs.map((job) => (
              <div key={job._id} className="flex items-center mb-3">
                <div className="w-1/2 block pr-3 w-64 h-58">
                  <img src={`http://localhost:3000/${job.image}`} alt={job.title} />
                </div>
                <div className="w-1/2 float-left block">
                  <div className="gray content-font-light">Vị trí</div>
                  <div className="title-news content-font-light">{job.title}</div>
                  <div className="gray content-font-light">
                    <i className="fa fa-bookmark primary-color">
                      <ion-icon name="bookmark-outline"></ion-icon>
                    </i>
                    Toàn thời gian | Hạn nộp hồ sơ: từ ngày {new Date(job.applicationDeadlineStart).toLocaleDateString()} - {new Date(job.applicationDeadlineEnd).toLocaleDateString()}
                  </div>
                  <div className="gray content-font-light">
                    Thu nhập: {job.salary.toLocaleString()}đ/tháng
                  </div>
                  <Link to={`/tuyen-dung/${job._id}`} className="content-font-light primary-color">
                    Chi tiết công việc
                    <i className="ml-1">
                      <ion-icon name="arrow-forward-outline"></ion-icon>
                    </i>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Recruitment;
