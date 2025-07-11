import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faBook, faReceipt } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './SideBar.module.scss';

const cx = classNames.bind(styles);

const SidebarMenu: React.FC = () => {
  return (
   <div className={cx('wrapper_ul')}>
      <ul>
        <li>
          <NavLink to="/" className={({ isActive }) => cx('menuLink', { active: isActive })}>
            <FontAwesomeIcon icon={faHouse} style={{ width: '20px', height: '20px' }} />
            <span>Trang chủ</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/learning-path" className={({ isActive }) => cx('menuLink', { active: isActive })}>
            <FontAwesomeIcon icon={faBook} style={{ width: '20px', height: '20px' }} />
            <span>Lộ trình</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/blog" className={({ isActive }) => cx('menuLink', { active: isActive })}>
            <FontAwesomeIcon icon={faReceipt} style={{ width: '20px', height: '20px' }} />
            <span>Bài viết</span>
          </NavLink>
        </li>
      </ul>
   </div>
  );
};

export default SidebarMenu; 