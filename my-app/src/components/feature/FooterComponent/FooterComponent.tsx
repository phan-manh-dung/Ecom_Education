import React from 'react';
import styles from './Footer.module.scss';
import classNames from 'classnames/bind';
import logof7 from '/public/assets/logof7.png';

const cx = classNames.bind(styles);

const FooterComponent: React.FC = () => {
  return (
    <div className={cx('wrapper_footer')}>
      <div className="grid grid-cols-12 gap-4">
        <div className={'col-span-3'}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src={logof7} width={48} height={48} />
            <h3>Học lập trình để đi làm</h3>
          </div>
          <ul>
            <li>
              <b>Điện thoại:</b> 08 1919 8989
            </li>
            <li>
              <b>Email:</b> phanmanhdung2k3@gmail.com
            </li>
            <li>
              <b>Địa chỉ:</b> Số 1, ngõ 41, Trần Duy Hưng, Cầu Giấy, Hà Nội
            </li>
          </ul>
        </div>
        <div className={'col-span-2'}>
          <h3 style={{ textAlign: 'center' }}>Về F7</h3>
          <ul>
            <li>Giới thiệu</li>
            <li>Liên hệ</li>
            <li>Điều khoản</li>
            <li>Bảo mật</li>
          </ul>
        </div>
        <div className={'col-span-2'}>
          <h3>SẢN PHẨM</h3>
          <ul>
            <li>Game Nester</li>
            <li>Game CSS Diner</li>
            <li>Game CSS Selectors</li>
            <li>Game Froggy</li>
            <li>Game Froggy Pro</li>
            <li>Game Froggy Scoops</li>
          </ul>
        </div>
        <div className={'col-span-2'}>
          <h3>CÔNG CỤ</h3>
          <ul>
            <li>Tạo CV xin việc</li>
            <li>Rút gọn liên kết link</li>
            <li>Clip-path maker</li>
            <li>Snippet Generator</li>
            <li>CSS grip Generator</li>
            <li>Cảnh báo sờ tay lên mặt</li>
          </ul>
        </div>
        <div className={'col-span-3'}>
          <h3>CÔNG TY CỔ PHẦN CÔNG NGHỆ GIÁO DỤC F7</h3>
             <ul>
            <li>
              <b>Mã số thuế:</b> 0292728262
            </li>
            <li>
              <b>Ngày thành lập:</b> 10/07/2025
            </li>
            <li>
              <b>Lĩnh vực hoạt động:</b> Giáo dục, công nghệ - lập trình. Chúng tôi tập trung xây dựng và phát triển các sản phẩm mang lại giá trị cho cộng đồng lập trình viên Việt Nam.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FooterComponent;
