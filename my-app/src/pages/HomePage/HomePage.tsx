import React from 'react';
import styles from './Home.module.scss';
import classNames from 'classnames/bind';

import SidebarMenu from '../../components/feature/SidebarMenu/SidebarMenu';

const cx = classNames.bind(styles);

const HomePage: React.FC = () => {
  return (
    <div className={cx('wrapper_home')}>
      <div className="grid grid-cols-12 gap-4">
        <div className={`${cx('customLeft')} col-span-1`}>
          <div className={cx('wrapper_ul')}>
            <SidebarMenu />
          </div>
        </div>
        <div className={`${cx('customRight')} col-span-11`}>Nội dung bên phải</div>
      </div>
    </div>
  );
};

export default HomePage;
