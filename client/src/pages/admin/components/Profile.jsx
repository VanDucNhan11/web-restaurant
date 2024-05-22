import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateProfileStart, updateProfileSuccess, updateProfileError, logoutUser } from '../../../redux/user/userSlide';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { currentUser } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: currentUser?.username || '',
    email: currentUser?.email || '',
    phone: currentUser?.phone || '',
  });
  const [avatar, setAvatar] = useState(currentUser?.profilePicture || '/path/to/default/avatar.jpg');
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  useEffect(() => {
    if (currentUser) {
      setFormData({
        name: currentUser.username,
        email: currentUser.email,
        phone: currentUser.phone || '',
      });
      setAvatar(currentUser.profilePicture);
    }
  }, [currentUser]);

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

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handlePasswordChange = (e) => {
    const { id, value } = e.target;
    setPasswords({ ...passwords, [id]: value });
  };

  const handleSubmit = async () => {
    try {
      dispatch(updateProfileStart());
      const res = await axios.put('http://localhost:3000/api/v1/user/profile', formData, {
        withCredentials: true,
      });
      dispatch(updateProfileSuccess(res.data));
    } catch (error) {
      dispatch(updateProfileError(error.response?.data?.message || 'Cập nhật thất bại'));
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:3000/api/v1/user/logout', {}, {
        withCredentials: true,
      });
      dispatch(logoutUser());
      navigate('/');
    } catch (error) {
      console.error('Đăng xuất thất bại:', error);
    }
  };

  const handleChangePassword = async () => {
    if (passwords.newPassword !== passwords.confirmNewPassword) {
      dispatch(updateProfileError('Mật khẩu mới và xác nhận mật khẩu không khớp'));
      return;
    }

    try {
      const res = await axios.put('http://localhost:3000/api/v1/user/change-password', passwords, {
        withCredentials: true,
      });
      dispatch(updateProfileSuccess(res.data));
    } catch (error) {
      dispatch(updateProfileError(error.response?.data?.message || 'Đổi mật khẩu thất bại'));
    }
  };

  return (
    <div className="h-full p-4 sm:p-8 flex flex-col items-center">
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
            value={formData.name}
            onChange={handleChange}
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
            value={formData.phone}
            onChange={handleChange}
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
            value={formData.email}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Your email address"
          />
        </div>
        <button onClick={handleSubmit} className="w-full bg-red-600 hover:bg-red-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline title-font" type="button">
          Cập nhật
        </button>
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-4 text-center title-1 title-font">Đổi mật khẩu</h3>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="currentPassword">
              Mật khẩu hiện tại:
            </label>
            <input
              id="currentPassword"
              type="password"
              value={passwords.currentPassword}
              onChange={handlePasswordChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Nhập mật khẩu hiện tại"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="newPassword">
              Mật khẩu mới:
            </label>
            <input
              id="newPassword"
              type="password"
              value={passwords.newPassword}
              onChange={handlePasswordChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Nhập mật khẩu mới"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmNewPassword">
              Xác nhận mật khẩu mới:
            </label>
            <input
              id="confirmNewPassword"
              type="password"
              value={passwords.confirmNewPassword}
              onChange={handlePasswordChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Xác nhận mật khẩu mới"
            />
          </div>
          <button onClick={handleChangePassword} className="w-full bg-red-600 hover:bg-red-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline title-font" type="button">
            Đổi mật khẩu
          </button>
        </div>
        <button onClick={handleLogout} className="mt-4 w-full bg-red-600 hover:bg-red-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline title-font" type="button">
          Đăng xuất
        </button>
      </div>
    </div>
  );
};

export default Profile;
