import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faHeart, faEye } from '@fortawesome/free-solid-svg-icons';

import { formatPrice } from '../../../utils/format';
import { isFavoriteCourse, toggleFavoriteCourse } from '../../../utils/storage';
import styles from './Course.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

interface Props {
  id: string;
  title: string;
  price?: number;
  auth: string;
  time?: string;
  image: string;
  onCourseClick?: (id: string) => void;
  viewCount?: number;
}

const CourseComponent = ({ id, title, price, auth, image, time, onCourseClick, viewCount = 0 }: Props) => {
  const [isFavorite, setIsFavorite] = useState(false);

  // Kiểm tra trạng thái yêu thích khi component mount
  useEffect(() => {
    setIsFavorite(isFavoriteCourse(id));
  }, [id]);

  // Hàm xử lý sự kiện click vào khóa học
  const handleClick = () => {
    if (onCourseClick) {
      onCourseClick(id);
    }
  };

  // Hàm xử lý sự kiện click vào icon heart
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Ngăn không cho trigger click vào khóa học
    toggleFavoriteCourse(id);
    setIsFavorite(!isFavorite);
  };

  return (
    <div className={cx('wrapper_course')} key={id} onClick={handleClick} style={{ cursor: 'pointer' }}>
      <div className={cx('top_gradient')}>
        <img src={image} className={cx('img_bg')} alt="Course background" />
      </div>
      <div className={cx('wrapper_content')}>
        <h3 className={cx('course_title')}>{title}</h3>
        <div className={cx('course_price')}>{price ? formatPrice(price) : 'Liên hệ'}</div>
        <div className={cx('tym')}>
          <FontAwesomeIcon 
            icon={faHeart} 
            style={{ 
              width: '15px', 
              height: '15px',
              color: isFavorite ? '#ff4d4f' : '#666',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              opacity: isFavorite ? 1 : 0.5
            }}
            onClick={handleFavoriteClick}
            className={cx('heart_icon', { 'heart_filled': isFavorite })}
          />
          <div className={cx('wrapper_view')}>
            <span>{viewCount}</span>
            <FontAwesomeIcon icon={faEye} style={{ width: '15px', height: '15px' }} />
          </div>
        </div>
        <div className={cx('course_info')}>
          <span className={cx('info_item')}>{auth}</span>
          <span className={cx('info_item')}>
            <FontAwesomeIcon icon={faClock} style={{ width: '15px', height: '15px' }} />
            {time}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CourseComponent;
