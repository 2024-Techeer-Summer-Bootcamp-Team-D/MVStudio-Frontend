import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import { postLyrics, postVideos } from '../api/musicVideos';
import Swal from 'sweetalert2';
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
  margin-bottom: 2rem;
`;

const LyricsContainer = styled.div`
  width: 25%;
  height: 100%;
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
  justify-content: center;
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

const Button = styled.button`
  width: 15%;
  height: 5%;
  font-size: 1.25rem;
  font-weight: 600;
  color: #fff;
  cursor: pointer;
  margin-top: 5rem;
  text-align: center;

  border: none;
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
        disabled={true}
        onClick={async () => {
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
        }}
      >
        Create
      </Button>
    </BigContainer>
  );
}

export default LyricsSelect;
