import React, { useState, useEffect, useRef } from 'react';
import { getTask } from '../api/musicVideos';
import styled, { keyframes } from 'styled-components';
import CheckIcon from '@mui/icons-material/Check';
import { green } from '@mui/material/colors';

// Define keyframes for the loading animation
const loadingAnimation = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

// Modal component with updated background color
const Modal = styled.div`
  background-color: #2b2c2d;
  border-radius: 1rem;
  z-index: 1001;
  min-height: 24rem;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
  /* justify-content: center; */
  /* padding-top: 0.5rem; */
`;

// Task status item styling
const TaskStatusItem = styled.li`
  background-color: #5c5b5b;
  border-radius: 0.5rem;
  padding: 1rem;
  margin: 0.5rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  color: white;
`;

// Loading spinner component
const LoadingSpinner = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.3);
  border-top: 4px solid #fff;
  border-radius: 50%;
  width: 1rem;
  height: 1rem;
  animation: ${loadingAnimation} 1s linear infinite;
`;

const StyledCheckIcon = styled(CheckIcon)`
  color: ${green[500]};

  cursor: pointer;

  &:hover {
    transition: transform 0.3s ease;
    transform: scale(1.5);
  }
`;

// ... (이전 스타일 컴포넌트들은 그대로 유지)

function Service() {
  const [showGif, setShowGif] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [taskStatuses, setTaskStatuses] = useState([]);
  const gifRef = useRef(null);

  const fetchTaskStatuses = async () => {
    const taskIds = JSON.parse(localStorage.getItem('taskId')) || [];
    const mvSubjects = JSON.parse(localStorage.getItem('taskname')) || [];
    if (taskIds.length > 0) {
      setShowGif(true);
      try {
        const statuses = await Promise.all(
          taskIds.map(async (taskId, index) => {
            const response = await getTask(taskId);
            return {
              taskId,
              mvSubject: mvSubjects[index],
              status: response.data.HTTPstatus,
              message: response.data.message,
            };
          }),
        );

        setTaskStatuses(statuses);

        // 모든 작업이 완료되었는지 확인
      } catch (error) {
        console.error('API call error:', error);
      }
    } else {
      setShowGif(false);
    }
  };

  useEffect(() => {
    fetchTaskStatuses(); // 즉시 상태 가져오기
    const intervalId = setInterval(fetchTaskStatuses, 5000); // 5초마다 상태 업데이트

    return () => clearInterval(intervalId);
  }, []);

  const handleGifClick = () => {
    setShowModal((prevShowModal) => !prevShowModal);
  };

  const handleTaskClick = (taskId) => {
    const updatedTaskIds = JSON.parse(localStorage.getItem('taskId')) || [];
    const updatedMvSubjects =
      JSON.parse(localStorage.getItem('mvSubject')) || [];
    const index = updatedTaskIds.indexOf(taskId);
    if (index > -1) {
      updatedTaskIds.splice(index, 1);
      updatedMvSubjects.splice(index, 1);
    }
    localStorage.setItem('taskId', JSON.stringify(updatedTaskIds));
    localStorage.setItem('mvSubject', JSON.stringify(updatedMvSubjects));
    setTaskStatuses((prevStatuses) =>
      prevStatuses.filter((task) => task.taskId !== taskId),
    );
  };

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '3rem',
        right: '3em',
        zIndex: 1000,
      }}
    >
      {showGif && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            position: 'relative',
          }}
        >
          <div
            ref={gifRef}
            style={{
              position: 'relative',
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column-reverse',
              alignItems: 'end',
              justifyContent: 'end',
            }}
          >
            <img
              src="https://i.ibb.co/JymMRPQ/Colorful-Gif-Animations-Replace-loading-Screen-Hareketli-Resim-Design-2019.gif"
              alt="GIF"
              style={{
                width: '4rem',
                height: '4rem',
                objectFit: 'cover',
                borderRadius: '100%',
                cursor: 'pointer',
                position: 'relative',
                marginTop: '1.5rem',
              }}
              onClick={handleGifClick}
            />
            {showModal && (
              <Modal>
                {taskStatuses.map(({ taskId, mvSubject, message, status }) => (
                  <TaskStatusItem key={taskId}>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                      }}
                    >
                      <p>
                        {mvSubject}: {message}
                      </p>
                    </div>
                    {status === 200 ? (
                      <LoadingSpinner />
                    ) : (
                      <StyledCheckIcon
                        sx={{ color: green[500] }}
                        onClick={() => handleTaskClick(taskId)}
                      />
                    )}
                  </TaskStatusItem>
                ))}
              </Modal>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Service;
