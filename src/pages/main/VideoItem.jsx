/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React, { useCallback, useRef, memo } from 'react';
import styled from 'styled-components';
import { defaultProfile } from '@/assets/image';
import { useNavigate } from 'react-router-dom';

const BackLayout = styled.div`
  display: flex;
  flex-direction: column;
  width: ${({ size }) => `calc(${100 / size}% - 0.3rem)`};
  min-width: ${({ size }) => `calc(${100 / size}% - 0.3rem)`};
  max-width: ${({ size }) => `calc(${100 / size}% - 0.3rem)`};
  color: white;
`;

const VideoBotInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 2.75rem;
  position: relative;
  z-index: 1;
  color: white;
  margin-top: 0.5rem;
`;

const CoverImage = styled.img`
  width: 100%;
  aspect-ratio: 10 / 6; /* 60%의 비율 */
  object-fit: cover; /* 이미지가 비율을 유지하며 전체를 덮도록 */
  padding: 0.05rem;
  border-radius: 0.5rem;
`;

const ProfileImage = styled.img`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 2.25rem;
  aspect-ratio: 1 / 1; /* 정사각형 비율을 유지 */
  overflow: hidden; /* 넘치는 부분을 잘라냄 */
  border-radius: 100%;
  margin-right: 0.5rem;
`;

const VideoHover = memo(({ src, size }) => {
  const videoRef = useRef(null);
  const timeoutRef = useRef(null);

  const handleMouseEnter = useCallback(() => {
    timeoutRef.current = setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.load(); // 비디오를 다시 로드하여 초기화
        videoRef.current.volume = 0.2; // 소리 20%
        videoRef.current.play();
      }
    }, 1000); // 1초 지연
  }, []);

  const handleMouseLeave = useCallback(() => {
    clearTimeout(timeoutRef.current);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, []);

  const VideoHoverContainer = styled.div`
    display: flex;
    width: ${({ size }) => `calc(${100 / size}% - 0.3rem)`};
    min-width: ${({ size }) => `calc(${100 / size}% - 0.25rem)`};
    height: calc(100% - 3.5rem);
    min-height: calc(100% - 3.5rem);
    position: absolute;
    top: 0;
    opacity: 0;
    transition: opacity 1s ease-in-out;
    &:hover {
      opacity: 1;
    }
  `;

  return (
    <VideoHoverContainer
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      size={size}
    >
      <video
        ref={videoRef}
        src={src}
        preload="auto" // 비디오 미리 로드
        style={{ width: '100%', height: '100%' }}
      />
    </VideoHoverContainer>
  );
});

function VideoItem({ pageSize, video }) {
  const navigate = useNavigate();
  return (
    <BackLayout size={pageSize}>
      <div
        style={{ cursor: 'pointer' }}
        onClick={() => navigate(`/play?id=${video?.id}`)}
      >
        <CoverImage src={video?.cover_image} alt={video?.title} />
        <VideoHover src={video?.mv_file} size={pageSize} />
      </div>
      <VideoBotInfo>
        <ProfileImage
          src={video?.profile_image || defaultProfile}
          alt="profile"
          // onClick={() => navigate(`/users?id=${video?.member_id}`)}
        />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            lineHeight: '1.5',
            width: '100%',
          }}
        >
          <p
            style={{
              fontWeight: 'bold',
            }}
          >
            {video?.subject}
          </p>
          <p style={{ fontSize: '0.875rem', color: '#cccccc' }}>
            {video?.member_name || 'no name user'}
          </p>
        </div>
      </VideoBotInfo>
    </BackLayout>
  );
}

export default VideoItem;
