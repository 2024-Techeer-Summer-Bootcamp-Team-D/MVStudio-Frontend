import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import ReactPlayer from 'react-player';
import Swal from 'sweetalert2';
import LinkIcon from '@mui/icons-material/Link';
import {
  getPlay,
  postHistory,
  patchHistoryUpdate,
  postYoutubeUpload,
} from '@/api/play';

const BackLayout = styled.div`
  width: 90%;
  display: flex;
  flex-direction: row;
  margin-left: 5%;
`;

const PlayBox = styled.div`
  width: ${({ expanded }) => (expanded ? '70%' : '88vw')};
  height: ${({ expanded }) => (expanded ? '80%' : '100vh')};
  margin-top: ${({ expanded }) => (expanded ? '0rem' : '-3rem')};
  margin-left: ${({ expanded }) => (expanded ? '0rem' : '8.2%')};
  display: flex;
  flex-direction: column;
  align-items: center;
  transition:
    width 0.5s ease,
    height 0.5s ease;
`;

const ShareBox = styled.div`
  width: 50%;
  display: flex;
  justify-content: flex-end;
`;

const TextBox = styled.div`
  color: #ffffff;
  display: flex;
  flex-direction: column;
  margin-left: -33rem;
  width: 50%;
`;

const Title = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  margin-top: 1rem;
`;

const Subtitle = styled.div`
  font-size: 1rem;
  display: flex;
`;

const ButtonBox = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  margin-top: -5rem;
  margin-right: -17rem;
`;

const ShareButton = styled.button`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 2.5rem;
  background-color: #552e72;
  border: none;
  color: white;
  font-size: 0.8rem;
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #6a3d8d;
  }

  &:hover .tooltip {
    visibility: visible;
    opacity: 1;
    transition: opacity 0.3s ease;
  }
`;

const YoutubeButton = styled.button`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 2.5rem;
  background-color: #552e72;
  border: none;
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #6a3d8d;
  }

  &:hover .tooltip {
    visibility: visible;
    opacity: 1;
    transition: opacity 0.3s ease;
  }
`;

const YoutubeLogo = styled.img`
  width: 2rem;
  height: 1.5rem;
  content: url('https://i.ibb.co/k3SxGcT/youtubelogo.png');
`;

const VideoContainer = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 3rem;
  position: relative;
  /* Adjust the container to fit your needs */
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 0.7rem;
`;

const UserInfo2 = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 0.8rem;
  margin-top: 0.2rem;
  gap: 0.5rem;
`;

const LyricsBox = styled.div`
  width: ${({ expanded }) => (expanded ? '23%' : '0%')};
  height: ${({ expanded }) => (expanded ? '41.6rem' : '0')};
  display: flex;
  justify-content: start;
  align-items: start;
  margin-left: 2rem;
  margin-top: 3rem;
  position: relative;
  overflow: hidden;
  transition:
    width 0.5s ease,
    height 0.5s ease;
`;

const LyricsBackground = styled.div`
  width: 100%;
  height: 100%;
  background-color: white;
  background-image: ${({ coverImage }) =>
    coverImage ? `url(${coverImage})` : 'none'};
  background-size: cover;
  background-position: center;
  filter: blur(1.7rem) brightness(50%);
  position: absolute;
  z-index: 1;
`;

const LyricsContent = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 2;
  border: 2px solid #5b5b5b;
  box-sizing: border-box;
  overflow: hidden;
  color: white;
  font-size: 1.5rem;
  font-weight: 700;
  text-align: left;
  padding-left: 3rem;
  padding-top: 3rem;
`;

const LyricsTitle = styled.div`
  position: relative;
  z-index: 2;
  color: white;
  font-size: 1rem;
  font-weight: 500;
  text-align: left;
  padding-right: 3rem;
  padding-top: 2rem;
  line-height: 2;
`;

const StyledButton = styled.button`
  width: 3rem;
  height: 3rem;
  border-radius: 3rem;
  background-color: #552e728f;
  position: fixed;
  top: 6rem;
  right: 1rem;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-size: 0.5rem;
  color: #ffffff;
  z-index: 1000;

  &:hover {
    background-color: #7e4394;
  }
`;

const StyledWatchedSeconds = styled.div`
  font-size: 1rem;
`;

const ViewsCount = styled.div`
  font-size: 0.8rem;
  color: #ffffff;
`;

const Tooltip = styled.span`
  position: absolute;
  bottom: -1.2rem;
  background-color: #333;
  color: #fff;
  padding: 0.2rem 0.5rem;
  border-radius: 0.3rem;
  font-size: 0.7rem;
  visibility: hidden;
  transition:
    opacity 0.3s ease,
    visibility 0.1s ease;
`;

// Toast configuration for Swal
const copiedToast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 1500,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  },
});

function Play() {
  const location = useLocation();
  const [lyricsVisible, setLyricsVisible] = useState(true);
  const [playData, setPlayData] = useState(null);
  const [coverImage, setCoverImage] = useState('');
  const [watchedSeconds, setWatchedSeconds] = useState(0);
  const [historyId, setHistoryId] = useState(null);
  const [lastPatchedTime, setLastPatchedTime] = useState(0);
  const playerRef = useRef(null);

  const getQueryParam = (param) => {
    const params = new URLSearchParams(location.search);
    return params.get(param);
  };

  // Fetch the `id` from URL query params
  const id = getQueryParam('id');

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          const data = await getPlay(id);
          setPlayData(data);
          setCoverImage(data?.data?.cover_image || '');

          const postResponse = await postHistory(id);
          if (postResponse?.history_id) {
            setHistoryId(postResponse.history_id);
          }
        }
      } catch (error) {
        console.error('Error fetching data or posting history:', error);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    if (!historyId) return;

    const intervalId = setInterval(() => {
      if (playerRef.current) {
        const currentTime = Math.floor(playerRef.current.getCurrentTime());

        if (currentTime - lastPatchedTime >= 5) {
          patchHistoryUpdate(historyId, currentTime)
            .then((response) => {
              console.log('Patch response:', response);
              setWatchedSeconds(currentTime);
              setLastPatchedTime(currentTime);
            })
            .catch((error) => {
              console.error('Error updating history:', error);
            });
        }
      }
    }, 500);

    return () => clearInterval(intervalId);
  }, [historyId, lastPatchedTime]);

  const toggleLyrics = () => {
    setLyricsVisible(!lyricsVisible);
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => {
        copiedToast.fire({
          icon: 'success',
          title: 'URL 복사 완료!',
          text: '친구에게 공유해보세요!',
        });
      })
      .catch((err) => {
        console.error('Failed to copy URL: ', err);
      });
  };

  const youtubeUpload = async () => {
    try {
      if (id) {
        // Using `id` as `mv_id`
        const response = await postYoutubeUpload(id);
        console.log('YouTube upload response:', response);
        Swal.fire({
          icon: 'success',
          title: 'YouTube 업로드 성공!',
          text: 'YouTube로 업로드되었습니다.',
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: '업로드 실패',
          text: '업로드할 ID를 찾을 수 없습니다.',
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: '업로드 실패',
        text: 'YouTube 업로드 중 오류가 발생했습니다.',
      });
    }
  };

  return (
    <BackLayout expanded={lyricsVisible}>
      <PlayBox expanded={lyricsVisible}>
        <VideoContainer>
          {playData?.data?.mv_file ? (
            <div className="player-container">
              <ReactPlayer
                ref={playerRef}
                url={playData.data.mv_file}
                controls={true}
                width="100%"
                height="100%"
                onProgress={(state) => {
                  const currentTime = Math.floor(state.playedSeconds);
                  setWatchedSeconds(currentTime);
                }}
              />
            </div>
          ) : (
            <div>No video available</div>
          )}
        </VideoContainer>
        <TextBox expanded={lyricsVisible}>
          <Title>{playData?.data?.subject || 'Loading...'}</Title>
          <UserInfo>
            <img
              src={
                playData?.data?.profile_image ||
                'https://i.ibb.co/h8q8YgC/pro.jpg'
              }
              alt="Profile"
              style={{ width: '3rem', height: '3rem', borderRadius: '50%' }}
            />
            <UserInfo2>
              <Subtitle>{playData?.data?.member_name || 'Loading...'}</Subtitle>
              <ViewsCount>
                {playData?.data?.views !== null &&
                playData?.data?.views !== undefined
                  ? `${playData.data.views.toLocaleString()} Views`
                  : '0 Views'}
              </ViewsCount>
            </UserInfo2>
          </UserInfo>
        </TextBox>
        <ShareBox expanded={lyricsVisible}>
          <ButtonBox expanded={lyricsVisible}>
            <ShareButton onClick={handleCopyToClipboard}>
              <LinkIcon
                sx={{
                  transform: 'rotate(-45deg)',
                }}
              />
              <Tooltip className="tooltip">URL</Tooltip>
            </ShareButton>

            <YoutubeButton onClick={youtubeUpload}>
              <YoutubeLogo />
              <Tooltip className="tooltip">Youtube</Tooltip>
            </YoutubeButton>
          </ButtonBox>
        </ShareBox>
        <StyledWatchedSeconds>{watchedSeconds}</StyledWatchedSeconds>
      </PlayBox>

      <LyricsBox expanded={lyricsVisible}>
        <LyricsBackground coverImage={coverImage} />
        <LyricsContent>
          {playData?.data?.subject || 'Loading...'}
          <LyricsTitle>
            <div
              dangerouslySetInnerHTML={{
                __html: playData?.data?.lyrics || 'Loading...',
              }}
            />
          </LyricsTitle>
        </LyricsContent>
      </LyricsBox>

      <StyledButton onClick={toggleLyrics}>
        {lyricsVisible ? 'Hide Lyrics' : 'Show Lyrics'}
      </StyledButton>
    </BackLayout>
  );
}

export default Play;
