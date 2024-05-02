
import React from 'react'
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import  './home.css';
const Home = () => {
  return (
    <div className="">
      <div>
        <img className='w-full' src="..\src\pages\img\vechungtoi.jpg" alt="" />
      </div>
      <div className='relative'>
        <img className="bg-cover h-[488px] w-full"
          src="https://madamelan.vn/themes/elegant/assets/images/green-glitter-textured.png" alt="" />
        <div className='absolute bottom-20'>
          <img className='w-[260px] h-auto md:w-[420px] md:h-auto'
            src="https://madamelan.vn/themes/elegant/assets/images/left-min.png" alt="" />
        </div>
        <div className='absolute bottom-20 right-0'>
          <img className=' w-[300px] h-auto md:w-[420px] md:h-auto' src="https://madamelan.vn/themes/elegant/assets/images/right-min.png" alt="" />
        </div>
        <div className='absolute top-0 md:left-[196px] p-3 md:pt-4 text-white'>
          <Breadcrumbs color='white' aria-label="breadcrumb">
            <Link underline="hover" className=' cursor-pointer' fontSize={17} color="white" top={'/'}>
              Trang chủ
            </Link>
            <Link
              fontSize={17}
              underline="hover"
              color="white"
              top={'/'}
              className=' cursor-pointer'
            >
              Về chúng tôi
            </Link>
          </Breadcrumbs>
        </div>
        <div className='absolute top-0 w-full h-full flex flex-col items-center justify-center'>
          <img className='md:w-[200px] w-44 h-44 md:h-[200px]' src="https://madamelan.vn/storage/ve-chung-toi/tam-nhin-su-menh.png" alt="" />
          <div className='px-3 py-10 '>
            <p className='text-lg text-white text-center md:w-[740px] w-'>Với tầm nhìn hướng tới một cộng đồng gắn kết và bền vững, nhà hàng Madame Lân ra đời cùng sứ mệnh truyền cảm hứng bất tận về câu chuyện ẩm thực Việt Nam; đồng thời lan toả giá trị nhân văn sâu sắc của văn hoá ẩm thực Việt qua những bữa ăn trọn vẹn hương vị cùng khoảnh khắc của yêu thương và sẻ chia</p>
          </div>
        </div>
      </div>
      <div className="relative overflow-hidden">
          <img className="bg-cover bg-no-repeat w-full h-auto" src="https://madamelan.vn/themes/elegant/assets/images/hoa-van-about.png" alt="" />
          <div className="absolute top-20 left-52 flex">
            <img className="h-96 " src="https://madamelan.vn/storage/ve-chung-toi/tuong-madamelan-min.png" alt="" />
            <div className="ml-10 title font-size-title title-font primary-color  text-left -mt-12 ">
                <div>
                  <p>
                    <span className="font-bold text-3xl text-red-600">Câu chuyện thương hiệu</span>
                  </p>
                </div>
                <div className=" mt-3 ">
                    <p>Madame Lân là một người phụ nữ bình dị như bao người phụ nữ Việt Nam <br/> khác. Mẹ Lân đã nuôi sáu người con khôn lớn trưởng thành bằng mớ rau <br/> tươi hái từ vườn, những con cá tươi rói, những con tôm nhảy tanh tách trong <br/> chiếc rá được trải lá tre xanh ngắt. Những nguyên liệu và gia vị trong vườn nhà <br/> được chế biến thành biết bao món ăn trọn vẹn hương vị, đầy ắp yêu thương <br/> bằng niềm say mê ẩm thực Việt Nam được truyền lại từ bao thế hệ. Bữa cơm <br/> nhà mẹ Lân cứ thế rộn rã tiếng cười trong sự đầm ấm cùng hương vị không thể <br/> nào quên.</p>
                    <p className='pt-1 '>Ký ức về những món ăn và khoảnh khắc sum vầy đó đã trở thành nguồn cảm <br/> hứng cho sự ra đời của thương hiệu Nhà hàng Madame Lân. Với mong muốn <br/> lan toả giá trị nhân văn sâu sắc của văn hoá ẩm thực Việt Nam, Madame Lân <br/> tin rằng, sự trọn vẹn trong trải nghiệm ẩm thực có sức mạnh kết nối con người. <br/> Trọn vẹn là khi câu chuyện ẩm thực Việt được người đầu bếp kể lại bằng ngôn <br/> ngữ tươi mới trong từng món ăn; là sự chăm sóc ân cần và năng lượng tích cực <br/> được truyền tải từ những người phục vụ; là những giây phút quây quần bên <br/> nhau trong không gian ấm cúng, thân mật. Khi những sắc thái đó hội tụ cũng <br/> chính là lúc trải nghiệm ẩm thực thăng hoa. Và hành trình viết nên những câu <br/> chuyện về ẩm thực Việt của Madame Lân đã bắt đầu…</p>
                </div>
            </div>    
          </div>
      </div>
      <div className="relative pt-10 pb-10 bg-gray-600 text-center text-white">
          <div className="text-center py-4 text-3xl font-VLCAMILA">Triết lý thương hiệu</div>
          <div>
              <p>
                Madame Lân mang đến trải nghiệm ẩm thực bằng triết lý và niềm tin về tính "
                <strong>Trọn Vẹn</strong>
                "
              </p>
              <p>
                Tinh hoa văn hoá ẩm thực Việt Nam mang nhiều dấu ấn độc đáo, phản ánh đời sống tinh thần cũng như quan niệm sống nhân văn của <br/> người Việt từ bao thế hệ đã trở thành nguồn cảm hứng cho triết lý về tính ""
                <strong>Trọn Vẹn</strong>
                " trong trải nghiệm ẩm thực của Madame Lân
              </p>   
          </div>
          <div className="pt-3 container mx-auto flex justify-center text-left">
              <div className="row justify-center pl-2 " >
                <div className="pt-3  mb-10">
                  <img style={{ height: "350px", width: "350px" }} src="https://madamelan.vn/storage/222309-mdl-am-thuc-web.jpg" />
                  <div className="content font-size-content text-white">Ẩm thực</div>
                  <div>
                    <p>
                        Ẩm thực Việt Nam mang tính kế thừa và tiếp biến  trong tiến trình lịch sử của văn hoá, do đó trải nghiệm ẩm thực "
                        <strong>Trọn Vẹn</strong>
                        " là sáng tạo trong chế biến nhưng vẫn tôn trọng những nguyên lý đã được đúc kết ngàn đời nhằm lưu giữ hương vị truyền thống
                    </p>
                  </div>
                </div>
              </div>
              <div className="pt-3">
                <div>
                  <img style={{ height: "350px", width: "350px" }} src="https://madamelan.vn/storage/222309-mdl-con-nguoi-2-web.jpg" alt="" />
                  <div className="content font-size-content text-white">Con người</div>
                  <div>
                    <p>
                        Tính "
                        <strong>Trọn Vẹn</strong>
                        " đến từ sự chu đáo và tận tình của người đầu bếp, người phục vụ; là dòng chảy năng lượng được tạo ra từ lòng đam mê và nhiệt huyết của những con người Madame Lân
                    </p>
                  </div>
                </div>
              </div>
              <div className="pt-3">
                <div>
                  <img style={{ height: "350px", width: "350px" }} src="https://madamelan.vn/storage/222309-mdl-khong-gian-web.jpg" alt="" />
                  <div className="content font-size-content text-white">Không gian</div>
                  <div>
                    <p>
                        Với kiến trúc mang nét giao thoa tinh tế giữa xưa và nay cùng không gian chan hoà thiên nhiên, Madame Lân mang đến ý niệm về tính "
                        <strong>Trọn Vẹn</strong>
                        " từ bầu không khí ấm áp và gần gũi, khơi gợi những xúc cảm gắn kết và sẻ chia trong từng khoảnh khắc
                    </p>
                  </div>
                </div>
              </div>
          </div>  
      </div>
    </div>
    
  )
  
}


export default Home
