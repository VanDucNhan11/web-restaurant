// code  vaoo day
import React from 'react'

const Home = () => {
  return (
    <div className="w-full">
      <div>
        <img className='w-full' src="..\src\pages\img\vechungtoi.jpg" alt="" />
      </div>
      <div className="relative">
        <img className="bg-cover bg-no-repeat w-full h-auto" src="https://madamelan.vn/themes/elegant/assets/images/green-glitter-textured.png" alt="" />
        <div className="absolute top-0 left-0 w-full pr-4 pl-4">
            <div className="breadcrumbs font-size-content content-font-light text-white pt-3 ml-32 text-xl">
                <a href="#" >Trang chủ</a>
                <span> / Về chúng tôi</span>
            </div>
            <div className="flex justify-center items-center ">
                <img src="..\src\pages\img\tamnhindinhmenh.png" alt="" className="max-w-full h-52" />
                <h3 className="absolute text-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mt-52 text font-size-content content-font-light text-white">Với tầm nhìn hướng tới một cộng đồng gắn kết và bền vững, nhà hàng Madame Lân ra đời <br/>
                cùng sứ mệnh truyền cảm hứng bất tận về câu chuyện ẩm thực Việt Nam; đồng thời lan toả <br/>
                giá trị nhân văn sâu sắc của văn hoá ẩm thực Việt qua những bữa ăn trọn vẹn hương vị <br/>
                cùng khoảnh khắc của yêu thương và sẻ chia</h3>
            </div>
        </div>
      </div> 
      <div>
        <img className="bg-cover bg-no-repeat w-full h-auto" src="https://madamelan.vn/themes/elegant/assets/images/hoa-van-about.png" alt="" />
      </div> 
    </div>
  )
}

export default Home
