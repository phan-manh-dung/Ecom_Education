import React from 'react';
import styles from './Home.module.scss';
import classNames from 'classnames/bind';

import { Row, Col } from 'antd';
import SpinnerComponent from '../../components/SpinnerComponent/SpinnerComponent';

import { useQuery } from '@tanstack/react-query';

import SidebarMenu from '../../components/feature/SidebarMenu/SidebarMenu';
import SlickSlider from '../../components/feature/SlickSliderComponent/SlickSliderComponent';
import CourseComponent from '../../components/feature/CourseComponent/CourseComponent';

import { getCourses } from '../../api/course/apiCourse';

const cx = classNames.bind(styles);

const HomePage = () => {
  const { data, isLoading, error } = useQuery({ queryKey: ['courses'], queryFn: getCourses });

  // Handle loading error
  if (error) {
    let errorMsg = 'Đã xảy ra lỗi khi tải khóa học.';
    if (error instanceof Error) {
      errorMsg += ' ' + error.message;
    }
    return <div style={{ color: 'red', padding: 16 }}>{errorMsg}</div>;
  }

  return (
    <div className={cx('wrapper_home')}>
      <div className="grid grid-cols-12 gap-4">
        <div className={`${cx('customLeft')} col-span-1`}>
          <div className={cx('wrapper_ul')}>
            {/* Sidebar */}
            <SidebarMenu />
          </div>
        </div>
        <div className={`${cx('customRight')} col-span-11`}>
          {/* Slick Slider */}
          <div>
            <SlickSlider />
          </div>
          {/* Course component */}
          <div className={cx('wrapper_course')}>
            <div className={cx('title')}>
              <span>Các khóa học của F7</span>
            </div>
            {isLoading ? (
              <SpinnerComponent />
            ) : error ? (
              <div style={{ color: 'red', padding: '20px', textAlign: 'center' }}>
                  Không có khóa học!
              </div>
            ) : (
              <Row gutter={[16, 24]}>
                {data?.map((course) => (
                  <Col key={course.id} xs={24} sm={12} md={8} lg={6}>
                    <CourseComponent
                      id={course.id}
                      title={course.title}
                      price={course.price}
                      auth={course.auth}
                      image={course.image}
                      time={course.time}
                    />
                  </Col>
                ))}
              </Row>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
