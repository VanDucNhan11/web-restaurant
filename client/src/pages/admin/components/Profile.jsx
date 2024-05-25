import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Profile = () => {
  const navigate = useNavigate();
  const { currentUser } = useSelector(state => state.user);
  const dispatch = useDispatch();

  const [avatar, setAvatar] = useState('/path/to/default/avatar.jpg');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/v1/user/${currentUser._id}/profile`);
        const userData = response.data;
        setAvatar(userData.profilePicture);
        setFormData({
          name: userData.username,
          email: userData.email,
          phone: userData.phone,
        });
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    if (currentUser && currentUser._id) {
      fetchUserProfile();
    }
  }, [currentUser]);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdateProfile = async () => {
    try {
      const response = await axios.put(`http://localhost:3000/api/v1/user/${currentUser._id}/profile`, {
        username: formData.name,
        email: formData.email,
        phone: formData.phone,
        profilePicture: avatar,
      });

      dispatch({ type: 'UPDATE_USER_PROFILE', payload: response.data });
      alert("Profile updated successfully.");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Error updating profile.");
    }
  };

  const handleChangePassword = async () => {
    if (passwords.newPassword !== passwords.confirmNewPassword) {
      return alert("New passwords do not match.");
    }

    try {
      await axios.put(`http://localhost:3000/api/v1/user/${currentUser._id}/change-password`, {
        currentPassword: passwords.currentPassword,
        newPassword: passwords.newPassword,
      });

      alert("Password changed successfully.");
      toggleChangePasswordModal();
    } catch (error) {
      console.error("Error changing password:", error);
      alert("Error changing password.");
    }
  };

  const toggleChangePasswordModal = () => {
    setIsChangePasswordModalOpen(!isChangePasswordModalOpen);
  };

  return (
    <div className="h-full p-4 sm:p-8 flex flex-col items-center relative">
      <button onClick={() => navigate('/')} className="absolute top-0 right-0 mt-4 mr-4 bg-red-600 hover:bg-red-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center" type="button">
        <ion-icon name="chevron-back-circle-outline" className="text-xl mr-2"/>
        <span>Back Home</span>
      </button>
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
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
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
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Your email address"
          />
        </div>
        <a href="#" onClick={toggleChangePasswordModal} className="relative inline-block bg-white border border-gray-300 text-blue-500 hover:bg-blue-100 rounded-lg px-4 py-2 text-sm font-medium transition duration-300 ease-in-out">
          <span className="mr-2">Đổi mật khẩu</span>
          <ion-icon name="arrow-forward-circle-outline"></ion-icon>
        </a>
        <button onClick={handleUpdateProfile} className="w-full bg-red-600 hover:bg-red-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline title-font mt-4" type="button">
          Cập nhật
        </button>
      </div>
      {isChangePasswordModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-2">Đổi mật khẩu</h3>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="currentPassword">
                Mật khẩu cũ:
              </label>
              <input
                id="currentPassword"
                type="password"
                value={passwords.currentPassword}
                onChange={(e) => setPasswords({ ...passwords, currentPassword: e.target.value })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Mật khẩu cũ"
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
                onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Mật khẩu mới"
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmNewPassword">
                Xác nhận mật khẩu mới:
              </label>
              <input
                id="confirmNewPassword"
                type="password"
                value={passwords.confirmNewPassword}
                onChange={(e) => setPasswords({ ...passwords, confirmNewPassword: e.target.value })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Xác nhận mật khẩu mới"
              />
            </div>
            <button onClick={handleChangePassword} className="w-full bg-red-600 hover:bg-red-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline title-font" type="button">
              Đổi mật khẩu
            </button>
            <button onClick={toggleChangePasswordModal} className="mt-4 w-full bg-gray-400 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline title-font" type="button">
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
