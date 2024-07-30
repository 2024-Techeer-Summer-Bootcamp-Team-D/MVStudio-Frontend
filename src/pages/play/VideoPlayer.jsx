/* eslint-disable react/prop-types */
import React, { useRef, useState, useEffect, useCallback } from 'react';
import { postHistory, patchHistoryUpdate } from '@/api/play';
import ReactPlayer from 'react-player';
import styled from 'styled-components';
import axios from 'axios';
import Swal from 'sweetalert2';
import { deleteVideo } from '@/api/musicVideos';
import { useUser } from '@/libs/stores/userStore';

// Material-UI
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import { IconButton, Slider } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import LinkIcon from '@mui/icons-material/Link';
import CropSquareIcon from '@mui/icons-material/CropSquare';
import AspectRatioIcon from '@mui/icons-material/AspectRatio';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const PlayerWrapper = styled.div`
  position: relative;
  background: #000000;
  width: 100%;
  aspect-ratio: 10 / 6;
  border-radius: 8px;
  max-height: ${({ expanded }) =>
    expanded ? 'calc(100vh - 10rem)' : 'calc(100vh - 5rem)'};
  overflow: hidden;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  &:hover .controls {
    opacity: 1;
  }
`;

const Controls = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  color: white;
  opacity: 0;
  transition: opacity 0.3s;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.5) 0%,
    rgba(0, 0, 0, 0) 100%
  );
`;

const ControlGroup = styled.div`
  display: flex;
  align-items: center;
`;

const StyledSlider = styled(Slider)`
  width: 5rem !important;
  color: white !important;
  margin-left: 10px; /* 아이콘과의 간격을 위해 추가 */
  opacity: 0;
  transition: opacity 0.3s;

  & .MuiSlider-thumb {
    width: 12px; /* 조정 버튼의 너비 */
    height: 12px; /* 조정 버튼의 높이 */
    background-color: white; /* 조정 버튼의 색상 */
  }
`;

const ProgressBar = styled.div`
  position: absolute;
  top: 0;
  left: 1%;
  right: 0;
  height: 5px;
  width: 98%;
  background: rgba(255, 255, 255, 0.3);
  cursor: pointer;
`;

const ProgressFill = styled.div`
  height: 100%;
  background: #6600ff; /* 유튜브 스타일의 빨간색 */
  width: ${({ played }) => played * 100}%;
`;

const VolumeControl = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  &:hover .volume-slider {
    opacity: 1;
  }
`;

const MenuWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  right: 0;
  display: ${({ show }) => (show ? 'block' : 'none')};
  z-index: 11;
`;

const Menu = styled.div`
  position: absolute;
  background: rgba(33, 33, 33, 0.6);
  bottom: 5rem;
  right: 1%;
  color: white;
  border-radius: 0.25rem;
  z-index: 11;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
`;

const MenuItem = styled.div`
  padding: 0.75rem;
  cursor: pointer;
  transition: background 0.3s;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.25rem;
  padding-right: 2rem;
  padding-left: 2rem;
  font-size: 0.75rem;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`;

/** 만약 playing이 true이고 playerRef.current가 null or false이면, RefreshPlay를 표시해서 다시 재생해주는 컴포넌트
지만 실패해서 주석처리함 
const RefreshPlay = styled.button`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  cursor: pointer;
  z-index: 10;
`;
*/

const PlayTime = styled.div`
  font-size: 1rem;
  margin-left: 1rem;
  margin-right: 1rem;
  color: white;
`;

const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
};

const VideoPlayer = ({ mvData, id, toggleLyrics, setToggleLyrics }) => {
  const playerRef = useRef(null);
  const playerWrapperRef = useRef(null);
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(0.2);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [played, setPlayed] = useState(0);
  const [showMenu, setShowMenu] = useState(false);
  const [historyId, setHistoryId] = useState(null);
  const [lastPatchedTime, setLastPatchedTime] = useState(0);

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const username = useUser((state) => state.username);
  const isOwner = mvData?.username === username;

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          const postResponse = await postHistory(id);
          setHistoryId(postResponse.history_id);
          if (postResponse.current_play_time < 70) {
            playerRef.current.seekTo(postResponse.current_play_time, 'seconds');
            setCurrentTime(postResponse.current_play_time);
            setPlayed(postResponse.current_play_time / postResponse.duration);
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
      if (playerRef.current && playing) {
        const currentTime = Math.floor(playerRef.current.getCurrentTime());

        if (currentTime - lastPatchedTime >= 5) {
          patchHistoryUpdate(historyId, currentTime).then(() => {
            setLastPatchedTime(currentTime);
          });
        }
      }
    }, 5000);

    return () => clearInterval(intervalId);
  }, [historyId, lastPatchedTime, playing]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!playerRef.current) return;

      let newTime;
      switch (event.key) {
        case 'ArrowRight':
          newTime = playerRef.current.getCurrentTime() + 5;
          playerRef.current.seekTo(newTime, 'seconds');
          setPlayed(newTime / playerRef.current.getDuration());
          setCurrentTime(newTime);
          break;
        case 'ArrowLeft':
          newTime = playerRef.current.getCurrentTime() - 5;
          playerRef.current.seekTo(newTime, 'seconds');
          setPlayed(newTime / playerRef.current.getDuration());
          setCurrentTime(newTime);
          break;
        case ' ':
          event.preventDefault(); // 스페이스바 기본 스크롤 방지
          togglePlayPause();
          break;
        case 'Escape':
          setIsFullscreen(false);
          break;
        default:
          break;
      }
    };

    const handleFullscreenChange = () => {
      if (
        !document.fullscreenElement &&
        !document.webkitFullscreenElement &&
        !document.mozFullScreenElement &&
        !document.msFullscreenElement
      ) {
        setIsFullscreen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener(
        'webkitfullscreenchange',
        handleFullscreenChange,
      );
      document.removeEventListener(
        'mozfullscreenchange',
        handleFullscreenChange,
      );
      document.removeEventListener(
        'MSFullscreenChange',
        handleFullscreenChange,
      );
    };
  }, []);

  const togglePlayPause = useCallback(() => {
    setPlaying((prevPlaying) => !prevPlaying);
  }, []);

  const toggleMute = () => {
    setMuted(!muted);
  };

  const handleVolumeChange = (e, newValue) => {
    setVolume(newValue);
    setMuted(newValue === 0);
  };

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      if (playerWrapperRef.current.requestFullscreen) {
        playerWrapperRef.current.requestFullscreen();
      } else if (playerWrapperRef.current.mozRequestFullScreen) {
        // Firefox
        playerWrapperRef.current.mozRequestFullScreen();
      } else if (playerWrapperRef.current.webkitRequestFullscreen) {
        // Chrome, Safari and Opera
        playerWrapperRef.current.webkitRequestFullscreen();
      } else if (playerWrapperRef.current.msRequestFullscreen) {
        // IE/Edge
        playerWrapperRef.current.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        // Firefox
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        // Chrome, Safari and Opera
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        // IE/Edge
        document.msExitFullscreen();
      }
    }
    setIsFullscreen(!isFullscreen);
  };

  const handleProgress = (state) => {
    setPlayed(state.played);
    setCurrentTime(state.playedSeconds);
  };

  const handleClickProgressBar = (event) => {
    const progressBar = event.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const newPlayed = clickX / rect.width;
    playerRef.current.seekTo(newPlayed, 'fraction');
    setPlayed(newPlayed);
  };

  return (
    <PlayerWrapper
      expanded={toggleLyrics}
      onClick={togglePlayPause}
      ref={playerWrapperRef}
    >
      {/* {!playerRef.current && playing && (
        <RefreshPlay
          onClick={(event) => {
            // event.stopPropagation();
            console.log('refresh');
            setPlaying(true);
            setMuted(false);
          }}
        />
      )} */}
      <ReactPlayer
        ref={playerRef} // ReactPlayer에 ref 설정
        url={mvData?.mv_file}
        playing={playing}
        muted={muted}
        volume={volume}
        controls={false}
        width="100%"
        height="100%"
        pip={true}
        onProgress={(e) => handleProgress(e)}
        onDuration={(duration) => setDuration(duration)}
        style={{ maxHeight: 'calc(100vh - 5rem)' }}
      />
      <MenuWrapper show={showMenu}>
        <div
          style={{ width: '100%', height: '100%', position: 'fixed' }}
          onClick={(event) => {
            event.stopPropagation();
            setShowMenu(false);
          }}
        />
        <Menu>
          {/* 비디오 삭제 */}
          {isOwner && (
            <MenuItem
              onClick={(event) => {
                event.stopPropagation();
                Swal.fire({
                  title: '비디오 삭제',
                  text: '정말 삭제하시겠습니까?',
                  icon: 'warning',
                  showCancelButton: true,
                  confirmButtonText: '삭제',
                  cancelButtonText: '취소',
                }).then((result) => {
                  if (result.isConfirmed) {
                    deleteVideo(id)
                      .then(() => {
                        Swal.fire({
                          title: '삭제 완료',
                          text: '비디오가 삭제되었습니다.',
                          icon: 'success',
                          showConfirmButton: true,
                          confirmButtonText: '확인',
                        }).then(() => {
                          window.location.href = '/';
                        });
                      })

                      .catch((error) => {
                        console.error('비디오 삭제 오류:', error);
                      });
                  }
                });
                setShowMenu(false);
              }}
            >
              <DeleteForeverIcon />
              Delete
            </MenuItem>
          )}

          {/* 비디오 파일 다운로드 */}
          <MenuItem
            onClick={(event) => {
              event.stopPropagation();
              const fileUrl = mvData?.mv_file;
              axios
                .get(fileUrl, { responseType: 'blob' })
                .then((response) => {
                  const url = window.URL.createObjectURL(
                    new Blob([response.data]),
                  );
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `MVStudio ${mvData?.subject}.mp4`;
                  document.body.appendChild(a);
                  a.click();
                  window.URL.revokeObjectURL(url);
                  document.body.removeChild(a);
                })
                .catch((error) => {
                  console.error('파일 다운로드 오류:', error);
                });
              setShowMenu(false);
            }}
          >
            <FileDownloadIcon />
            Download
          </MenuItem>

          {/* 링크 복사 */}
          <MenuItem
            onClick={(event) => {
              event.stopPropagation();
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
              setShowMenu(false);
            }}
          >
            <LinkIcon
              sx={{
                transform: 'rotate(-45deg)',
              }}
            />
            Copy Link
          </MenuItem>

          {/* 유튜브 업로드 */}

          {isOwner && (
            <MenuItem
              onClick={(event) => {
                event.stopPropagation();
                Swal.fire({
                  title: 'Upload to Youtube',
                  text: '페이지가 새로 열립니다. 계속하시겠습니까?',
                  icon: 'info',
                  showCancelButton: true,
                  confirmButtonText: '업로드',
                  cancelButtonText: '취소',
                }).then((result) => {
                  if (result.isConfirmed) {
                    window.open(
                      `${import.meta.env.VITE_REACT_APP_BASE_URL}/api/v1/oauth/youtube/${id}`,
                    );
                  }
                });
              }}
            >
              <FileDownloadIcon
                sx={{
                  transform: 'rotate(180deg)',
                }}
              />{' '}
              Upload to Youtube
            </MenuItem>
          )}
        </Menu>
      </MenuWrapper>

      <Controls
        onClick={(event) => {
          event.stopPropagation();
        }}
        className="controls"
      >
        <ProgressBar onClick={handleClickProgressBar}>
          <ProgressFill played={played} />
        </ProgressBar>
        <ControlGroup>
          {/* 재생 및 일시정지 버튼 */}
          <IconButton onClick={togglePlayPause} color="inherit">
            {playing ? (
              <PauseIcon style={{ fontSize: '2rem' }} />
            ) : (
              <PlayArrowIcon style={{ fontSize: '2rem' }} />
            )}
          </IconButton>

          {/* 영상 시간 */}
          <PlayTime>
            {formatTime(currentTime)} / {formatTime(duration)}
          </PlayTime>

          {/* 볼륨 조절 */}
          <VolumeControl>
            <IconButton onClick={toggleMute} color="inherit">
              {muted ? <VolumeOffIcon /> : <VolumeUpIcon />}
            </IconButton>
            <StyledSlider
              className="volume-slider"
              min={0}
              max={0.4}
              step={0.004}
              value={volume}
              onChange={handleVolumeChange}
            />
          </VolumeControl>
        </ControlGroup>
        <div>
          <IconButton
            onClick={() => setToggleLyrics(!toggleLyrics)}
            color="inherit"
          >
            {toggleLyrics ? <AspectRatioIcon /> : <CropSquareIcon />}
          </IconButton>
          <IconButton onClick={() => setShowMenu(!showMenu)} color="inherit">
            <SettingsIcon />
          </IconButton>

          <IconButton onClick={toggleFullscreen} color="inherit">
            {isFullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
          </IconButton>
        </div>
      </Controls>
    </PlayerWrapper>
  );
};

export default VideoPlayer;
