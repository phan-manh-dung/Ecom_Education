import React from 'react';
import SearchComponent from '../SearchComponent/SearchComponent';
import logof7 from '/public/assets/logof7.png';
import styles from './Header.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const HeaderComponent: React.FC = () => {
  return (
    <header className="w-full bg-white">
      <div className="max-w-screen-xl mx-auto flex items-center p-[10px]">
        {/* Logo + Tiêu đề */}
        <div className="flex items-center min-w-[230px]">
          <div className="">
            <img src={logof7} width={48} height={48} alt="Logo" className="w-10 h-10" />
          </div>
          <span className={cx('title')}>
            Học Lập Trình Để Đi Làm
          </span>
        </div>

        {/* Search */}
        <div className="flex-1 flex justify-center mx-4">
          <SearchComponent />
        </div>

        {/* Đăng ký / Đăng nhập */}
        <div className={cx('wrapper-btn')}>
          <button className={cx('btn')}>
            Đăng ký
          </button>
          <button className={cx('btn','btn_register')}>
            Đăng nhập
          </button>
        </div>
      </div>
    </header>
  );
};

export default HeaderComponent;
