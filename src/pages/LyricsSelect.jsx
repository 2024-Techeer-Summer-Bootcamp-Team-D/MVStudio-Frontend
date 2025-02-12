import React, { useState, useEffect } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import { postLyrics, postVideos } from '../api/musicVideos';
import Swal from 'sweetalert2';
import { useUser } from '@/libs/stores/userStore';
const check = import.meta.env.VITE_REACT_APP_IS_OPERATE;
let isOperate;
if (check === 'true') {
  isOperate = true;
} else {
  isOperate = false;
}

const BigContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  gap: 5rem;
`;

const OtherContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 5%;
  height: 60%;
  width: 100%;
  padding-left: 5%;
  padding-right: 5%;
`;

const Title = styled.p`
  font-size: 2rem;
  color: #ffffff;
  width: 75%;
  display: flex;
  text-align: start;
  margin-top: 2.5rem;
`;

const LyricsContainer = styled.div`
  width: 21rem;
  height: 40rem;
  overflow-y: scroll; // auto 대신 scroll 사용
  scrollbar-width: none; // Firefox를 위한 설정
  -ms-overflow-style: none; // IE와 Edge를 위한 설정
  padding: 2rem;
  background-image: linear-gradient(
    to right,
    #20004e,
    #37006e,
    #2c0177,
    #32005a
  );
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  box-shadow: 0 4px 15px 0 rgba(81, 39, 139, 0.75);
  transition: all 0.4s ease-in-out;
  ${({ isSelected }) =>
    isSelected &&
    css`
      border: 0.1rem solid #ffffff;
    `}
  &:hover {
    background-image: linear-gradient(
      to right,
      #32005a,
      #2c0177,
      #37006e,
      #20004e
    );
    box-shadow: 0 6px 20px 0 rgba(81, 39, 139, 0.85);
  }
`;
const jellyAnimation = keyframes`
  25% {
    transform: scale(0.9, 1.1);
  }
  50% {
    transform: scale(1.1, 0.9);
  }
  75% {
    transform: scale(0.95, 1.05);
  }
`;

const Button = styled.button`
  width: 10rem;
  height: 4rem;
  font-size: 1.2rem;
  font-weight: 550;
  background: #7c6bdd;
  color: white;
  border-radius: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 2rem;
  &:hover {
    animation: ${jellyAnimation} 0.5s both;
  }
`;

const Text = styled.div`
  font-size: 1.25rem;
  font-family: 'suit';
  color: white;
  line-height: 1.75;
`;

const loadTaskIdsFromLocalStorage = () => {
  const taskIds = localStorage.getItem('taskId');
  return taskIds ? JSON.parse(taskIds) : [];
};

const saveTaskIdToLocalStorage = (taskId) => {
  const existingTaskIds = loadTaskIdsFromLocalStorage();
  existingTaskIds.push(taskId);
  localStorage.setItem('taskId', JSON.stringify(existingTaskIds));
};

const loadTasknameFromLocalStorage = (taskname) => {
  localStorage.setItem('taskname', taskname);
  return taskname ? JSON.parse(taskname) : [];
};

const saveTasknameToLocalStorage = (taskname) => {
  const existingTaskname = loadTasknameFromLocalStorage();
  existingTaskname.push(taskname);
  localStorage.setItem('taskname', JSON.stringify(existingTaskname));
};

function LyricsSelect() {
  const [lyricsList, setLyricsList] = useState([]);
  const [lyricsIndex, setLyricsIndex] = useState();
  const location = useLocation();
  const { state } = location;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLyrics = async () => {
      try {
        const { vocal, language, genres_ids, subject } = state;
        const lyrics = await postLyrics(subject, [genres_ids], language, vocal);
        setLyricsList(lyrics);
      } catch (error) {
        console.error('Failed to fetch lyrics:', error);
      }
    };

    fetchLyrics();
  }, [state]);
  const credits = useUser((state) => state.credits);

  const isEnoughCredits = credits >= 20;

  return (
    <BigContainer>
      <Title>원하는 가사를 선택해주세요.</Title>
      <OtherContainer>
        {lyricsList?.lyrics_ori?.map((lyrics, index) => (
          <LyricsContainer
            key={index}
            isSelected={lyricsIndex === index}
            onClick={() => setLyricsIndex(index)}
          >
            {lyricsList?.lyrics_ori[index] ? (
              <Text
                dangerouslySetInnerHTML={{
                  __html: lyricsList?.lyrics_ori[index],
                }}
              />
            ) : (
              <CircularProgress />
            )}
          </LyricsContainer>
        ))}

        {!lyricsList && (
          <>
            <LyricsContainer>
              <CircularProgress />
            </LyricsContainer>

            <LyricsContainer>
              <CircularProgress />
            </LyricsContainer>

            <LyricsContainer>
              <CircularProgress />
            </LyricsContainer>
          </>
        )}
      </OtherContainer>

      <Button
        disabled={!isOperate}
        onClick={async () => {
          if (!isEnoughCredits) {
            Swal.fire({
              title: '오류',
              text: '크레딧이 부족합니다 !',
              icon: 'error',
              confirmButtonColor: '#ff0000',
              confirmButtonText: '확인',
            }).then(() => {});
          } else {
            try {
              const {
                subject,
                genres_ids,
                instruments_ids,
                style_id,
                tempo,
                language,
                vocal,
              } = state;

              if (!subject) {
                throw new Error('Subject is missing');
              }
              Swal.fire({
                title: '뮤직 비디오 생성',
                text: '뮤직 비디오를 생성하시겠습니까?',
                icon: 'info',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: '생성',
                cancelButtonText: '취소',
              }).then(async (result) => {
                if (isOperate) {
                  if (result.isConfirmed) {
                    try {
                      const data = await postVideos(
                        subject,
                        [genres_ids],
                        instruments_ids,
                        style_id,
                        tempo,
                        language,
                        vocal,
                        lyricsList.lyrics_ori[lyricsIndex],
                        lyricsList.lyrics_eng[lyricsIndex],
                      );
                      const taskId = data.task_id;
                      if (!taskId) {
                        throw new Error(
                          'task_id가 응답에 포함되어 있지 않습니다.',
                        );
                      }
                      saveTaskIdToLocalStorage(taskId);
                      saveTasknameToLocalStorage(subject);
                      navigate('/main');
                    } catch (error) {
                      throw new Error('비디오 생성에 실패했습니다.');
                    }
                    Swal.fire({
                      title: '뮤직 비디오 제작 시작!',
                      text: '뮤직 비디오 제작이 시작되었습니다. 5분 정도 기다려주세요!',
                      icon: 'success',
                    });
                  }
                }
              });
            } catch (error) {
              console.error(
                'Failed to create video:',
                error.message ? error.message : error,
              );
            }
          }
        }}
      >
        Create
      </Button>
    </BigContainer>
  );
}

export default LyricsSelect;
