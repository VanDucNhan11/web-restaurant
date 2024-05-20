import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { signInError, signInStart, signInSuccess } from '../../redux/user/userSlide'
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { OAuth } from '../../components/OAuth';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});
  const { loading, error: errorMessage } = useSelector(state => state.user)


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.password || !formData.email) {
      dispatch(signInError("Hãy điền vào tất cả các trường"));
    }
    try {
      dispatch(signInStart());
      const res = await fetch('http://localhost:3000/api/v1/user/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInError(data.message));
      }
      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate('/')
      }
    }
    catch (error) {
      dispatch(signInError(error.message));
    }
  }

  return (
    <>
      <div className="flex h-screen w-full items-center justify-center bg-gray-900 bg-cover bg-no-repeat"
        style={{ backgroundImage: "url('https://madamelan.vn/storage/tin-tuc/dsc1687-mdl-pr-mdl-10-nam-fb-ig-min.jpg')" }}>

        <div className="rounded-lg bg-gray-800 bg-opacity-5 px-4 py-8 backdrop-blur-md ">
          <div className="">
            <div className='flex justify-center items-center mb-8 sedan-regular'>
              <p className='text-4xl text-white'>LOGIN</p>
            </div>
            <form action="#" onSubmit={handleSubmit}>
              <div className="mb-6 text-lg">
                <input
                  onChange={handleChange}
                  className="rounded-lg p-2 md:w-96 w-80 border-none outline-none sedan-regular text-base"
                  type="text" id="email" placeholder="Email" />
              </div>
              <div className="mb-4 text-lg">
                <input
                  onChange={handleChange}
                  className="rounded-lg p-2 md:w-96 w-80 border-none outline-none sedan-regular text-base"
                  type="Password" id="password" placeholder="Password" />
              </div>
              <div className="mt-8 flex justify-center">
                <button
                  type="submit"
                  className="rounded-lg bg-bg-header text-white px-6 py-2 text-xl sedan-regular ">
                  Login
                </button>
              </div>
              {
                errorMessage && (
                  <Stack
                    sx={{ marginTop: '8px' }}
                    spacing={2}>
                    <Alert severity="warning">
                      {errorMessage}
                    </Alert>
                  </Stack>
                )
              }
              <p className="mt-6 flex justify-center text-white sedan-regular text-sm font-light leading-normal text-inherit antialiased">
                Don't have an account?
                <Link
                  to={'/dang-ky'}
                  className="ml-1 block sedan-regular text-sm font-bold leading-normal text-[#A82825] antialiased"
                >
                  Sign up
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

export default Login;