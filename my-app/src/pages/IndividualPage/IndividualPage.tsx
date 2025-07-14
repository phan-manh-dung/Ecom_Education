import React, { useState, useEffect } from 'react';
import { Row, Col, Empty } from 'antd';
import toast from 'react-hot-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faTrash ,faReceipt } from '@fortawesome/free-solid-svg-icons';

import styles from './Individual.module.scss';
import classNames from 'classnames/bind';

import CourseComponent from '../../components/feature/CourseComponent/CourseComponent';
import ModalDetailCourse from '../../components/feature/ModalDetailCourse/ModalDetailCourse';
import { getFavoriteCourses, removeFavoriteCourse, getViewedCourses, clearViewedCourses } from '../../utils/storage';
import { mockCourses } from '../../mockData/courses';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

interface CourseDetail {
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

const IndividualPage = () => {
  useEffect(() => {
    document.title = 'Cá nhân';
  }, []);

  const [favoriteCourseIds, setFavoriteCourseIds] = useState<string[]>([]);
  const [favoriteCourses, setFavoriteCourses] = useState<CourseDetail[]>([]);

  // Modal detail states
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<CourseDetail | undefined>(undefined);

  // Lịch sử đã xem
  const [viewedCourses, setViewedCourses] = useState<CourseDetail[]>([]);
  const navigate = useNavigate();

  // Lấy danh sách khóa học yêu thích
  useEffect(() => {
    const favoriteIds = getFavoriteCourses();
    setFavoriteCourseIds(favoriteIds);
    
    // Lọc ra các khóa học đã yêu thích từ mock data
    const filteredCourses = mockCourses.filter(course => 
      favoriteIds.includes(course.id)
    );
    setFavoriteCourses(filteredCourses);
  }, []);

  // Lấy lịch sử đã xem
  useEffect(() => {
    const viewedIds = getViewedCourses();
    const viewed = mockCourses.filter(course => viewedIds.includes(course.id));
    setViewedCourses(viewed);
  }, []);

  // Hàm xử lý bỏ yêu thích
  const handleRemoveFavorite = (courseId: string) => {
    removeFavoriteCourse(courseId);
    
    // Cập nhật state
    const newFavoriteIds = favoriteCourseIds.filter(id => id !== courseId);
    setFavoriteCourseIds(newFavoriteIds);
    
    const newFavoriteCourses = favoriteCourses.filter(course => course.id !== courseId);
    setFavoriteCourses(newFavoriteCourses);
    
    toast.success('Đã bỏ yêu thích khóa học!');
  };

  // Hàm xử lý click vào khóa học (mở modal detail)
  const handleCourseClick = (courseId: string) => {
    const course = mockCourses.find(c => c.id === courseId);
    setSelectedCourse(course);
    setDetailModalVisible(true);
    // KHÔNG gọi addViewedCourse ở đây nữa
  };

  // Hàm đóng modal detail
  const handleCloseDetailModal = () => {
    setDetailModalVisible(false);
    setSelectedCourse(undefined);
  };

  // Xóa toàn bộ lịch sử đã xem
  const handleClearViewed = () => {
    setViewedCourses([]);
    clearViewedCourses();
    toast.success('Đã xóa lịch sử đã xem!');
  };

  return (
    <div className={cx('wrapper_individual')}>
      <div className={cx('header_section')}>
        <div className={cx('header_content')}>
          <h1 className={cx('page_title')}>
            <FontAwesomeIcon icon={faHeart} className={cx('heart_icon')} />
            Khóa học yêu thích
          </h1>
          <p className={cx('page_subtitle')}>
            Bạn có {favoriteCourses.length} khóa học trong danh sách yêu thích
          </p>
        </div>
      </div>

      <div className={cx('content_section')}>
        {favoriteCourses.length > 0 ? (
          <>
            <div className={cx('courses_grid')}>
              <Row gutter={[16, 24]}>
                {favoriteCourses.map((course) => (
                  <Col key={course.id} xs={24} sm={12} md={8} lg={6}>
                    <div className={cx('course_card')}>
                      <CourseComponent
                        id={course.id}
                        title={course.title}
                        price={course.price}
                        auth={course.auth}
                        image={course.image}
                        time={course.time}
                        onCourseClick={handleCourseClick}
                        viewCount={0}
                      />
                      <div className={cx('remove_button')}>
                        <button
                          onClick={() => handleRemoveFavorite(course.id)}
                          className={cx('remove_btn')}
                          title="Bỏ yêu thích"
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </div>
                    </div>
                  </Col>
                ))}
              </Row>
            </div>
          </>
        ) : (
          <div className={cx('empty_state')}>
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description={
                <div className={cx('empty_content')}>
                  <h3>Chưa có khóa học yêu thích</h3>
                  <p>Hãy khám phá các khóa học và thêm vào danh sách yêu thích của bạn!</p>
                  <button onClick={() => navigate('/')} className={cx('explore_btn')}>
                    Khám phá khóa học
                  </button>
                </div>
              }
            />
          </div>
        )}
      </div>

      {/* Lịch sử đã xem khóa học */}
      <div className={cx('viewed_section')}>
        <div className={cx('viewed_header')}>
           <h1 className={cx('page_title')}>
            <FontAwesomeIcon icon={faReceipt} className={cx('heart_icon')} />
            Khóa học đã xem
          </h1>
          {viewedCourses.length > 0 && (
            <button className={cx('clear_btn')} onClick={handleClearViewed}>
              Xóa lịch sử
            </button>
          )}
        </div>
        {viewedCourses.length > 0 ? (
          <Row gutter={[16, 24]}>
            {viewedCourses.map((course) => (
              <Col key={course.id} xs={24} sm={12} md={8} lg={6}>
                <CourseComponent
                  id={course.id}
                  title={course.title}
                  price={course.price}
                  auth={course.auth}
                  image={course.image}
                  time={course.time}
                  onCourseClick={handleCourseClick}
                  viewCount={0}
                />
              </Col>
            ))}
          </Row>
        ) : (
          <div className={cx('empty_viewed')}>
            <p>Bạn chưa xem khóa học nào.</p>
          </div>
        )}
      </div>

      {/* Modal chi tiết khóa học */}
      <ModalDetailCourse
        visible={detailModalVisible}
        onClose={handleCloseDetailModal}
        courseData={selectedCourse}
        loading={false}
      />
    </div>
  );
};

export default IndividualPage;
