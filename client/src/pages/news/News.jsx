import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import '../news/News.css';

const News = () => {
  const [posts, setPosts] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [ref, inView] = useInView({ threshold: 0 });

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    if (inView) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [inView]);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/v1/posts');
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

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
          <span>Tin tức</span>
        </div>
      </div>
      <section ref={ref} className={`tin-tuc ${isVisible ? 'visible' : ''}`}>
        <div className="mx-auto items-center justify-center pb-10 md:w-2/3 pt-10">
          <div className="grid justify-items-center grid-cols-1 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {posts && posts.length > 0 ? (
              posts.map((post) => (
                <div key={post._id} className="pin-item">
                  <Link to={`/news/${post._id}`}> 
                    <img src={`http://localhost:3000/${post.image}`} alt={post.title} />
                    <div className="pin-title title-font pt-3">{post.title}</div>
                    <div className="text-base text-gray-700 font-light pt-2">{new Date(post.datePosted).toLocaleDateString()}</div>
                    <div className="text-base text-gray-700 font-light pt-2">
                      <p>{post.content.substring(0, 100)}...</p>
                    </div>
                    <div className="pb-3">
                      <span className="title-font text-red-800 font-size-content">
                        Chi tiết
                        <i className="ml-1 -pb-1">
                          <ion-icon name="arrow-forward-outline"></ion-icon>
                        </i>
                      </span>
                    </div>
                  </Link>
                </div>
              ))
            ) : (
              <p>No posts available</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default News;
