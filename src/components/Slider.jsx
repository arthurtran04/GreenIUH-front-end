import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Slider.css';

import image1 from '../assets/images/flowers-landscape.jpg';
import image2 from '../assets/images/sunset-mountain.jpg';
import image3 from '../assets/images/windows-xp-bliss.jpg';

const slideData = [
  {
    image: image1,
    slogan: 'Hành động nhỏ, ý nghĩa lớn. Hãy tái chế vì một tương lai xanh.',
  },
  {
    image: image2,
    slogan: 'Mỗi lon nhôm được tái chế là một bước tiến tới hành tinh sạch hơn.',
  },
  {
    image: image3,
    slogan: 'Biến rác thải thành tài nguyên. Bắt đầu từ những việc đơn giản nhất.',
  },
];

const ImageSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    fade: true,
    cssEase: 'linear',
    pauseOnHover: false,
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>
        {slideData.map((slide, index) => (
          <div key={index} className="slide">
            <img src={slide.image} alt={`Slide ${index + 1}`} className="slide-image" />
            <div className="slide-content">
              <h2>{slide.slogan}</h2>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ImageSlider;


