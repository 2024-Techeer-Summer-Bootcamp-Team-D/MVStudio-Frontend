import React, { useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import '../styles/slider.css';
import Slider from 'react-slick';

const WholeContainer = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url('https://i.ibb.co/k0wLXnC/Sound-Wave.gif') no-repeat center
      center fixed;
    background-size: cover;
    filter: blur(0.7rem) brightness(40%);
  }
`;

const FirstSection = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  gap: 15rem;
`;

const SecondSection = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  gap: 8rem;
`;

const ThirdSection = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  gap: 8rem;
`;

const FourthSection = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  gap: 10rem;
`;

const FifthSection = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const SixthSection = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const slideUp = keyframes`
  0% {
    opacity: 0;
    transform: translateY(50px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideDown = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-50px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Section = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  scroll-snap-align: start;
  animation: ${(props) =>
      props.visible ? (props.direction === 'up' ? slideDown : slideUp) : 'none'}
    1s forwards;
`;

const Pagination = styled.div`
  position: fixed;
  right: 2%;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  z-index: 1000;
`;

const PaginationDot = styled.div`
  width: 1rem;
  height: 1rem;
  background-color: ${(props) => (props.active ? '#37006e' : '#999')};
  border-radius: 50%;
  cursor: pointer;
`;

const Title = styled.div`
  color: white;
  font-size: 6rem;
  position: relative;
  font-weight: 700;
  font-family: 'suit';
  margin-bottom: 17rem;
`;

const FirstText = styled.div`
  color: white;
  font-size: 4rem;
  position: relative;
  font-weight: 700;
  font-family: 'suit';
  margin-top: 7rem;
  filter: brightness(150%);
`;

const GreyText = styled.div`
  color: gray;
`;

const PurpleText = styled.div`
  color: #421168;
`;

const Mac1 = styled.img`
  width: 40%;
  height: 45%;
  position: relative;
  filter: brightness(150%);
`;

const SecondText = styled.div`
  color: white;
  font-size: 3.5rem;
  position: relative;
  font-weight: 700;
  font-family: 'suit';
  filter: brightness(150%);
`;

const Mac2 = styled.img`
  width: 40%;
  height: 45%;
  position: relative;
  filter: brightness(150%);
`;

const ThirdText = styled.div`
  color: white;
  font-size: 3.5rem;
  position: relative;
  font-weight: 700;
  font-family: 'suit';
  filter: brightness(150%);
`;

const Connect = styled.div`
  display: flex;
`;

const Insta = styled.img`
  width: 35%;
  height: 70%;
  position: relative;
`;

const FourthText = styled.div`
  color: white;
  font-size: 3rem;
  position: relative;
  font-weight: 700;
  font-family: 'suit';
  filter: brightness(150%);
`;

const FifthText = styled.div`
  color: white;
  font-size: 4rem;
  font-weight: 700;
  font-family: 'suit';
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 6rem;
`;

const ButtonContainer = styled.div`
  margin: 4rem;
  text-align: center;
`;

const Button = styled.button`
  width: 12.5rem;
  font-size: 1.5rem;
  font-weight: 600;
  color: #fff;
  cursor: pointer;
  height: 3.2rem;
  text-align: center;
  border: none;
  background-size: 300% 100%;
  border-radius: 3rem;
  transition: all 0.4s ease-in-out;
  background-image: linear-gradient(
    to right,
    #20004e,
    #37006e,
    #4600be,
    #32005a
  );
  box-shadow: 0 4px 15px 0 rgba(81, 39, 139, 0.75);

  &:hover {
    background-position: 100% 0;
    transition: all 0.4s ease-in-out;
  }

  &:focus {
    outline: none;
  }
`;

// const MusicVideoListContainer = styled.div`
//   width: 97%;
//   height: 100%;
//   display: flex;
//   flex-direction: column;
//   text-align: center;
//   justify-content: flex-end;
//   overflow: hidden;
// `;

// const scrollLeft = keyframes`
//   0% {
//     transform: translateX(0);
//   }
//   100% {
//     transform: translateX(-100%);
//   }
// `;

// const scrollRight = keyframes`
//   0% {
//     transform: translateX(0);
//   }
//   100% {
//     transform: translateX(100%);
//   }
// `;

// const MusicVideoList = styled.div`
//   width: 100%;
//   height: 15%;
//   display: flex;
//   gap: 1rem;
//   margin-bottom: 2rem;
//   animation: ${(props) =>
//       props.direction === 'right' ? scrollRight : scrollLeft}
//     30s linear infinite;
// `;

// const MusicVideoListCenter = styled.div`
//   width: 100%;
//   height: 15%;
//   display: flex;
//   gap: 1rem;
//   margin-bottom: 2rem;
//   animation: ${(props) =>
//       props.direction === 'right' ? scrollRight : scrollLeft}
//     30s linear infinite;
// `;

// const MusicVideoListBox = styled.img`
//   width: 15rem;
//   height: 9rem;
//   background-color: white;
//   border-radius: 0.4rem;
//   flex-shrink: 0;
// `;

const FifthSectionText = styled.p`
  font-size: 3rem;
  color: white;
  font-family: suit;
  font-weight: 700;
  line-height: 1.5;
  margin-bottom: 2rem;
`;

const OnBoardingPage = () => {
  const navigate = useNavigate();
  const sectionsRef = useRef([]);
  const [currentSection, setCurrentSection] = useState(0);
  const [scrollDirection, setScrollDirection] = useState(null);

  const settings = {
    focusOnSelect: true,
    infinite: true,
    slidesToShow: 10,
    slidesToScroll: 1,
    speed: 500,
  };

  const scrollToSection = (index) => {
    const section = sectionsRef.current[index];
    if (section) {
      const sectionRect = section.getBoundingClientRect();
      const offset =
        sectionRect.top +
        window.pageYOffset -
        window.innerHeight / 2 +
        sectionRect.height / 2;

      window.scrollTo({
        top: offset,
        behavior: 'smooth',
      });
    }
  };

  const handleScroll = (event) => {
    if (event.deltaY > 0 && currentSection < sectionsRef.current.length - 1) {
      setScrollDirection('down');
      setCurrentSection((prev) => prev + 1);
    } else if (event.deltaY < 0 && currentSection > 0) {
      setScrollDirection('up');
      setCurrentSection((prev) => prev - 1);
    }
  };

  useEffect(() => {
    window.addEventListener('wheel', handleScroll);
    return () => {
      window.removeEventListener('wheel', handleScroll);
    };
  }, [currentSection]);

  useEffect(() => {
    scrollToSection(currentSection);
  }, [currentSection]);

  // const musicVideos1 = [
  //   'https://i.ibb.co/c2q533c/dummy9.webp',
  //   'https://i.ibb.co/ysNfRP7/dummy8.webp',
  //   'https://i.ibb.co/ck4s16h/dummy7.webp',
  //   'https://i.ibb.co/wr0Qf1d/dummy6.webp',
  //   'https://i.ibb.co/RjCyvNX/dummy5.webp',
  //   'https://i.ibb.co/Bfvtv9S/dummy4.webp',
  //   'https://i.ibb.co/zRvDs4n/dummy3.webp',
  //   'https://i.ibb.co/8rR2GNY/dummy2.webp',
  //   'https://i.ibb.co/XjFTCNZ/dummy1.webp',
  //   'https://i.ibb.co/D9152b6/dummy12.webp',
  //   'https://i.ibb.co/ZTZ402V/dummy11.webp',
  //   'https://i.ibb.co/QQWHDWn/dummy10.webp',
  //   'https://i.ibb.co/DkxF5fF/qwd-jpb.webp',
  //   'https://i.ibb.co/rm30n24/efm.webp',
  // ];

  // const musicVideos2 = [
  //   'https://i.ibb.co/c2q533c/dummy9.webp',
  //   'https://i.ibb.co/ysNfRP7/dummy8.webp',
  //   'https://i.ibb.co/ck4s16h/dummy7.webp',
  //   'https://i.ibb.co/wr0Qf1d/dummy6.webp',
  //   'https://i.ibb.co/RjCyvNX/dummy5.webp',
  //   'https://i.ibb.co/Bfvtv9S/dummy4.webp',
  //   'https://i.ibb.co/zRvDs4n/dummy3.webp',
  //   'https://i.ibb.co/8rR2GNY/dummy2.webp',
  //   'https://i.ibb.co/XjFTCNZ/dummy1.webp',
  //   'https://i.ibb.co/D9152b6/dummy12.webp',
  //   'https://i.ibb.co/ZTZ402V/dummy11.webp',
  //   'https://i.ibb.co/QQWHDWn/dummy10.webp',
  //   'https://i.ibb.co/DkxF5fF/qwd-jpb.webp',
  //   'https://i.ibb.co/rm30n24/efm.webp',
  // ];

  // const musicVideos3 = [
  //   'https://i.ibb.co/jZC1m8q/g.webp',
  //   'https://i.ibb.co/7YxZwtQ/f.webp',
  //   'https://i.ibb.co/vj4N7Kg/b.webp',
  //   'https://i.ibb.co/wQs8HBx/d.webp',
  //   'https://i.ibb.co/wLF0GfS/c.webp',
  //   'https://i.ibb.co/q9W2Qhx/b1.webp',
  //   'https://i.ibb.co/ryzdP1R/a.webp',
  //   'https://i.ibb.co/NYthwKK/3c.webp',
  //   'https://i.ibb.co/Rb0nDnb/k.webp',
  //   'https://i.ibb.co/GnpZFsB/k2.webp',
  //   'https://i.ibb.co/1XjWb1Y/k3.webp',
  //   'https://i.ibb.co/zGQRpRk/new1.webp',
  //   'https://i.ibb.co/GkKxH84/new2.jpg',
  //   'https://i.ibb.co/Wxxs7Sj/new3.webp',
  // ];

  return (
    <WholeContainer>
      <Pagination>
        {[...Array(6)].map((_, index) => (
          <PaginationDot
            key={index}
            active={currentSection === index}
            onClick={() => setCurrentSection(index)}
          />
        ))}
      </Pagination>
      {[...Array(6)].map((_, index) => (
        <Section
          key={index}
          data-index={index}
          ref={(el) => {
            sectionsRef.current[index] = el;
          }}
          visible={currentSection === index}
          direction={scrollDirection}
        >
          {index === 0 && (
            <FirstSection>
              <Title>MVStudio</Title>
              <FirstText>
                <GreyText>
                  단
                  <br />
                  하나뿐인,
                  <br />
                </GreyText>
                나만의
                <br />
                뮤직비디오
                <br />
              </FirstText>
            </FirstSection>
          )}
          {index === 1 && (
            <SecondSection>
              <SecondText>
                <GreyText>당신의 아이디어,</GreyText>
                모두 여기에.
              </SecondText>
              <Mac1 src="https://i.ibb.co/7NqqQkk/Second-Page-Mac-removebg-preview.png" />
            </SecondSection>
          )}
          {index === 2 && (
            <ThirdSection>
              <Mac2 src="https://i.ibb.co/h9R1pCh/qwdwqdqwd-removebg-preview.png" />
              <ThirdText>
                <GreyText>
                  힙합부터
                  <br />
                  재즈까지,
                </GreyText>
                <Connect>
                  <PurpleText>유니크한</PurpleText>&nbsp;뮤직비디오
                </Connect>
              </ThirdText>
            </ThirdSection>
          )}
          {index === 3 && (
            <FourthSection>
              <FourthText>
                <Connect>
                  <GreyText>나만의 뮤직비디오</GreyText>를
                </Connect>
                <Connect>
                  <PurpleText>소셜 계정</PurpleText>에
                </Connect>
                손쉽게 공유
              </FourthText>
              <Insta src="https://i.ibb.co/WcQcFpM/qqefmqklem-removebg-preview.png" />
            </FourthSection>
          )}
          {index === 4 && (
            <FifthSection>
              {/* <MusicVideoListContainer> */}
              <FifthSectionText>
                당신을 기다리는
                <br />
                수많은 뮤직비디오
              </FifthSectionText>
              <div className="slider-container">
                <Slider {...settings}>
                  <div>
                    <h3>1 2 3 4 </h3>
                  </div>
                  <div>
                    <h3>2</h3>
                  </div>
                  <div>
                    <h3>3</h3>
                  </div>
                  <div>
                    <h3>4</h3>
                  </div>
                  <div>
                    <h3></h3>
                  </div>
                </Slider>
              </div>
              {/* <MusicVideoList direction="left">
                  {musicVideos1.map((url, idx) => (
                    <MusicVideoListBox key={idx} src={url} />
                  ))}
                </MusicVideoList>
                <MusicVideoListCenter direction="right">
                  {[...musicVideos2].reverse().map((url, idx) => (
                    <MusicVideoListBox key={idx} src={url} />
                  ))}
                </MusicVideoListCenter>

                <MusicVideoList direction="left">
                  {musicVideos3.map((url, idx) => (
                    <MusicVideoListBox key={idx} src={url} />
                  ))}
                </MusicVideoList>
              </MusicVideoListContainer> */}
            </FifthSection>
          )}
          {index === 5 && (
            <SixthSection>
              <FifthText>
                모든 기능이 준비되어 있으니,
                <br /> 지금 한번 시도해 보세요.
                <ButtonContainer>
                  <Button
                    onClick={() => {
                      navigate('/auth');
                    }}
                  >
                    Start
                  </Button>
                </ButtonContainer>
              </FifthText>
            </SixthSection>
          )}
        </Section>
      ))}
    </WholeContainer>
  );
};

export default OnBoardingPage;
