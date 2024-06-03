import React from 'react';

const ChatIcons = () => {
  return (
    <div className="fixed bottom-0 right-0 mb-20 mr-10 z-50 flex flex-col items-end">
      <a 
        href="https://zalo.me/0899885260" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="relative group"
      >
        <img 
          src="https://e7.pngegg.com/pngimages/380/338/png-clipart-computer-icons-footprint-%D7%92%D7%A0%D7%99-%D7%99%D7%94%D7%95%D7%93%D7%94-trustworthy-red-phone-icon-text-aquarium-thumbnail.png" 
          alt="Zalo" 
          className="w-14 h-14 hover:scale-110 rounded-full" 
        />
        <span className="absolute top-1/2 -left-28 transform -translate-y-1/2 bg-red-500 px-2 py-1 text-white text-sm rounded opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          0899 885 260
        </span>
      </a>
    </div>
  );
};

export default ChatIcons;
