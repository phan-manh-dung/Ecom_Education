import React, { useEffect, useState } from 'react';
import styles from './Home.module.scss';
import classNames from 'classnames/bind';

import { Row, Col, Button, Modal, Input, Space, message } from 'antd';
import SpinnerComponent from '../../components/SpinnerComponent/SpinnerComponent';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faBackward } from '@fortawesome/free-solid-svg-icons';

import { useQuery } from '@tanstack/react-query';

import SidebarMenu from '../../components/feature/SidebarMenu/SidebarMenu';
import SlickSlider from '../../components/feature/SlickSliderComponent/SlickSliderComponent';
import CourseComponent from '../../components/feature/CourseComponent/CourseComponent';
import ModalDetailCourse from '../../components/feature/ModalDetailCourse/ModalDetailCourse';

import { getCourses, getCourseDetail } from '../../api/course/apiCourse';

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

const cx = classNames.bind(styles);

const HomePage = () => {
  const { data, isLoading, error } = useQuery({ queryKey: ['courses'], queryFn: getCourses });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [filteredData, setFilteredData] = useState(data);
  const [isFiltered, setIsFiltered] = useState(false);

  // Modal detail states
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [courseDetail, setCourseDetail] = useState<CourseDetail | undefined>(undefined);
  const [detailLoading, setDetailLoading] = useState(false);

  // Update filtered data when data changes
  useEffect(() => {
    if (data) {
      setFilteredData(data);
    }
  }, [data]);

  // hàm lọc khóa học theo giá
  const handleFilter = () => {
    if (!minPrice && !maxPrice) {
      message.warning('Vui lòng nhập ít nhất một giá trị!');
      return;
    }

    const min = minPrice ? parseInt(minPrice) : 0;
    const max = maxPrice ? parseInt(maxPrice) : Number.MAX_SAFE_INTEGER;

    if (min > max && maxPrice) {
      message.error('Giá tối thiểu không thể lớn hơn giá tối đa!');
      return;
    }

    const filtered = data?.filter((course) => {
      const price = course.price;
      return price >= min && price <= max;
    });

    setFilteredData(filtered);
    setIsFiltered(true);
    setIsModalVisible(false);
    
    if (filtered?.length === 0) {
      message.info('Không có khóa học nào trong khoảng giá này!');
    } else {
      message.success(`Tìm thấy ${filtered?.length} khóa học!`);
    }
  };

  // hàm xóa bộ lọc
  const handleClearFilter = () => {
    setFilteredData(data);
    setIsFiltered(false);
    setMinPrice('');
    setMaxPrice('');
    message.info('Đã xóa bộ lọc!');
  };

  // Hàm xử lý click vào khóa học
  const handleCourseClick = async (courseId: string) => {
    setDetailModalVisible(true);
    setDetailLoading(true);
    
    try {
      const detail = await getCourseDetail(courseId);
      setCourseDetail(detail);
    } catch {
      message.error('Không thể tải thông tin chi tiết khóa học!');
      setDetailModalVisible(false);
    } finally {
      setDetailLoading(false);
    }
  };

  // Hàm đóng modal detail
  const handleCloseDetailModal = () => {
    setDetailModalVisible(false);
    setCourseDetail(undefined);
  };

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
            <div className={cx('title')} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>Các khóa học của F7</span>
              <Space className={cx('wrapper_space')}>
                <Button 
                  type="primary" 
                  onClick={() => setIsModalVisible(true)}
                  className={cx('btn_filter')}
                >
                  <FontAwesomeIcon icon={faFilter} style={{ width: '15px', height: '15px' , color:'black' }} />
                  Khoảng giá
                </Button>
                {isFiltered && (
                  <Button 
                    onClick={handleClearFilter}
                    className={cx('btn_filter', 'btn_back')}
                  >
                    <FontAwesomeIcon icon={faBackward} style={{ width: '15px', height: '15px' , color:'white' }} />
                    Quay lại
                  </Button>
                )}
              </Space>
            </div>
            {isLoading ? (
              <SpinnerComponent />
            ) : error ? (
              <div style={{ color: 'red', padding: '20px', textAlign: 'center' }}>
                  Không có khóa học!
              </div>
            ) : (
              <>
                {filteredData && filteredData.length > 0 ? (
                  <Row gutter={[16, 24]}>
                    {filteredData.map((course) => (
                      <Col key={course.id} xs={24} sm={12} md={8} lg={6}>
                        <CourseComponent
                          id={course.id}
                          title={course.title}
                          price={course.price}
                          auth={course.auth}
                          image={course.image}
                          time={course.time}
                          onCourseClick={handleCourseClick}
                        />
                      </Col>
                    ))}
                  </Row>
                ) : (
                  <div style={{ padding: '20px', textAlign: 'center', color: '#666' }}>
                    {isFiltered ? 'Không có khóa học nào trong khoảng giá này!' : 'Không có khóa học!'}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Modal lọc giá */}
      <Modal
        title="Lọc theo giá"
        open={isModalVisible}
        onOk={handleFilter}
        onCancel={() => setIsModalVisible(false)}
        okText="Áp dụng"
        cancelText="Hủy"
      >
        <Space direction="vertical" style={{ width: '100%' }}>
          <div>
            <label>Giá tối thiểu (VNĐ)</label>
            <Input
              placeholder="Nhập giá tối thiểu"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              type="number"
              style={{ marginTop: '8px' }}
            />
          </div>
          <div>
            <label>Giá tối đa (VNĐ)</label>
            <Input
              placeholder="Nhập giá tối đa"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              type="number"
              style={{ marginTop: '8px' }}
            />
          </div>
        </Space>
      </Modal>

      {/* Modal chi tiết khóa học */}
      <ModalDetailCourse
        visible={detailModalVisible}
        onClose={handleCloseDetailModal}
        courseData={courseDetail}
        loading={detailLoading}
      />
    </div>
  );
};

export default HomePage;
