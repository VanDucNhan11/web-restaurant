import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './News.css';


const DetailNews = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  
  useEffect(() => {
    fetchPost();
  }, [id]);

  const fetchPost = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/v1/posts/${id}`);
      console.log(response); // Kiểm tra response
      setPost(response.data);
    } catch (error) {
      console.error('Error fetching post:', typeof error === 'object' ? error : 'Unknown error');
    }
  };
  
  

  if (!post) return <div>Loading...</div>;

  return (
    <div>
      <div className="relative">
        <img
          className="w-full"
          src="https://madamelan.vn/storage/img-2996-mdl-web-pc-tin-tuc-news-landing-page-vie-eng.jpg"
          alt=""
        />
        <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center text-6xl title-font">
          Tin Tức
        </h1>
        <div className="absolute mt-10 top-1/2 left-1/2 transform -translate-x-1/2 flex items-center text-white text-2xl font-light">
          <a href="/">Trang chủ</a>
          <span className="mx-2">/</span>
          <span>Chi tiết tin tức</span>
        </div>
      </div>
      <section>
        <div className="mx-auto items-center justify-center md:w-3/4 pb-10 pt-10">
          <div className="flex justify-items-center flex-wrap">
            <div className="col-md-9 w-4/5">
              <div className="flex items-center space-x-3">
                <span className="date-view font-light mr-2 flex items-center">
                  <i className="fal">
                    <ion-icon name="person-outline"></ion-icon>
                  </i>
                  <span className="ml-1">Super Admin</span>
                </span>
                |
                <span className="date-view font-light flex items-center">
                  <i className="fal">
                    <ion-icon name="time-outline"></ion-icon>
                  </i>
                  <span className="ml-1 mr-2">{new Date(post.datePosted).toLocaleDateString()}</span>
                </span>
                |
                <span className="date-view font-light mx-2 flex items-center">
                  <i className="fal mb-0">
                    <ion-icon name="eye-outline"></ion-icon>
                  </i>
                  <span className="ml-1">2282</span>
                </span>
              </div>
              <div>
                <div className="text-3xl mt-5 mb-5">{post.title}</div>
                <img src={`http://localhost:3000/${post.image}`} alt={post.title} />
                <div className="font-light font-size-content font-weight-bold py-3">
                  {post.content.substring(0, 100)}...
                </div>
                <div className="font-light font-size-content">
                  <p>{post.content}</p>
                </div>
              </div>
              <div className="categories font-light">
                Danh mục
                <span className="tag ml-4">Món ăn Madame Lân</span>
              </div>
              <div className="title title-font text-3xl pb-12 text-black">Bài viết liên quan</div>
              <div className="grid justify-items-center grid-cols-1 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
                
              </div>
            </div>
            <div className="archive pl-10 lg:col-span-1">
              <label className="title-font">- Lưu trữ</label>
              <ul className="text-red-800">
                <li className="font-light font-size-content">
                  <a href="">
                    <span>Tháng 5, 2024 (1)</span>
                  </a>
                </li>
                <li className="font-light font-size-content">
                  <a href="">
                    <span>Tháng 12, 2023 (1)</span>
                  </a>
                </li>
                <li className="font-light font-size-content">
                  <a href="">
                    <span>Tháng 4, 2022 (4)</span>
                  </a>
                </li>
                <li className="font-light font-size-content">
                  <a href="">
                    <span>Tháng 3, 2022 (1)</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DetailNews;
