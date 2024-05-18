import React, { useState } from 'react';

const PostTable = ({ posts, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto shadow-md rounded-lg">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">ID</th>
            <th className="py-3 px-6 text-left">Title</th>
            <th className="py-3 px-6 text-left">Content</th>
            <th className="py-3 px-6 text-left">Date Posted</th>
            <th className="py-3 px-6 text-left">Image</th>
            <th className="py-3 px-6 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {posts.map((post) => (
            <tr key={post.id} className="border-b border-gray-200 hover:bg-gray-100">
              <td className="py-3 px-6 text-left whitespace-nowrap">{post.id}</td>
              <td className="py-3 px-6 text-left">{post.title}</td>
              <td className="py-3 px-6 text-left">{post.content}</td>
              <td className="py-3 px-6 text-left">{post.datePosted}</td>
              <td className="py-3 px-6 text-left">
                <img src={post.image} alt="Post" className="w-16 h-16 object-cover" />
              </td>
              <td className="py-3 px-6 text-center">
                <button
                  onClick={() => onEdit(post)}
                  className="bg-blue-500 text-white px-3 py-1 rounded mr-2 hover:bg-blue-700 transition duration-300"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(post.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700 transition duration-300"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const PostManagement = () => {
  const [posts, setPosts] = useState([
    { id: 1, title: 'Post 1', content: 'Content 1', datePosted: '2024-05-18', image: 'https://via.placeholder.com/150' },
    { id: 2, title: 'Post 2', content: 'Content 2', datePosted: '2024-05-19', image: 'https://via.placeholder.com/150' },
    { id: 3, title: 'Post 3', content: 'Content 3', datePosted: '2024-05-20', image: 'https://via.placeholder.com/150' },
  ]);

  const [editPost, setEditPost] = useState(null);

  const handleEdit = (post) => {
    setEditPost(post);
    // Add logic to open modal or form to edit post
  };

  const handleDelete = (id) => {
    setPosts(posts.filter(post => post.id !== id));
    // Add logic to delete post from server
  };

  const handleAddPost = () => {
    const newPost = { id: posts.length + 1, title: 'New Post', content: 'New Content', datePosted: '2024-05-21', image: 'https://via.placeholder.com/150' };
    setPosts([...posts, newPost]);
    // Add logic to open modal or form to add new post
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-6 text-center title-1 title-fon">Quản lý bài viết</h1>
      <div className="flex justify-end mb-4">
        <button
          onClick={handleAddPost}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 transition duration-300"
        >
          Add Post
        </button>
      </div>
      <PostTable posts={posts} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default PostManagement;
