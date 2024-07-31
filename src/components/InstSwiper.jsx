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
  .swiper-button-next,
  .swiper-button-prev {
    color: rgb(124, 107, 221); // 버튼 색상을 검정색으로 변경

    &::after {
      font-size: 3rem; // 화살표 아이콘 크기 조정
    }
  }
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
  //   const [isVisible, setIsVisible] = useState(false);
  //   const [swiper, setSwiper] = useState(null);

  useEffect(() => {
    const initSwiper = () => {
      if (swiperElRef.current) swiperElRef.current.destroy(true, true);
      swiperElRef.current = new Swiper('.myInstSwiper', {
        loop: true,
        loopedSlides: 0, // 이 값을 슬라이드 개수에 따라 조정하세요
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        initialSlide: 3, // 시작 슬라이드 위치 설정
        coverflowEffect: {
          rotate: 20,
          stretch: 20,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        modules: [EffectCoverflow, Pagination, Navigation],
        on: {
          init: function () {
            this.update(); // Swiper 초기화 후 업데이트
          },
        },
      });
    };

    // 약간의 지연 후 Swiper 초기화
    const timer = setTimeout(() => {
      initSwiper();
    }, 100);

    return () => clearTimeout(timer);
  }, [options]);

  return (
    <SwiperContainer ref={swiperElRef} className="mySwiper">
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
