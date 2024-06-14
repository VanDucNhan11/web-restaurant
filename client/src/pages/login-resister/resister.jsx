import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import { OAuth } from '../../components/OAuth';

const Register = () => {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  }

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  }

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

  const validatePassword = (password) => {
    const re = /^(?=.*[A-Z]).{6,}$/;
    return re.test(password);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.password || !formData.email || !formData.confirmPassword) {
      return setErrorMessage("Hãy điền vào tất cả các trường");
    }
    if (!validateEmail(formData.email)) {
      return setErrorMessage("Email không hợp lệ");
    }
    if (!validatePassword(formData.password)) {
      return setErrorMessage("Mật khẩu phải có ít nhất 6 ký tự và bao gồm ít nhất một chữ cái viết hoa");
    }
    if (formData.password !== formData.confirmPassword) {
      return setErrorMessage("Mật khẩu và xác nhận mật khẩu không khớp");
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch('http://localhost:3000/api/v1/user/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success === false) {
        return setErrorMessage(data.message);
      }
      setLoading(false);
      if (res.ok) {
        navigate('/dang-nhap');
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  }

  return (
    <>
      <div className="flex h-screen w-full items-center justify-center bg-gray-900 bg-cover bg-no-repeat"
        style={{ backgroundImage: "url('https://madamelan.vn/storage/tin-tuc/dsc1687-mdl-pr-mdl-10-nam-fb-ig-min.jpg')" }}>
        <div className="rounded-lg bg-gray-800 bg-opacity-5 px-4 py-8 shadow-lg backdrop-blur-md max-sm:px-8">
          <div className="">
            <div className='flex justify-center items-center mb-8 sedan-regular'>
              <p className='text-4xl text-white'>Đăng ký</p>
            </div>
            <form action="#" onSubmit={handleSubmit}>
              <div className="mb-6 text-lg">
                <input
                  onChange={handleChange}
                  className="rounded-lg p-2 md:w-96 w-80 border-none sedan-regular outline-none text-base"
                  type="text" id='username' placeholder="Nhập họ và tên" />
              </div>
              <div className="mb-6 text-lg">
                <input
                  onChange={handleChange}
                  className="rounded-lg p-2 md:w-96 w-80 border-none sedan-regular outline-none text-base"
                  type="text" id='email' placeholder="Nhập Email" />
              </div>
              <div className="mb-4 text-lg relative">
                <input
                  onChange={handleChange}
                  className="rounded-lg p-2 md:w-96 w-80 border-none outline-none sedan-regular text-base"
                  type={showPassword ? "text" : "password"} id="password" placeholder="Nhập mật khẩu" />
                <button
                  type="button"
                  className="absolute right-3 top-3"
                  onClick={togglePasswordVisibility}>
                  {showPassword ? (
                    <ion-icon name="eye-off-outline"></ion-icon>
                  ) : (
                    <ion-icon name="eye-outline"></ion-icon>
                  )}
                </button>
              </div>
              <div className="mb-4 text-lg relative">
                <input
                  onChange={handleChange}
                  className="rounded-lg p-2 md:w-96 w-80 border-none outline-none sedan-regular text-base"
                  type={showConfirmPassword ? "text" : "password"} id="confirmPassword" placeholder="Xác nhận lại mật khẩu" />
                <button
                  type="button"
                  className="absolute right-3 top-3"
                  onClick={toggleConfirmPasswordVisibility}>
                  {showConfirmPassword ? (
                    <ion-icon name="eye-off-outline"></ion-icon>
                  ) : (
                    <ion-icon name="eye-outline"></ion-icon>
                  )}
                </button>
              </div>
              <div className="mt-8 flex justify-center">
                <button
                  type="submit"
                  className="rounded-lg bg-bg-header text-white px-6 py-2 text-xl sedan-regular ">
                  {
                    loading ? (
                      <>
                        <Stack
                          sx={{
                            color: 'grey.500',
                            display: 'flex',
                            alignItems: 'center',
                          }}
                          direction="row">
                          <CircularProgress size={25} color="success" />
                          <span className='text-sm ml-1'>Loading...</span>
                        </Stack>
                      </>
                    ) : 'Đăng ký'
                  }
                </button>
              </div>
              {
                errorMessage && (
                  <Stack
                    sx={{ marginTop: '8px' }}
                    spacing={2}>
                    <Alert severity="warning" style={{ wordBreak: 'break-word', maxWidth: '380px', whiteSpace: 'normal' }}>
                      {errorMessage}
                    </Alert>
                  </Stack>
                )
              }
              <p className="mt-6 flex justify-center text-white sedan-regular text-sm font-light leading-normal text-inherit antialiased">
               Bạn đã có tài khoản?
                <Link
                  to={'/dang-nhap'}
                  className="ml-1 block sedan-regular text-sm font-bold leading-normal text-[#A82825] antialiased"
                >
                  Đăng nhập ngay
                </Link>
              </p>
            </form>

            <div className="flex items-center justify-between mt-6">
              <div className="w-full h-[1px] bg-gray-300"></div>
              <span className="text-sm uppercase mx-6 text-gray-400">Or</span>
              <div className="w-full h-[1px] bg-gray-300"></div>
            </div>
            <OAuth />
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
