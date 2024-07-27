import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useQuery } from '@tanstack/react-query';
import { getList } from '@/api/musicVideos';

const BackLayout = styled.div`
  display: flex;
  flex-direction: row;
  max-width: 100%;
  overflow: hidden;
  position: relative;
  color: white;
  aspect-ratio: 10 / 3;
  height: auto;
  margin-bottom: -7rem;
`;

const VideoContainer = styled.div`
  display: flex;
  min-width: 100%;
  top: 0;
  transition:
    transform 1s ease-in-out,
    opacity 0.2s ease-in-out;
  opacity: ${({ isActive }) => (isActive ? 1 : 0)};
  transform: ${({ currentIndex }) => `translateX(-${currentIndex * 100}%)`};
`;

const VideoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 100%;
  height: 100%;
  background-color: black;
  color: white;
`;

const Video = styled.video`
  display: flex;
  width: 100%;
  height: auto;
`;
const VideoBlur = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 3%;
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 1));
  backdrop-filter: blur(0.5rem);
`;

const VideoRank = styled.div`
  display: flex;
  flex-direction: row;
  align-items: end;

  color: black;
  font-size: 10rem;
`;

const VideoCover = styled.img`
  width: calc(16.6% - 0.4rem);
  min-width: calc(16.6% - 0.4rem);
  aspect-ratio: 10 / 6;
  border-radius: 0.5rem;
  justify-content: center;
  align-items: center;
  z-index: 5;
  position: absolute;
`;

const VideoTitle = styled.div`
  display: flex;
  justify-content: start;
  margin-top: 1rem;
  align-items: center;
  font-size: 1.5rem;
  font-weight: bold;
  z-index: 5;
`;

const RankNum = styled.span`
  color: white;
  z-index: 6;
  /* margin-bottom: -2rem; */
  -webkit-text-stroke: 0.25rem #555; /* 테두리 색과 두께 설정 */
  font-size: 6rem; /* 원하는 글자 크기 설정 */
  font-weight: 900; /* 원하는 글자 두께 설정 */
`;

function Header() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const videoRefs = useRef([]);

  const { data } = useQuery({
    queryKey: ['musicVideos'],
    queryFn: () => getList(1, 10, 'recently_viewed', undefined),
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % 9);
    }, 20000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (videoRefs.current[currentIndex]) {
      videoRefs.current.forEach((video, index) => {
        if (index === currentIndex) {
          video.play();
        } else {
          video.pause();
          video.currentTime = 0;
        }
      });
    }
  }, [currentIndex]);

  return (
    <BackLayout>
      {data?.music_videos.map((video, index) => (
        <VideoContainer
          key={index}
          currentIndex={currentIndex}
          isActive={index === currentIndex}
        >
          <VideoWrapper>
            <Video
              src={video.mv_file}
              muted
              ref={(el) => (videoRefs.current[index] = el)}
              autoPlay={index === currentIndex}
            />
            <VideoBlur>
              <VideoRank>
                <RankNum>{index + 1}</RankNum>
                <VideoCover src={video.cover_image} />
              </VideoRank>
              <VideoTitle>{video.subject}</VideoTitle>
            </VideoBlur>
          </VideoWrapper>
        </VideoContainer>
      ))}
    </BackLayout>
  );
}

export default Header;
