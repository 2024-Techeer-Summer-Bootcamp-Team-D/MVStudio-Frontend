import React, { useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';

const WholeContainer = styled.div`
  height: 100%;
  width: 100%;
`;

const FirstSection = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
`;

const SecondSection = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  gap: 10rem;
`;

const ThirdSection = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  gap: 10rem;
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
  font-size: 5.5rem;
  position: relative;
  font-weight: 700;
  font-family: 'suit';
  margin-top: 15rem;
  margin-left: 12rem;
`;

const FirstText = styled.div`
  color: white;
  font-size: 3rem;
  position: relative;
  font-weight: 700;
  font-family: 'suit';
  margin-left: 55rem;
  margin-top: 5rem;
`;

const GreyText = styled.div`
  color: gray;
`;

const PurpleText = styled.div`
  color: #421168;
`;

const Mac1 = styled.img`
  width: 45%;
  height: 50%;
  position: relative;
  margin-right: 9rem;
`;

const SecondText = styled.div`
  color: white;
  font-size: 3rem;
  position: relative;
  font-weight: 700;
  font-family: 'suit';
`;

const Mac2 = styled.img`
  width: 45%;
  height: 50%;
  position: relative;
`;

const ThirdText = styled.div`
  color: white;
  font-size: 3rem;
  position: relative;
  font-weight: 700;
  font-family: 'suit';
  margin-right: 20rem;
`;

const Connect = styled.div`
  display: flex;
`;

const Insta = styled.img`
  width: 35%;
  height: 70%;
  position: relative;
  margin-right: 12rem;
`;

const FourthText = styled.div`
  color: white;
  font-size: 3rem;
  position: relative;
  font-weight: 700;
  font-family: 'suit';
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
  margin-top: 8rem;
  margin-right: 16rem;
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

const OnBoardingPage = () => {
  const navigate = useNavigate();
  const sectionsRef = useRef([]);
  const [currentSection, setCurrentSection] = useState(0);
  const [scrollDirection, setScrollDirection] = useState(null);

  const scrollToSection = (index) => {
    sectionsRef.current[index].scrollIntoView({ behavior: 'smooth' });
    setCurrentSection(index);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || window.pageYOffset;
      const sectionHeight = window.innerHeight;
      const currentSectionIndex = Math.round(scrollTop / sectionHeight);
      setScrollDirection(currentSectionIndex > currentSection ? 'down' : 'up');
      setCurrentSection(currentSectionIndex);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [currentSection]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            setCurrentSection(parseInt(entry.target.dataset.index));
          }
        });
      },
      { threshold: 0.5 },
    );

    sectionsRef.current.forEach((section) => {
      if (section) {
        observer.observe(section);
      }
    });

    return () => {
      sectionsRef.current.forEach((section) => {
        if (section) {
          observer.unobserve(section);
        }
      });
    };
  }, []);

  return (
    <WholeContainer>
      <Pagination>
        {[...Array(5)].map((_, index) => (
          <PaginationDot
            key={index}
            active={currentSection === index}
            onClick={() => scrollToSection(index)}
          />
        ))}
      </Pagination>
      {[...Array(5)].map((_, index) => (
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
            <>
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
            </>
          )}
          {index === 1 && (
            <>
              <SecondSection>
                <SecondText>
                  <GreyText>당신의 아이디어,</GreyText>
                  모두 여기에.
                </SecondText>
                <Mac1 src="https://i.ibb.co/7NqqQkk/Second-Page-Mac-removebg-preview.png" />
              </SecondSection>
            </>
          )}
          {index === 2 && (
            <>
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
            </>
          )}
          {index === 3 && (
            <>
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
            </>
          )}
          {index === 4 && (
            <>
              <FifthSection>
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
              </FifthSection>
            </>
          )}
        </Section>
      ))}
    </WholeContainer>
  );
};

export default OnBoardingPage;
