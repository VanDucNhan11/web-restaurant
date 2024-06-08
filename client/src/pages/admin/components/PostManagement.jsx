import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PostTable = ({ posts, onEdit, onDelete }) => (
  <div className="overflow-x-auto shadow-md rounded-lg">
    <table className="min-w-full bg-white border border-gray-200">
      <thead>
        <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
          <th className="py-3 px-6 text-left">Tiêu đề</th>
          <th className="py-3 px-6 text-left">Nội dung</th>
          <th className="py-3 px-6 text-left">Ngày đăng</th>
          <th className="py-3 px-6 text-left">Hình ảnh</th>
          <th className="py-3 px-6 text-center">Hành động</th>
        </tr>
      </thead>
      <tbody className="text-gray-600 text-sm font-light">
        {posts.map((post) => (
          <tr key={post._id} className="border-b border-gray-200 hover:bg-gray-100">
            <td className="py-3 px-6 text-left">{post.title}</td>
            <td className="py-3 px-6 text-left">{post.content}</td>
            <td className="py-3 px-6 text-left">{new Date(post.datePosted).toLocaleDateString()}</td>
            <td className="py-3 px-6 text-left">
              <img src={`http://localhost:3000/${post.image}`} alt="Post" className="w-16 h-16 object-cover" />
            </td>
            <td className="py-3 px-6 text-center">
              <button
                onClick={() => onEdit(post)}
                className="bg-blue-500 text-white px-3 py-1 rounded  hover:bg-blue-700 transition duration-300"
              >
                Sửa
              </button>
              <button
                onClick={() => onDelete(post._id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700 transition duration-300 mt-2"
              >
                Xoá
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const PostManagement = () => {
  const [posts, setPosts] = useState([]);
  const [editPost, setEditPost] = useState(null);
  const [postData, setPostData] = useState({
    title: '',
    content: '',
    datePosted: new Date().toISOString().split('T')[0],
    image: ''
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/posts');
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  const handleEdit = (post) => {
    setEditPost(post);
    setPostData({
      title: post.title,
      content: post.content,
      datePosted: new Date(post.datePosted).toISOString().split('T')[0],
      image: post.image,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/v1/posts/${id}`);
      setPosts(posts.filter(post => post._id !== id));
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const handleSavePost = async () => {
    const formData = new FormData();
    formData.append('title', postData.title);
    formData.append('content', postData.content);
    formData.append('datePosted', postData.datePosted);
    if (postData.image instanceof File) {
      formData.append('image', postData.image);
    } else {
      formData.append('image', postData.image);
    }

    try {
      if (editPost) {
        const response = await axios.put(`http://localhost:3000/api/v1/posts/${editPost._id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        setPosts(posts.map(post => (post._id === editPost._id ? response.data : post)));
      } else {
        const response = await axios.post('http://localhost:3000/api/v1/posts', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        setPosts([...posts, response.data]);
      }
      setIsModalOpen(false);
      setEditPost(null);
    } catch (error) {
      console.error('Error saving post:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPostData({ ...postData, [name]: value });
  };

  const handleFileChange = (e) => {
    setPostData({ ...postData, image: e.target.files[0] });
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-6 text-center title-1 title-fon">Danh sách bài viết</h1>
      <div className="flex justify-end mb-4">
        <button
          onClick={() => {
            setIsModalOpen(true);
            setEditPost(null);
            setPostData({
              title: '',
              content: '',
              datePosted: new Date().toISOString().split('T')[0],
              image: ''
            });
          }}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 transition duration-300"
        >
          Thêm bài
        </button>
      </div>
      <PostTable posts={posts} onEdit={handleEdit} onDelete={handleDelete} />
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-2xl mb-4">{editPost ? 'Sửa bài viết' : 'Thêm bài viết mới'}</h2>
            <input
              type="text"
              name="title"
              value={postData.title}
              onChange={handleInputChange}
              className="border p-2 mb-4 w-full"
              placeholder="Tiêu đề"
            />
            <textarea
              name="content"
              value={postData.content}
              onChange={handleInputChange}
              className="border p-2 mb-4 w-full"
              placeholder="Nội dung"
            />
            <input
              type="file"
              name="image"
              onChange={handleFileChange}
              className="border p-2 mb-4 w-full"
            />
            <button
              onClick={handleSavePost}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 transition duration-300"
            >
             Lưu
            </button>
            <button
              onClick={() => setIsModalOpen(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded ml-2 hover:bg-gray-700 transition duration-300"
            >
              thoát
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostManagement;
