import React from 'react';
import { Input } from 'antd';
import { FaSearch } from "react-icons/fa";

const SearchComponent: React.FC = () => {
  return (
    <div className="w-full flex justify-center h-[40px] ">
      <Input
        style={{borderRadius: '20px' , width: '63%'}}
        className="w-1/2"
        placeholder="Tìm kiếm khóa học, bài viết, video, ..."
        prefix={<FaSearch className="text-gray-100"  style={{margin:'15px', width:"15" , height:"15", color: '#999', opacity: 3.6 }} />}
      />
    </div>
  );
};

export default SearchComponent;
