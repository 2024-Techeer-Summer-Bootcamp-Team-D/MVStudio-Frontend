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
  position: fixed;
  top: 50%;
  left: 75%;
  background-color: #2b2c2d;
  border-radius: 1rem;
  z-index: 1001;
  height: 18rem;
  width: 22rem;
  display: flex;
  align-items: start;
  justify-content: center;
  padding-top: 0.5rem;
`;

// Task status item styling
const TaskStatusItem = styled.li`
  background-color: #5c5b5b;
  border-radius: 0.5rem;
  padding: 0.5rem;
  margin: 0.5rem 0;
  display: flex;
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
  margin-left: 1rem;
`;

function Service() {
  const [showGif, setShowGif] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [taskStatuses, setTaskStatuses] = useState([]);
  const gifRef = useRef(null);

  useEffect(() => {
    const intervalId = setInterval(async () => {
      const taskIds = JSON.parse(localStorage.getItem('taskId')) || [];
      console.log('Received IDs:', taskIds);
      if (taskIds.length > 0) {
        setShowGif(true);

        try {
          const statuses = await Promise.all(
            taskIds.map(async (taskId) => {
              const response = await getTask(taskId);
              // Returning an object for each taskId
              return {
                taskId,
                status: response.data.HTTPstatus,
                message: response.data.message,
              };
            }),
          );

          setTaskStatuses(statuses);

          const completedTasks = statuses.filter(
            (status) => status.status === 201,
          ).length;
          if (completedTasks === taskIds.length) {
            setShowGif(false);
          }
        } catch (error) {
          console.error('API call error:', error);
        }
      } else {
        setShowGif(false);
      }
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  const handleGifClick = () => {
    setShowModal((prevShowModal) => !prevShowModal);
  };

  // Log taskStatuses to console
  console.log('Current task statuses:', taskStatuses);

  return (
    <div style={{ position: 'fixed', bottom: '5%', right: '5%', zIndex: 1000 }}>
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
            style={{ position: 'relative', width: '5rem', height: '5rem' }}
          >
            <img
              src="https://i.ibb.co/JymMRPQ/Colorful-Gif-Animations-Replace-loading-Screen-Hareketli-Resim-Design-2019.gif"
              alt="GIF"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: '50%',
                cursor: 'pointer',
              }}
              onClick={handleGifClick}
            />
            {showModal && (
              <Modal>
                <ul style={{ paddingLeft: '0.2rem', paddingRight: '' }}>
                  {taskStatuses.map(({ taskId, status, message }) => (
                    <TaskStatusItem key={taskId}>
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'flex-start',
                        }}
                      >
                        <p style={{ padding: '0.3rem' }}>
                          {taskId} : {message}
                        </p>
                      </div>
                      {status === 200 ? (
                        <LoadingSpinner />
                      ) : (
                        <CheckIcon sx={{ color: green[500] }} />
                      )}
                    </TaskStatusItem>
                  ))}
                </ul>
              </Modal>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Service;
