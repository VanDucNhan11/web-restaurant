
import { useState } from "react";
import * as React from "react";
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
const Header = () => {

  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const MenuBar = () => {
    return (
      <div className="flex flex-col md:flex-row items-center gap-3">
        <Link className="text-xl hover:underline sedan-regular p-4 md:text-white "
          to={'/ve-chung-toi'}>
          Về chúng tôi
        </Link>
        <Link to={"/thuc-don"}
          className="text-xl p-4 hover:underline sedan-regular md:text-white ">
          Thực đơn
        </Link>
        <Link className="text-xl p-4 hover:underline sedan-regular md:text-white "
          to={'/dat-cho'}>
          Đặt chỗ
        </Link>
        <Link className="text-xl p-4 hover:underline sedan-regular md:text-white "
          to={'/tin-tuc'}>
          Tin tức
        </Link>
        <Link className="text-xl p-4 hover:underline sedan-regular md:text-white "
          to={'/tuyen-dung'}>
          Tuyển dụng
        </Link>
      </div>
    )
  }
  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <div className=" bg-bg-header">
        <Link to={'/'}>
          <img className=' h-auto w-40 p-3' src="https://madamelan.vn/storage/logo-favicon/full-logo-min-1.png" alt="" /> 
        </Link>
      </div>
      <MenuBar />
    </Box>
  );

  return (
    <>
      <div className=' bg-bg-header'>
        <div className='max-w-6xl m-auto '>
          <div className='flex justify-between p-3'>
            <div>
              <Link to={'/'}>
                <img className='w-32 h-auto md:w-w-logo md:h-h-logo' src="https://madamelan.vn/storage/logo-favicon/full-logo-min-1.png" alt="" />
              </Link>
            </div>
            <div className="hidden md:flex">
              <MenuBar />
            </div>
            <div className="flex items-center gap-2">
              <Link to={'/dang-nhap'} >
                  <Button
                    size="small"
                    sx={{
                      color: 'white',
                      fontFamily:'sedan-regular'
                    }}>
                    Đăng nhập
                  </Button>
              </Link>
              <Link to={'/dang-ky'}>
                <Button
                  size="small"
                  sx={{
                    color: 'white',
                    fontFamily:'sedan-regular'
                  }}>
                  Đăng ký
                </Button>
              </Link>
              <div className="md:hidden">
                <Button onClick={toggleDrawer(true)}><MenuIcon /></Button>
                <Drawer open={open} onClose={toggleDrawer(false)}>
                  {DrawerList}
                </Drawer>
              </div>
            </div>
          </div>
        </div >
      </div>
    </>
  )
}

export default Header
