/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { getOnboarding } from '@/api/onboarding';

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
    background: url('https://i.ibb.co/QCwvsS4/Sound-Wave-Slow.gif') no-repeat
      center center fixed;
    background-size: cover;
    filter: blur(0.7rem) brightness(25%);
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

  scroll-snap-align: start;
  animation: ${(props) =>
      props.visible ? (props.direction === 'up' ? slideDown : slideUp) : 'none'}
    forwards;
`;

const Pagination = styled.div`
  position: fixed;

  right: 2%;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const PaginationDot = styled.div`
  width: 0.6rem;
  height: 0.6rem;
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

const PurpleText = styled.p`
  color: #7208c3;
`;

const Redtext = styled.p`
  color: #941d1d;
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

const MusicVideoListContainer = styled.div`
  width: 94%;
  height: 100%;
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  overflow: hidden;
`;

const MusicVideoListBox = styled.img`
  width: 3%;
  height: 80%;
  background-color: white;
  border-radius: 0.4rem;
  flex-shrink: 0;
  margin-left: 2rem;
`;

const FifthSectionText = styled.p`
  font-size: 3.5rem;
  color: white;
  font-family: suit;
  font-weight: 700;
  line-height: 1.5;
  margin-bottom: 5rem;
`;

const MusicVideoList = ({ direction, urls }) => {
  const listRef = useRef();

  useEffect(() => {
    const list = listRef.current;
    let scrollAmount = 0;
    const speed = 0.7;

    const scrollStep = () => {
      scrollAmount += direction === 'right' ? speed : -speed;
      list.scrollLeft = scrollAmount;
      if (scrollAmount >= list.scrollWidth / 2) {
        scrollAmount = 0;
      } else if (scrollAmount <= 0) {
        scrollAmount = list.scrollWidth / 2;
      }
      requestAnimationFrame(scrollStep);
    };

    requestAnimationFrame(scrollStep);

    return () => {
      cancelAnimationFrame(scrollStep);
    };
  }, [direction]);

  return (
    <div
      ref={listRef}
      style={{
        display: 'flex',
        overflow: 'hidden',
        width: '100%',
        height: '20%',
      }}
    >
      <div style={{ display: 'flex', flexShrink: 0 }}>
        {urls.map((url, idx) => (
          <MusicVideoListBox key={idx} src={url} />
        ))}
        {urls.map((url, idx) => (
          <MusicVideoListBox key={idx + urls.length} src={url} />
        ))}
      </div>
    </div>
  );
};

const OnBoardingPage = () => {
  const navigate = useNavigate();
  const sectionsRef = useRef([]);
  const [currentSection, setCurrentSection] = useState(0);
  const [scrollDirection, setScrollDirection] = useState(null);
  const [scrollLock, setScrollLock] = useState(false);
  const [musicVideos1, setMusicVideos1] = useState([]);
  const [musicVideos2, setMusicVideos2] = useState([]);
  const [musicVideos3, setMusicVideos3] = useState([]);

  useEffect(() => {
    const fetchMusicVideos = async () => {
      try {
        const data1 = await getOnboarding(1, 14);
        const data2 = await getOnboarding(2, 14);
        const data3 = await getOnboarding(3, 14);

        setMusicVideos1(data1.cover_images.map((data) => data.cover_image));
        setMusicVideos2(data2.cover_images.map((data) => data.cover_image));
        setMusicVideos3(data3.cover_images.map((data) => data.cover_image));
      } catch (error) {
        console.error('뮤직비디오 정보를 가져오는 중 오류 발생:', error);
      }
    };

    fetchMusicVideos();
  }, []);

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
    if (scrollLock) {
      event.preventDefault();
      return;
    }

    if (event.deltaY > 0 && currentSection < sectionsRef.current.length - 1) {
      setScrollDirection('down');
      setCurrentSection((prev) => prev + 1);
    } else if (event.deltaY < 0 && currentSection > 0) {
      setScrollDirection('up');
      setCurrentSection((prev) => prev - 1);
    }

    setScrollLock(true);
    setTimeout(() => setScrollLock(false), 500);
  };

  useEffect(() => {
    window.addEventListener('wheel', handleScroll, { passive: false });
    return () => {
      window.removeEventListener('wheel', handleScroll);
    };
  }, [currentSection, scrollLock]);

  useEffect(() => {
    scrollToSection(currentSection);
  }, [currentSection]);

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
                  <Redtext>소셜 계정</Redtext>에
                </Connect>
                손쉽게 공유
              </FourthText>
              <Insta src="https://i.ibb.co/WcQcFpM/qqefmqklem-removebg-preview.png" />
            </FourthSection>
          )}
          {index === 4 && (
            <FifthSection>
              <MusicVideoListContainer>
                <FifthSectionText>
                  당신을 기다리는
                  <br />
                  수많은 뮤직비디오
                </FifthSectionText>

                {/* 첫 번째 커버 */}
                <MusicVideoList direction="left" urls={musicVideos1} />

                {/* 두 번째 커버 */}
                <MusicVideoList direction="right" urls={musicVideos2} />

                {/* 세 번째 커버 */}
                <MusicVideoList direction="left" urls={musicVideos3} />
              </MusicVideoListContainer>
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
