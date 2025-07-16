import React from 'react';
import { Modal, Spin, Rate, Tag, Space, Divider } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faUser, faPlay } from '@fortawesome/free-solid-svg-icons';

import { formatPrice, formatTime, formatRating } from '../../../utils/format';
import styles from './ModalDetail.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

export interface CourseDetail {
  id: string;
  title: string;
  price: number;
  auth: string;
  image: string;
  time: string;
  shortDesc: string;
  fullDesc: string;
  rating: number;
}

interface Props {
  visible: boolean;
  onClose: () => void;
  courseData?: CourseDetail;
  loading?: boolean;
}

const ModalDetailCourse: React.FC<Props> = ({ 
  visible, 
  onClose, 
  courseData, 
  loading = false 
}) => {
  return (
    <Modal
      open={visible}
      onCancel={onClose}
      footer={null}
      width={800}
      className={cx('modal_detail')}
      destroyOnClose
    >
      {loading ? (
        <div className={cx('loading_container')}>
          <Spin size="large" />
          <p>Đang tải thông tin khóa học...</p>
        </div>
      ) : courseData ? (
        <div className={cx('course_detail')}>
          {/* Header với ảnh và thông tin cơ bản */}
          <div className={cx('course_header')}>
            <div className={cx('course_image')}>
              <img src={courseData.image} alt={courseData.title} />
              <div className={cx('play_overlay')}>
                <FontAwesomeIcon icon={faPlay} />
              </div>
            </div>
            <div className={cx('course_info')}>
              <h2 className={cx('course_title')}>{courseData.title}</h2>
              
              <div className={cx('course_rating')}>
                <Rate disabled defaultValue={courseData.rating} />
                <span className={cx('rating_text')}>
                  {formatRating(courseData.rating)}
                </span>
              </div>

              <div className={cx('course_meta')}>
                <Space size="large">
                  <div className={cx('meta_item')}>
                    <FontAwesomeIcon icon={faUser} />
                    <span>{courseData.auth}</span>
                  </div>
                  <div className={cx('meta_item')}>
                    <FontAwesomeIcon icon={faClock} />
                    <span>{formatTime(courseData.time)}</span>
                  </div>
                </Space>
              </div>

              <div className={cx('course_price')}>
                <span className={cx('price_label')}>Giá khóa học:</span>
                <span className={cx('price_value')}>{formatPrice(courseData.price)}</span>
              </div>
            </div>
          </div>
          <Divider />
          {/* Mô tả ngắn */}
          <div className={cx('course_section')}>
            <h3 className={cx('section_title')}>Mô tả ngắn</h3>
            <p className={cx('section_content')}>{courseData.shortDesc}</p>
          </div>
          <Divider />
          {/* Mô tả chi tiết */}
          <div className={cx('course_section')}>
            <h3 className={cx('section_title')}>Nội dung khóa học</h3>
            <div className={cx('section_content')}>
              <p>{courseData.fullDesc}</p>
            </div>
          </div>
          <Divider />
          {/* Thông tin bổ sung */}
          <div className={cx('course_section')}>
            <h3 className={cx('section_title')}>Thông tin khóa học</h3>
            <div className={cx('course_features')}>
              <Space wrap>
                <Tag color="blue">Học online</Tag>
                <Tag color="green">Chứng chỉ</Tag>
                <Tag color="orange">Hỗ trợ trọn đời</Tag>
                <Tag color="purple">Cập nhật thường xuyên</Tag>
              </Space>
            </div>
          </div>

          {/* Footer với action buttons */}
          <div className={cx('course_footer')}>
            <Space size="middle">
              <button className={cx('btn_primary')}>
                Đăng ký ngay
              </button>
              <button className={cx('btn_secondary')}>
                Thêm vào giỏ hàng
              </button>
            </Space>
          </div>
        </div>
      ) : (
        <div className={cx('error_container')}>
          <p>Không thể tải thông tin khóa học</p>
        </div>
      )}
    </Modal>
  );
};

export default ModalDetailCourse;
