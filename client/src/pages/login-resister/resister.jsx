import React from 'react'
import { Link } from 'react-router-dom';

const resister = () => {
  return (
    <>
      <div className="flex h-screen w-full items-center justify-center bg-gray-900 bg-cover bg-no-repeat" 
      style={{backgroundImage: "url('https://madamelan.vn/storage/tin-tuc/dsc1687-mdl-pr-mdl-10-nam-fb-ig-min.jpg')"}}>
        <div className="rounded-lg bg-gray-800 bg-opacity-5 px-4 py-8 shadow-lg backdrop-blur-md max-sm:px-8">
          <div className="">
            <div className='flex justify-center items-center mb-8 sedan-regular'>
              <p className='text-4xl text-white'>Resister</p>
            </div>
            <form action="#">
            <div className="mb-6 text-lg">
                <input className="rounded-lg p-2 md:w-96 w-80 border-none sedan-regular outline-none text-base" 
                type="text" name="name" placeholder="Username" />
              </div>
              <div className="mb-6 text-lg">
                <input className="rounded-lg p-2 md:w-96 w-80 border-none sedan-regular outline-none text-base" 
                type="text" name="email" placeholder="Email" />
              </div>
              <div className="mb-4 text-lg">
                <input className="rounded-lg p-2 md:w-96 w-80 border-none outline-none sedan-regular text-base" 
                type="Password" name="password" placeholder="Password" />
              </div>
              <div className="mt-8 flex justify-center">
                <button type="submit" className="rounded-lg bg-bg-header text-white px-6 py-2 text-xl sedan-regular ">Resister</button>
              </div>
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
            <a href="#" className="flex items-center justify-center space-x-2 text-gray-600 my-2 py-2 bg-gray-100 hover:bg-gray-200 rounded">
                <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 326667 333333" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd"><path d="M326667 170370c0-13704-1112-23704-3518-34074H166667v61851h91851c-1851 15371-11851 38519-34074 54074l-311 2071 49476 38329 3428 342c31481-29074 49630-71852 49630-122593m0 0z" fill="#4285f4"></path><path d="M166667 333333c44999 0 82776-14815 110370-40370l-52593-40742c-14074 9815-32963 16667-57777 16667-44074 0-81481-29073-94816-69258l-1954 166-51447 39815-673 1870c27407 54444 83704 91852 148890 91852z" fill="#34a853"></path><path d="M71851 199630c-3518-10370-5555-21482-5555-32963 0-11482 2036-22593 5370-32963l-93-2209-52091-40455-1704 811C6482 114444 1 139814 1 166666s6482 52221 17777 74814l54074-41851m0 0z" fill="#fbbc04"></path><path d="M166667 64444c31296 0 52406 13519 64444 24816l47037-45926C249260 16482 211666 1 166667 1 101481 1 45185 37408 17777 91852l53889 41853c13520-40185 50927-69260 95001-69260m0 0z" fill="#ea4335"></path></svg>
                <span>Sign up with Google</span>
            </a>
          </div>
        </div>
      </div>
    </>

  )
}

export default resister
