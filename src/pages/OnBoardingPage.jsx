/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { getOnboarding } from '@/api/onboarding';
import { Helmet } from 'react-helmet';

const WholeContainer = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
  overflow: hidden;
`;

const SectionContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  gap: ${(props) => props.gap || '0'};
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

const TextBox = styled.div`
 display:flex;
 flex-direction:column;
 align-items:start;
 width:100%;
 height:100%;
 

`;
const PaginationDot = styled.div`
  width: 0.6rem;
  height: 0.6rem;
  background-color: ${(props) => (props.active ? '#37006e' : '#999')};
  border-radius: 50%;
  cursor: pointer;
`;

const Title1 = styled.div`
  color: white;
  font-size: 1.8rem;
  font-weight: 500;
  font-family: 'suit';
  margin-left:2rem;
  margin-top:2rem;

  
`;


const Text1 = styled.div`
  color: white;
  font-size: ${(props) => props.fontSize || '4rem'};
  font-weight: 700;
  font-family: 'suit';
  filter: brightness(150%);
  ${(props) => props.margin && `margin-top: ${props.margin};`}
  margin-top:20rem;
  margin-left:8rem;
`;
const Text = styled.div`
  color: white;
  font-size: ${(props) => props.fontSize || '4rem'};
  font-weight: 700;
  font-family: 'suit';
  filter: brightness(150%);
  ${(props) => props.margin && `margin-top: ${props.margin};`}
`;

const GreyText = styled.div`
  color: gray;
`;

const PurpleText = styled.p`
  color: #7208c3;
`;

const RedText = styled.p`
  color: #941d1d;
`;

const GifBox = styled.img`
  border-radius: 0.5rem;
  border: 2px solid rgba(211, 211, 211, 0.2);
  width: 60rem;
  height: 35rem;
  transition:
    width 0.3s ease,
    height 0.3s ease;
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
  box-shadow: 0 4px 15px rgba(81, 39, 139, 0.75);

  &:hover {
    background-position: 100% 0;
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
        {urls.concat(urls).map((url, idx) => (
          <MusicVideoListBox key={idx} src={url} />
        ))}
      </div>
    </div>
  );
};

const gifArray = [
  'https://i.ibb.co/qjV5n4N/image.gif',
  'https://i.ibb.co/XFSB4gg/jpg.gif',
  'https://i.ibb.co/X7xMc9D/1.gif',
];

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
    setTimeout(() => setScrollLock(false), 1000);
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
      <Helmet>
        <meta property="og:title" content="MVStudio" />
        <meta property="og:url" content="https://mvstudio.pro" />
        <meta
          property="og:image"
          content="https://i.ibb.co/2Sdtxhh/MVStudio.png"
        />
        <meta property="og:image:alt" content="MVStudio" />
        <meta
          property="og:description"
          content="Let's Create Music videos and Share them Together!"
        />
      </Helmet>
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
            <SectionContainer
            style={{
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <video
              autoPlay
              loop
              muted
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                zIndex: -2,
              }}
            >
              <source src="https://github.com/user-attachments/assets/bc2ca5cf-1fb4-42c5-bf39-7c6ac0942101" type="video/mp4" />
            </video>
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 100%)',
                zIndex: -2,
              }}
            />
            <TextBox>
            <Title1>MVStudio</Title1>
            <Text1 fontSize="3rem" margin="7rem">
              <GreyText>
                단 하나뿐인,
                <br />
              </GreyText>
              나만의 뮤직비디오
              <br />
            </Text1>
            </TextBox>
          </SectionContainer>
 
          )}
          {index === 1 && (
            <SectionContainer
             gap="8rem" 
             style={{
              position: 'relative',
              overflow: 'hidden',
            }}>
              <div
    style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundImage: 'url(https://i.ibb.co/k0wLXnC/Sound-Wave.gif)',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      filter: 'blur(0.7rem) brightness(25%)',
      zIndex: -2,
    }}
  />
              <Text fontSize="3.5rem">
                <GreyText>당신의 아이디어,</GreyText>
                모두 여기에.
              </Text>
              <GifBox
                src={gifArray[1]}
                
              />
            </SectionContainer>
          )}
          {index === 2 && (
           <SectionContainer
           gap="8rem" 
           style={{
            position: 'relative',
            overflow: 'hidden',
          }}>
            <div
  style={{
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundImage: 'url(https://i.ibb.co/k0wLXnC/Sound-Wave.gif)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    filter: 'blur(0.7rem) brightness(25%)',
    zIndex: -2,
  }}
/>
              <GifBox
                src={gifArray[0]}
               
              />
              <Text fontSize="3.5rem">
                <GreyText>
                  힙합부터
                  <br />
                  재즈까지,
                </GreyText>
                <PurpleText>유니크한</PurpleText>뮤직비디오
              </Text>
            </SectionContainer>
          )}
          {index === 3 && (
            <SectionContainer
            gap="8rem" 
            style={{
             position: 'relative',
             overflow: 'hidden',
           }}>
             <div
   style={{
     position: 'absolute',
     top: 0,
     left: 0,
     width: '100%',
     height: '100%',
     backgroundImage: 'url(https://i.ibb.co/k0wLXnC/Sound-Wave.gif)',
     backgroundSize: 'cover',
     backgroundRepeat: 'no-repeat',
     backgroundPosition: 'center',
     filter: 'blur(0.7rem) brightness(25%)',
     zIndex: -2,
   }}
 />
              <Text fontSize="3.5rem">
                <GreyText>나만의 뮤직비디오를</GreyText>
                <RedText>소셜 계정</RedText>에 손쉽게 공유
              </Text>
              <GifBox
                src={gifArray[2]}
                
              />
            </SectionContainer>
          )}
          {index === 4 && (
            <SectionContainer
            gap="8rem" 
            style={{
             position: 'relative',
             overflow: 'hidden',
           }}>
             <div
   style={{
     position: 'absolute',
     top: 0,
     left: 0,
     width: '100%',
     height: '100%',
     backgroundImage: 'url(https://i.ibb.co/k0wLXnC/Sound-Wave.gif)',
     backgroundSize: 'cover',
     backgroundRepeat: 'no-repeat',
     backgroundPosition: 'center',
     filter: 'blur(0.7rem) brightness(25%)',
     zIndex: -2,
   }}
 />ㄴㄴ
              <MusicVideoListContainer>
                <FifthSectionText>
                  당신을 기다리는
                  <br />
                  수많은 뮤직비디오
                </FifthSectionText>
                <MusicVideoList direction="left" urls={musicVideos1} />
                <MusicVideoList direction="right" urls={musicVideos2} />
                <MusicVideoList direction="left" urls={musicVideos3} />
              </MusicVideoListContainer>
            </SectionContainer>
          )}
          {index === 5 && (
            <SectionContainer
            style={{
             position: 'relative',
             overflow: 'hidden',
           }}>
             <div
   style={{
     position: 'absolute',
     top: 0,
     left: 0,
     width: '100%',
     height: '100%',
     backgroundImage: 'url(https://i.ibb.co/k0wLXnC/Sound-Wave.gif)',
     backgroundSize: 'cover',
     backgroundRepeat: 'no-repeat',
     backgroundPosition: 'center',
     filter: 'blur(0.7rem) brightness(25%)',
     zIndex: -2,
   }}
 />
              <Text fontSize="3.5rem">
                모든 기능이 준비되어 있으니,
                <br /> 지금 한번 시도해 보세요.
                <ButtonContainer>
                  <Button onClick={() => navigate('/auth')}>Start</Button>
                </ButtonContainer>
              </Text>
            </SectionContainer>
          )}
        </Section>
      ))}
    </WholeContainer>
  );
};

export default OnBoardingPage;
