import React, { useState, useEffect } from 'react';
import { getTask } from '../api/musicVideos';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

const pulseAnimation = keyframes`
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.7;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

const Button = styled.button`
  padding: 1rem 2rem;
  font-size: 1.2rem;
  color: white;
  background-color: #155799;
  border: none;
  cursor: pointer;
  outline: none;
  transition: 0.3s;
  border-radius: 1rem;
  margin-bottom: 1rem;

  &.pulse {
    &:hover {
      box-shadow: 0 0 0 18px transparent;
      animation: ${pulseAnimation} 1s;
    }
  }

  &.close {
    transition: 0.3s;

    &:hover {
      background: transparent;
      box-shadow:
        inset 54px 0 0 0 var(--btn-bg),
        inset -54px 0 0 0 var(--btn-bg);
    }
  }
`;

function Service() {
  const [showGif, setShowGif] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [activeTaskCount, setActiveTaskCount] = useState(0);
  const [taskCompleted, setTaskCompleted] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const intervalId = setInterval(async () => {
      const taskIds = JSON.parse(localStorage.getItem('taskId')) || [];
      console.log('받은 아이디:', taskIds);
      if (taskIds.length > 0) {
        setShowGif(true);
        setActiveTaskCount(taskIds.length);

        try {
          const promises = taskIds.map(async (taskId) => {
            const response = await getTask(taskId);
            if (response.status === 201) {
              setTaskCompleted((prev) => prev + 1);
            }
            return response;
          });

          await Promise.all(promises);

          if (taskCompleted === taskIds.length) {
            setShowGif(false);
          }

          if (promises.some((p) => p.status === 201)) {
            setShowButton(true);
          }
        } catch (error) {
          console.error('API 호출 오류:', error);
        }
      } else {
        setShowGif(false);
        setActiveTaskCount(0);
      }
    }, 5000);

    return () => clearInterval(intervalId);
  }, [taskCompleted]);

  const handleButtonClick = () => {
    setShowButton(false);
    navigate('/play');
  };

  return (
    <div
      style={{ position: 'fixed', bottom: '10%', right: '10%', zIndex: 1000 }}
    >
      {showGif && (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div
            style={{ position: 'relative', width: '18rem', height: '14rem' }}
          >
            <img
              src="https://i.ibb.co/JymMRPQ/Colorful-Gif-Animations-Replace-loading-Screen-Hareketli-Resim-Design-2019.gif"
              alt="GIF"
              style={{ width: '100%', height: '100%' }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '100%',
                color: 'white',
                textAlign: 'center',
              }}
            >
              <h2>{`뮤직비디오 생성 중... (${activeTaskCount}개 호출 중)`}</h2>
            </div>
          </div>
          {showButton && (
            <div
              style={{
                padding: '1rem',
                background: '#161219d0',
                width: '15rem',
                height: '15rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '1rem',
                marginLeft: '1rem',
              }}
            >
              <Button className="pulse" onClick={handleButtonClick}>
                Play
              </Button>
              <p style={{ color: 'white', textAlign: 'center' }}>
                생성이 완료되었습니다.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Service;
