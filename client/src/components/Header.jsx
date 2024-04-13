
import * as React from "react";
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
const Header = () => {

  return (
    <>
      <div className='border-b bg-bg-header'>
        <div className='max-w-6xl m-auto '>
          <div className='flex justify-between pt-3 pb-3'>
            <div>
              <img className='w-w-logo h-h-logo' src="https://madamelan.vn/storage/logo-favicon/full-logo-min-1.png" alt="" />
            </div>
            <div className="flex items-center gap-3">
              <Link className="text-lg p-4 text-white "
                to={'/'}>
                Về chúng tôi
              </Link>
              <Link className="text-lg p-4 text-white"
                to={'/thuc-don'}>
                Thực đơn
              </Link>
              <Link className="text-lg p-4 text-white "
                to={'/dat-cho'}>
                Đặt chỗ
              </Link>
              <Link className="text-lg p-4 text-white "
                to={'/tin-tuc'}>
                Tin tức
              </Link>
              <Link className="text-lg p-4 text-white "
                to={'/tuyen-dung'}>
                Tuyển dụng
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <Button sx={{
                color: 'white'
              }}>
                Đăng nhập
              </Button>
              <Button sx={{
                color: 'white'
              }}>
                Đăng ký
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Header
