import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import styled from './styles.module.scss';

const settings = {
  infinite: true,
  dots: true,
  slidesToShow: 1,
  arrows: false,
  slidesToScroll: 1,
  lazyLoad: true
};

export function GaleriaMobile({images}) {
  
  return (
    <Slider {...settings} className={styled.container}>
      {images.map((item) => (
        <div key={item.id} className={styled.box_image}>
          <img className={styled.image} src={item.url}  alt={item.titulo}/>
        </div>
      ))}
    </Slider>
  );
}
