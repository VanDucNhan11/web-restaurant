import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signInError, signInStart, signInSuccess } from '../../redux/user/userSlide';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { OAuth } from '../../components/OAuth';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});
  const { loading, error: errorMessage } = useSelector(state => state.user);
  const [showPassword, setShowPassword] = useState(false);
  const [mode, setMode] = useState('login');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
    // Reset error and success messages when user types
    dispatch(signInError(''));
    setSuccessMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.password || !formData.email) {
      dispatch(signInError("Hãy điền vào tất cả các trường"));
      return;
    }
    try {
      dispatch(signInStart());
      const res = await fetch('http://localhost:3000/api/v1/user/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(signInError(data.message));
      } else {
        dispatch(signInSuccess(data));
        navigate('/');
      }
    } catch (error) {
      dispatch(signInError(error.message));
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleForgotPassword = () => {
    setMode('forgotPassword');
    dispatch(signInError(''));
    setSuccessMessage('');
  };

  const handleBackToLogin = () => {
    setMode('login');
    dispatch(signInError(''));
    setSuccessMessage('');
  };

  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email) {
      dispatch(signInError("Vui lòng nhập email của bạn để đặt lại mật khẩu."));
      return;
    }

    try {
      const res = await fetch('http://localhost:3000/api/v1/user/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: formData.email }),
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(signInError(data.message));
      } else {
        setMode('otp');
      }
    } catch (error) {
      dispatch(signInError(error.message));
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    if (!formData.otp) {
      dispatch(signInError("Vui lòng nhập mã OTP để xác nhận."));
      return;
    }

    try {
      const res = await fetch('http://localhost:3000/api/v1/user/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          otp: formData.otp,
        }),
      });

      const data = await res.json();
      if (res.status !== 200) {
        dispatch(signInError(data.message));
      } else {
        setMode('newPassword');
      }
    } catch (error) {
      dispatch(signInError(error.message));
    }
  };

  const handleNewPasswordSubmit = async (e) => {
    e.preventDefault();
    if (!formData.newPassword) {
      dispatch(signInError("Vui lòng nhập mật khẩu mới."));
      return;
    }

    try {
      const res = await fetch('http://localhost:3000/api/v1/user/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          otp: formData.otp,
          newPassword: formData.newPassword,
        }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        dispatch(signInError(errorText));
      } else {
        const data = await res.json();
        setSuccessMessage("Đặt lại mật khẩu thành công.<br>Bạn có thể đăng nhập ngay bây giờ.");
        setMode('login'); 
      }
    } catch (error) {
      dispatch(signInError(error.message));
    }
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-900 bg-cover bg-no-repeat"
      style={{ backgroundImage: "url('https://madamelan.vn/storage/tin-tuc/dsc1687-mdl-pr-mdl-10-nam-fb-ig-min.jpg')" }}>
      <div className="rounded-lg bg-gray-800 bg-opacity-5 px-4 py-8 backdrop-blur-md ">
        <div className="">
          <div className='flex justify-center items-center mb-8 sedan-regular'>
            <p className='text-4xl text-white'>
              {mode === 'login' ? 'Đăng nhập' : mode === 'forgotPassword' ? 'Quên mật khẩu' : mode === 'otp' ? 'Xác nhận OTP' : 'Đặt lại mật khẩu'}
            </p>
          </div>
          <form action="#" onSubmit={mode === 'login' ? handleSubmit : mode === 'forgotPassword' ? handleForgotPasswordSubmit : mode === 'otp' ? handleOtpSubmit : handleNewPasswordSubmit}>
            {(mode === 'login' || mode === 'forgotPassword') && (
              <div className="mb-6 text-lg">
                <input
                  onChange={handleChange}
                  className="rounded-lg p-2 md:w-96 w-80 border-none outline-none sedan-regular text-base"
                  type="email" id="email" placeholder="Nhập Email" />
              </div>
            )}
            {mode === 'otp' && (
              <div className="mb-6 text-lg">
                <input
                  onChange={handleChange}
                  className="rounded-lg p-2 md:w-96 w-80 border-none outline-none sedan-regular text-base"
                  type="text" id="otp" placeholder="Nhập mã OTP" />
              </div>
            )}
            {mode === 'newPassword' && (
              <div className="mb-4 text-lg relative">
                <input
                  onChange={handleChange}
                  className="rounded-lg p-2 md:w-96 w-80 border-none outline-none sedan-regular text-base"
                  type={showPassword ? "text" : "password"} id="newPassword" placeholder="Nhập mật khẩu mới" />
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
            )}
            {mode === 'login' && (
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
            )}
            <div className="mt-8 flex justify-center">
              <button
                type="submit"
                className="rounded-lg bg-bg-header text-white px-6 py-2 text-xl sedan-regular ">
                {mode === 'login' ? 'Đăng nhập' : mode === 'forgotPassword' ? 'Gửi Email' : mode === 'otp' ? 'Xác nhận OTP' : 'Đặt lại mật khẩu'}
              </button>
            </div>
            {
              errorMessage && (
                <Stack
                  sx={{ marginTop: '8px', maxWidth: '80vw' }} // Adjust the width to prevent UI breaking
                  spacing={2}>
                  <Alert severity="warning">
                    {errorMessage}
                  </Alert>
                </Stack>
              )
            }
            {
              successMessage && (
                <Stack
                  sx={{ marginTop: '8px', maxWidth: '80vw' }} // Adjust the width to prevent UI breaking
                  spacing={2}>
                  <Alert severity="success" style={{ wordWrap: 'break-word' }}>
                    <span dangerouslySetInnerHTML={{ __html: successMessage }} />
                  </Alert>
                </Stack>
              )
            }
            {mode === 'login' &&
              <p className="mt-6 flex justify-center text-white sedan-regular text-sm font-light leading-normal text-inherit antialiased">
                Bạn chưa có tài khoản?
                <Link
                  to={'/dang-ky'}
                  className="ml-1 block sedan-regular text-sm font-bold leading-normal text-[#A82825] antialiased"
                >
                  Đăng ký ngay
                </Link>
              </p>
            }
            {mode !== 'login' &&
              <p className="mt-6 flex justify-center text-white sedan-regular text-sm font-light leading-normal text-inherit antialiased">
                <span onClick={handleBackToLogin} className="cursor-pointer underline">Quay lại đăng nhập</span>
              </p>
            }
            {mode === 'login' &&
              <p
                onClick={handleForgotPassword}
                className="mt-2 flex justify-center text-white sedan-regular text-sm font-light leading-normal text-inherit antialiased cursor-pointer">
                Quên mật khẩu?
              </p>
            }
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
  );
}

export default Login;
