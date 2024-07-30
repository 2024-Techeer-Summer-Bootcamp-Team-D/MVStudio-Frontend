/* eslint-disable react/prop-types */
import React, { useEffect, useRef } from 'react';
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
  width: 15rem;
  height: 15rem;
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
    filter: brightness(0.5);
  `}
`;

const SlideLabel = styled.span`
  color: white;
  font-weight: bold;
  font-size: 1.1rem;
  text-align: center;
  margin-top: 0.5rem;
`;

const GenreSwiperComponent = ({ options, selectedId, onSelect }) => {
  const swiperRef = useRef(null);

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.destroy(true, true);
    }

    swiperRef.current = new Swiper('.mySwiper', {
      loop: true, // 무한 루프 활성화
      loopAdditionalSlides: 1, // 루프 추가 슬라이드 개수
      effect: 'coverflow',
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: 'auto',
      coverflowEffect: {
        rotate: 25,
        stretch: 20,
        depth: 100,
        modifier: 1,
        slideShadows: true,
      },
      //   pagination: {
      //     el: '.swiper-pagination',
      //     clickable: true,
      //   },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      modules: [EffectCoverflow, Pagination, Navigation],
    });
  }, [options]);

  return (
    <SwiperContainer className="mySwiper">
      <div className="swiper-wrapper">
        {options?.map((option) => (
          <SwiperSlide key={option.id} className="swiper-slide">
            <SlideImage
              src={option.genre_image_url}
              alt={option.genre_name}
              selected={selectedId === option.genre_id}
              onClick={() => onSelect(option.genre_id)}
            />
            <SlideLabel>{option.genre_name}</SlideLabel>
          </SwiperSlide>
        ))}
      </div>
      <div className="swiper-pagination"></div>
      <div className="swiper-button-next"></div>
      <div className="swiper-button-prev"></div>
    </SwiperContainer>
  );
};

export default GenreSwiperComponent;
