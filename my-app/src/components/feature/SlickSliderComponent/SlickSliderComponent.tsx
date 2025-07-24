import React from 'react';
import styles from './SlickSlide.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import banner_web_react from '../../../../public/assets/Banner_web_ReactJS.png';
import banner_8duan_react from '../../../../public/assets/banner8duanthuchanh.png';
import banner_javascript from '../../../../public/assets/javascriptpro.png';

const banners = [
  {
    image: banner_web_react,
    title: "F7 trên Facebook của chúng tôi.",
    description:
      "F7 được nhắc tới ở mọi nơi, ở đâu có cơ hội việc làm cho nghề IT và có những con người yêu thích lập trình F7 sẽ ở đó.",
    button: { text: "THAM GIA NHÓM", link: "https://facebook.com/groups/f8official" },
    background: "linear-gradient(90deg, #0099ff 0%, #00c6ff 100%)"
  },
  {
    image: banner_8duan_react,
    title: "Khóa học ReactJS thực chiến",
    description: "Tham gia khóa học ReactJS thực chiến để nâng cao kỹ năng lập trình để có cơ hội việc làm tốt hơn.",
    button: { text: "XEM CHI TIẾT", link: "/courses/reactjs" },
    background: "linear-gradient(90deg, #ff512f 0%, #dd2476 100%)"
  },
  {
    image: banner_javascript,
    title: "JavaScript Pro - Hero",
    description: "Nâng cao kỹ năng JavaScript với các bài học chuyên sâu và thực hành dự án thực tế nâng cao tư duy lập trình.",
    button: { text: "HỌC NGAY", link: "/courses/javascript" },
    background: "linear-gradient(90deg, #a770ef 0%, #f6d365 100%)"
  },
];


const SlickSliderComponent: React.FC = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="w-full py-4" style={{ overflowX: 'hidden' }}>
      <div className="max-w-6xl mx-auto relative">
        <Slider {...settings}>
          {banners.map((banner, idx) => (
            <div key={idx}>
              <div
                className={cx('wrapper_banner', 'flex', 'items-center', 'rounded-3xl', 'overflow-hidden', 'min-h-[260px]', 'relative')}
                style={{ background: banner.background }}
              >
                <div className={cx('content', 'p-8', 'text-white', 'flex-1')}> 
                  <h2 className={cx('title', 'text-3xl', 'font-bold', 'mb-4')}>{banner.title}</h2>
                  <p className={cx('desc', 'mb-6', 'text-lg')}>{banner.description}</p>
                  <a
                    href={banner.button.link}
                    className={cx('button', 'inline-block', 'bg-white', 'text-blue-600', 'font-semibold', 'px-6', 'py-2', 'rounded-lg', 'shadow', 'hover:bg-blue-100', 'transition')}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {banner.button.text}
                  </a>
                </div>
                <div className={cx('image', 'flex-1', 'flex', 'justify-end', 'items-center', 'h-full')}> 
                  <img
                    src={banner.image}
                    alt={banner.title}
                    className={`${cx('img_display')} w-full h-[260px] object-cover object-right rounded-3xl`}
                    draggable={false}
                  />
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default SlickSliderComponent;
