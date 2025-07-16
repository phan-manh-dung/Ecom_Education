import React, { useState, useEffect, useRef } from 'react';
import { Input } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { mockCourses } from '../../../mockData/courses';
import type { CourseDetail } from '../ModalDetailCourse/ModalDetailCourse';

import styles from './Search.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

type Course = CourseDetail;

interface SearchComponentProps {
  onCourseClick?: (course: Course) => void;
}

const SearchComponent: React.FC<SearchComponentProps> = ({ onCourseClick }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<Course[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!searchTerm) {
      setResults([]);
      setShowDropdown(false);
      setIsSearching(false);
      return;
    }
    setIsSearching(true);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      const filtered = mockCourses.filter((course) => course.title.toLowerCase().includes(searchTerm.toLowerCase()));
      setResults(filtered);
      setShowDropdown(true);
      setIsSearching(false);
    }, 1000);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [searchTerm]);

  return (
    <div style={{ position: 'relative', width: '100%' }} className="w-full flex justify-center h-[40px] ">
      <Input
        style={{ borderRadius: '20px', width: '63%' }}
        className="w-1/2"
        placeholder="Tìm kiếm khóa học, bài viết, video, ..."
        prefix={
          isSearching ? (
            <FontAwesomeIcon icon={faSpinner} spin className={cx('spinner_icon')} style={{ margin: '15px', width: '15px', height: '15px', color: '#999', opacity: 3.6 }} />
          ) : (
            <FontAwesomeIcon icon={faSearch} className={cx('search_icon')} style={{ margin: '15px', width: '15px', height: '15px', color: '#999', opacity: 3.6 }} />
          )
        }
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onFocus={() => searchTerm && setShowDropdown(true)}
        onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
      />
      {showDropdown && (
        <div className={cx('wrapper_dropdown')}>
          {results.length > 0 ? (
            results.map((course) => (
              <div
                className={cx('dropdown_item')}
                key={course.id}
                onClick={() => {
                  onCourseClick?.(course);
                  setShowDropdown(false);
                }}
              >
                <img src={course.image} alt={course.title} width={32} height={32} />
                <span>{course.title}</span>
              </div>
            ))
          ) : (
            <div style={{ padding: 12, color: '#888' }}>Không tìm thấy khóa học nào.</div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchComponent;
