
import React from 'react'
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
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


      {/* <div className="relative">
        <img className="bg-cover bg-no-repeat w-full h-auto" src="https://madamelan.vn/themes/elegant/assets/images/green-glitter-textured.png" alt="" />
        <div className="absolute top-0 left-0 w-full pr-4 pl-4">
          <div className="breadcrumbs font-size-content content-font-light text-white pt-3 ml-32 text-xl">
            <a href="#" >Trang chủ</a>
            <span> / Về chúng tôi</span>
          </div>
          <div className="flex justify-center items-center ">
            <img src="..\src\pages\img\tamnhindinhmenh.png" alt="" className="max-w-full h-52" />
            <h3 className="absolute text-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mt-52 text font-size-content content-font-light text-white">Với tầm nhìn hướng tới một cộng đồng gắn kết và bền vững, nhà hàng Madame Lân ra đời <br />
              cùng sứ mệnh truyền cảm hứng bất tận về câu chuyện ẩm thực Việt Nam; đồng thời lan toả <br />
              giá trị nhân văn sâu sắc của văn hoá ẩm thực Việt qua những bữa ăn trọn vẹn hương vị <br />
              cùng khoảnh khắc của yêu thương và sẻ chia</h3>
          </div>
        </div>
      </div>
      <div>
        <img className="bg-cover bg-no-repeat w-full h-auto" src="https://madamelan.vn/themes/elegant/assets/images/hoa-van-about.png" alt="" />
      </div> */}
    </div>
  )
}

export default Home
