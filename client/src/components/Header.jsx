import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import { useSelector, useDispatch } from "react-redux"; // Import useDispatch
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
// Đảm bảo đường dẫn đúng
import { logoutUser } from "../redux/user/userSlide";

const Header = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const { currentUser } = useSelector(state => state.user);
  const dispatch = useDispatch(); // Sử dụng useDispatch để lấy dispatch function
  const navigate = useNavigate(); // Sử dụng useNavigate để điều hướng

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logoutUser()); // Dispatch action logout
    handleClose();
    navigate('/'); // Điều hướng đến trang chủ hoặc trang đăng nhập
  };

  const toggleDrawer = (newOpen) => () => {
    setOpenDrawer(newOpen);
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
    );
  };

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
            <div className=" flex items-center">
              {
                currentUser ? (
                  <div>
                    <Button
                      id="basic-button"
                      aria-controls={open ? 'basic-menu' : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? 'true' : undefined}
                      onClick={handleClick}
                    >
                      <Avatar
                        alt={currentUser.username}
                        src={currentUser.profilePicture}
                      />
                    </Button>
                    <span className="text-white">{currentUser.username}</span>
                    <Menu
                      id="basic-menu"
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      MenuListProps={{
                        'aria-labelledby': 'basic-button',
                      }}
                    >
                      {
                        currentUser.role === 'Khách hàng' ? (
                          <>
                            <MenuItem
                              onClick={handleClose}>
                              <Link to={'/profile'}>
                                Thông tin cá nhân
                              </Link>
                            </MenuItem>
                            <MenuItem
                              onClick={handleClose}>
                              <Link to={'/historyss'}>
                                Lịch sử đặt bàn
                              </Link>
                            </MenuItem>
                          </>
                        ) : (
                          <MenuItem
                            onClick={handleClose}>
                            <Link to={'/dashboard'}>
                              Bảng điều khiển
                            </Link>
                          </MenuItem>
                        )
                      }
                      <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem> {/* Gọi handleLogout khi MenuItem được nhấp */}
                    </Menu>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Link to={'/dang-nhap'} >
                      <Button
                        size="small"
                        sx={{
                          color: 'white',
                          fontFamily: 'sedan-regular'
                        }}>
                        Đăng nhập
                      </Button>
                    </Link>
                    <Link to={'/dang-ky'}>
                    </Link>
                  </div>
                )
              }

              <div className="md:hidden">
                <Button onClick={toggleDrawer(true)}><MenuIcon /></Button>
                <Drawer open={openDrawer} onClose={toggleDrawer(false)}>
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

export default Header;
