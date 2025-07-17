import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import SearchComponent from '../SearchComponent/SearchComponent';
import logof7 from '/public/assets/logof7.png';
import styles from './Header.module.scss';
import classNames from 'classnames/bind';
import ModalDetailCourse from '../ModalDetailCourse/ModalDetailCourse';
import type { CourseDetail } from '../ModalDetailCourse/ModalDetailCourse';

const cx = classNames.bind(styles);

const HeaderComponent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<CourseDetail | undefined>(undefined);

  const handleCourseClick = (course: CourseDetail) => {
    setSelectedCourse(course);
    setModalVisible(true);
  };

  return (
    <div className="w-full bg-white">
      <div className="max-w-screen-xl mx-auto flex items-center p-[6px]">
        {/* Logo + Tiêu đề */}
        <div className={`${cx('title_md')} flex items-center min-w-[230px]`}>
          <div className={cx('wrapper-logo')}>
            {isHome && (
              <img src={logof7} width={48} height={48} alt="Logo" className={`${cx('img_style')} w-10 h-10`} />
              )}
            {!isHome && (
              <button className={cx('back')} onClick={() => navigate(-1)}>
                {'<<'}
              </button>
            )}
          </div>
          {isHome ? (
            <span className={cx('title')}>Học Lập Trình Để Đi Làm</span>
          ) : (
            <button className={cx('back_btn')} onClick={() => navigate(-1)}>
              {'<<'} Trở lại
            </button>
          )}
        </div>

        {/* Search */}
        <div className="flex-1 flex justify-center mx-4">
          <SearchComponent onCourseClick={handleCourseClick} />
        </div>

        {/* Đăng ký / Đăng nhập */}
        <div className={cx('wrapper-btn')}>
          <button className={cx('btn', 'btn_register')}>Đăng ký</button>
          <button className={cx('btn', 'btn_login')}>Đăng nhập</button>
        </div>
      </div>
      <ModalDetailCourse visible={modalVisible} onClose={() => setModalVisible(false)} courseData={selectedCourse} />
    </div>
  );
};

export default HeaderComponent;
