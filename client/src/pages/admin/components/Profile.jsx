import React, { useState } from 'react';

const Profile = () => {
  const [avatar, setAvatar] = useState('/path/to/default/avatar.jpg');

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className=" h-full p-4 sm:p-8 flex flex-col items-center">
      <h2 className="text-3xl font-semibold mb-6 text-center title-1 title-font">My Profile</h2>
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <div className="flex flex-col items-center mb-4">
          <div className="relative">
            <img
              src={avatar}
              alt="Avatar"
              className="w-24 h-24 rounded-full object-cover cursor-pointer"
              onClick={() => document.getElementById('avatarInput').click()}
            />
            <input
              id="avatarInput"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarChange}
            />
          </div>
          <label htmlFor="avatarInput" className="mt-2 text-sm text-gray-600 cursor-pointer title-font">Click to change avatar</label>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Name:
          </label>
          <input
            id="name"
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Your name"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
            Phone:
          </label>
          <input
            id="phone"
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Your phone number"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email:
          </label>
          <input
            id="email"
            type="email"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Your email address"
          />
        </div>
        <button className="w-full bg-red-600 hover:bg-red-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline title-font" type="button">
          cập nhật
        </button>
      </div>
    </div>
  );
};

export default Profile;
