
import React from 'react'
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import  './home.css';
const Home = () => {
  return (
    <div className="">
      <section className="w-ful relative block">
        <img src="https://madamelan.vn/storage/trang-chu/home-vi-min.jpg" alt="" className="w-full h-auto" />
      </section>
      <section className="loi-ngo pt-5 md:py-10 lg:py-20 ">
        <div className="container  mx-auto flex flex-col md:flex-row items-center justify-center md:px-6 lg:px-16">
            <div className="  flex justify-center items-center md:mx-auto max-w-full md:max-w-3xl xl:max-w-6xl">
              <img className="custom-size" src="https://madamelan.vn/storage/trang-chu/loingo-min.png" alt="" />
              <div className="md:ml-10 md:w-1/2 lg:w-2/3 xl:w-3/4 md:text-left md:-mt-12">
                  <div className="text-center md:text-left mb-6"> 
                    <p>
                      <span className="text-xl md:text-4xl text-red-600 title-font title">Vị ngon</span>
                      <span className="texl-xl md:text-4xl text-gray-600 title-font title">, trọn khoảnh khắc</span>
                    </p>
                  </div>
                  <div className="  font-light  text-base md:text-xl ">
                      <p>Ra đời vào năm 2012, Nhà hàng Madame Lân là chốn dừng chân của trải nghiệm ẩm thực trọn vẹn bên bờ sông Hàn - trái tim giữa lòng thành phố xinh đẹp Đà Nẵng.</p>
                      <p className='pt-2 md:pt-5'>Được ấp ủ bởi những con người yêu và trân trọng nét tinh tế trong ẩm thực Việt Nam, Madame Lân tái hiện bầu không khí đầm ấm của những bữa ăn Việt - nơi mọi câu chuyện khởi đầu bên vô vàn sắc thái của hương vị trong không gian kết nối thiên nhiên. Với thực đơn hàng trăm món ăn từ khắp các vùng miền trên dải đất hình chữ S, Madame Lân mong muốn tiếp nối dòng chảy của ẩm thực Việt bằng những hương vị mang giá trị truyền thống hòa quyện cùng phong vị hiện đại.</p>
                      <p className='pt-2 md:pt-5'>Cùng nhau, chúng ta tạo nên những khoảnh khắc trọn vẹn và đáng nhớ!</p>
                  </div>
                  <a href="/ve-chung-toi">
                    <button className="mdl-button btn btn-primary">Xem thêm</button>
                  </a>
                  <img className="mt-2 phoco w-20" src="https://madamelan.vn/themes/elegant/assets/images/lang-co.png" alt="" />
              </div>    
            </div>
        </div>
      </section>
      <section className="menu mt-5 px-3 parallax ">
        <div className="m-auto flex justify-center items-center">
          <a className="ml-36" href="/dat-cho">
            <button className="bon btn btn-primary">Đặt bàn</button>
          </a>
          <div className="seperator mx-52"></div>
          <a className="mr-36" href="/thuc-don">
            <button className="bon btn btn-primary ">Thực đơn</button>
          </a>
        </div>
      </section>
      <section className="a-backround pt-lg-5 px-lg-0 px-3 ">
          <div className="container py-5">
            <div className="justify-center items-center md:mx-auto max-w-full md:max-w-3xl xl:max-w-6xl">
              <div className="v" >
                <iframe width="1140" height="641" src="https://www.youtube.com/embed/_AXdL7WCdWg?si=2KmlNd5Kpk_Ck_Mf" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
              </div>
            </div>
          </div>
      </section>
      <section className="khang-dinh-chat-luong mb-10">
        <div className="container py-5">
          <div className="flex flex-col items-center justify-center">
            <div className="flex justify-between items-start w-full max-w-6xl">
              <div className="van-ban w-1/2">
                <div className="title text-gray-600 title-font font-size-title title-color ">
                  Khẳng định về chất lượng sản phẩm và dịch vụ
                </div>
                <div className="font-light text-xl">
                  <p>
                    Bằng tất cả sự yêu mến và ủng hộ của du khách từ khắp mọi nơi, Nhà hàng Madame Lân đã vinh dự lọt top bình chọn Travelers' Choice 2023 của chuyên trang TripAdvisor và Top 80 Nhà hàng tại Việt Nam – Giải thưởng TOP80 Asia Award năm 2020. Đây chính là sự ghi nhận và nguồn động viên lớn lao dành cho đội ngũ Madame Lân nhằm tiếp tục nỗ lực mang những giá trị trọn vẹn của trải nghiệm ẩm thực Việt Nam tới các thực khách trong và ngoài nước.
                  </p>
                </div>
              </div>
              <div className="thuong-hieu w-1/2 flex justify-end pl-20 pt-40">
                <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 lg:grid-cols-2">
                  <div className="col-span-1 col-6">
                    <img src="https://madamelan.vn/storage/trang-chu/2020-travel-choice-min.png" alt="Travelers' Choice 2023" />
                  </div>
                  <div className="col-span-1 col-6 ml-5">
                    <img src="https://madamelan.vn/storage/trang-chu/top-80-min.png" alt="Top 80 Nhà hàng tại Việt Nam" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  ) 
}


export default Home
