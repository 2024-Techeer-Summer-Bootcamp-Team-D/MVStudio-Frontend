/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Swiper from 'swiper';
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';

// Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const SwiperContainer = styled.div`
  width: 100%;
  padding-top: 50px;
  padding-bottom: 50px;
`;

const SwiperSlide = styled.div`
  background-position: center;
  background-size: cover;
  width: 20%;
  height: 20%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const SlideImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10%;
  transition: all 0.3s ease;

  ${(props) =>
    props.selected &&
    `
    border: 3px solid #ffffff;
    filter: brightness(0.7);
  `}
`;

const SlideLabel = styled.span`
  color: white;
  font-weight: bold;
  font-size: 1.1rem;
  text-align: center;
  margin-top: 0.5rem;
`;

const InstSwiperComponent = ({
  options,
  //   selectedInstruments,
  instrumentsId,
  onInstrumentClick,
}) => {
  const swiperElRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [swiper, setSwiper] = useState(null);

  useEffect(() => {
    if (swiperElRef.current && !swiper) {
      const swiperInstance = new Swiper(swiperElRef.current, {
        loop: true,
        loopedSlides: 3,
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        initialSlide: 0,
        coverflowEffect: {
          rotate: 20,
          stretch: 20,
          depth: 100,
          modifier: 0,
          slideShadows: true,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        modules: [EffectCoverflow, Pagination, Navigation],
      });

      setSwiper(swiperInstance);
      setIsVisible(true);
    }

    return () => {
      if (swiper) {
        swiper.destroy();
        setSwiper(null);
      }
    };
  }, []);

  useEffect(() => {
    if (swiper && options.length > 0) {
      swiper.update();
    }
  }, [swiper, options]);

  return (
    <SwiperContainer
      ref={swiperElRef}
      className="mySwiper"
      isVisible={isVisible}
    >
      <div className="swiper-wrapper">
        {options?.map((option) => (
          <SwiperSlide key={option.id} className="swiper-slide">
            <SlideImage
              src={option.instrument_image_url}
              alt={option.instrument_name}
              selected={instrumentsId.includes(option.instrument_id)} // Check if this option is selected
              onClick={() =>
                onInstrumentClick(option.instrument_name, option.instrument_id)
              }
            />
            <SlideLabel>{option.instrument_name}</SlideLabel>
          </SwiperSlide>
        ))}
      </div>
      <div className="swiper-pagination"></div>
      <div className="swiper-button-next"></div>
      <div className="swiper-button-prev"></div>
    </SwiperContainer>
  );
};

export default InstSwiperComponent;
