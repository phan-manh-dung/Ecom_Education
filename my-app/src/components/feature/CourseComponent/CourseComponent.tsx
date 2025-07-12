import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';

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
}

const CourseComponent = ({ id, title, price, auth, image, time }: Props) => {
  return (
    <div className={cx('wrapper_course')} key={id}>
      <div className={cx('top_gradient')}>
        <img src={image} className={cx('img_bg')} alt="Course background" />
      </div>
      <div className={cx('wrapper_content')}>
        <h3 className={cx('course_title')}>{title}</h3>
        <div className={cx('course_price')}>{price?.toLocaleString() + ' VNĐ'}</div>
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
