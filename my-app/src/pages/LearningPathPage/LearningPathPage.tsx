import React, { useEffect } from 'react';
import styles from './Learning.module.scss';
import classNames from 'classnames/bind';
import SidebarMenu from '../../components/feature/SidebarMenu/SidebarMenu';

const cx = classNames.bind(styles);

const LearningPathPage: React.FC = () => {
  useEffect(() => {
    document.title = 'Lộ trình học';
  }, []);
   return (
    <div className={cx('wrapper_learning')}>
      <div className="grid grid-cols-12 gap-4">
        <div className={`${cx('customLeft')} col-span-1`}>
          <div className={cx('wrapper_ul')}>
            <SidebarMenu />
          </div>
        </div>
        <div className={`${cx('customRight')} col-span-11`}>Nội dung bên phải learning</div>
      </div>
    </div>
  );
};

export default LearningPathPage;
