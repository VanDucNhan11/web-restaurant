import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import { OAuth } from '../../components/OAuth';
const resister = () => {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  }
  // login
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.password || !formData.email) {
      return setErrorMessage("Hãy điền vào tất cả các trường");
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
        return setErrorMessage(data.message)
      }
      setLoading(false);
      if (res.ok) {
        navigate('/dang-nhap')
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
              <p className='text-4xl text-white'>Resister</p>
            </div>
            <form action="#" onSubmit={handleSubmit}>
              <div className="mb-6 text-lg">
                <input
                  onChange={handleChange}
                  className="rounded-lg p-2 md:w-96 w-80 border-none sedan-regular outline-none text-base"
                  type="text" id='username' placeholder="Username" />
              </div>
              <div className="mb-6 text-lg">
                <input
                  onChange={handleChange}
                  className="rounded-lg p-2 md:w-96 w-80 border-none sedan-regular outline-none text-base"
                  type="text" id='email' placeholder="Email" />
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
                  {
                    loading ? (
                      <>
                        <Stack
                          sx={
                            {
                              color: 'grey.500',
                              display: 'flex',
                              alignItems: 'center',
                            }
                          } direction="row">
                          <CircularProgress size={25} color="success" />
                          <span className='text-sm ml-1'>Loading...</span>
                        </Stack>
                      </>
                    ) : 'Resister'
                  }
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
                Already have an account?
                <Link
                  to={'/dang-nhap'}
                  className="ml-1 block sedan-regular text-sm font-bold leading-normal text-[#A82825] antialiased"
                >
                  Login here
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

  )
}

export default resister
