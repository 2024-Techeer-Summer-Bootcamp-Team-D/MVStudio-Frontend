/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import React, { useState, useRef, memo, useCallback } from 'react';
import styled from 'styled-components';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { getList } from '@/api/musicVideos';
import { useInfiniteQuery } from '@tanstack/react-query';
import { IconButton } from '@mui/material';
import { defaultProfile } from '@/assets/image';
import { useNavigate } from 'react-router-dom';
import Header from './Header';

const BackLayout = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 100%;
  overflow-x: hidden;
`;

export const Title = styled.h2`
  color: white;
  margin-top: 5rem;
  margin-bottom: 1rem;
  margin-left: 3%;
  z-index: 6;
`;

const VideoLayout = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  color: white;
  overflow: hidden;
`;

const VideoItemList = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  /* flex-wrap: wrap; */
  overflow-x: hidden;

  /* 웹킷 브라우저에서 스크롤바 숨기기 */
  ::-webkit-scrollbar {
    display: none;
  }

  /* 스크롤바 숨기기 (파이어폭스) */
  scrollbar-width: none; /* Firefox에서 스크롤바 숨기기 */
`;

const IconWrapper = styled.div`
  display: flex;
  width: 3%;
  min-width: 3%;
  justify-content: center;
  align-items: center;
  z-index: 5;
  margin-bottom: 2.75rem;
`;

const ItemArr = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  width: 94%;
  max-width: 94%;
  gap: 0.4rem;
  transition: transform 0.5s ease-in-out;
  transform: ${({ pageIndex }) =>
    `translateX(calc(-${pageIndex * 100}% - ${pageIndex * 0.4}rem))`};
`;

const BigVideoItem = styled.div`
  display: flex;
  flex-direction: column;
  width: ${({ size }) => `calc(${100 / size}% - 0.3rem)`};
  min-width: ${({ size }) => `calc(${100 / size}% - 0.3rem)`};
  max-width: ${({ size }) => `calc(${100 / size}% - 0.3rem)`};
  color: white;
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

const sort = (title) => {
  if (title === 'Top Hits') {
    return 'views';
  } else if (title === 'New Releases') {
    return 'created_at';
  } else if (title === 'Popular in Our Country') {
    return 'countries';
  } else if (title === 'Trending with Our Age Group') {
    return 'ages';
  }
};

function VideoHover({ src, size }) {
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
}

function VideoList({ title }) {
  const navigate = useNavigate();
  const size = 8;
  const pageSize = title === 'Top Hits' ? 4 : 6;
  const [pageIndex, setPageIndex] = useState(0);
  const sortCriteria = sort(title);

  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ['musicVideos', { title }],
    queryFn: ({ pageParam = 1 }) =>
      getList(pageParam, size, sortCriteria, undefined),
    getNextPageParam: (lastPage) => {
      if (lastPage.pagination.next_page) {
        return lastPage.pagination.current_page + 1;
      } else {
        return undefined;
      }
    },
  });

  return (
    <VideoLayout>
      <Title>{title}</Title>
      {/* 뮤직 비디오 */}
      <VideoItemList>
        {/* 왼쪽 아이콘 */}
        <IconWrapper>
          <IconButton
            sx={{ width: '2.5rem', color: 'white' }}
            onClick={() => {
              setPageIndex((prev) => Math.max(prev - 1, 0));
            }}
          >
            <ArrowForwardIosIcon
              sx={{
                width: '100%',
                height: 'auto',
                transform: 'scaleX(-1)',
              }}
            />
          </IconButton>
        </IconWrapper>
        {/* 비디오 아이템 */}
        <ItemArr pageIndex={pageIndex}>
          {data?.pages.map((page) =>
            page?.music_videos.map((video, index) => (
              <BigVideoItem key={index} size={pageSize}>
                <div
                  style={{ cursor: 'pointer' }}
                  onClick={() => navigate(`/play?id=${video.id}`)}
                >
                  <CoverImage src={video.cover_image} alt={video.title} />
                  <VideoHover src={video.mv_file} size={pageSize} />
                </div>
                <VideoBotInfo>
                  <ProfileImage
                    src={video.profile_image || defaultProfile}
                    alt="profile"
                    // onClick={() => navigate(`/users?id=${video.member_id}`)}
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
                      {video.subject}
                    </p>
                    <p style={{ fontSize: '0.875rem', color: '#cccccc' }}>
                      {video.member_name || 'no name user'}
                    </p>
                  </div>
                </VideoBotInfo>
              </BigVideoItem>
            )),
          )}
        </ItemArr>
        {/* 오른쪽 아이콘 */}
        <IconWrapper>
          <IconButton
            sx={{ width: '2.5rem', color: 'white' }}
            onClick={() => {
              if (hasNextPage) {
                fetchNextPage();
              }
              if (
                data.pages[0].pagination.total_items >
                pageSize * (pageIndex + 1)
              ) {
                setPageIndex((prev) => prev + 1);
              }
            }}
          >
            <ArrowForwardIosIcon
              sx={{
                width: '100%',
                height: 'auto',
              }}
            />
          </IconButton>
        </IconWrapper>
      </VideoItemList>
    </VideoLayout>
  );
}

function Main() {
  return (
    <BackLayout>
      {/* 헤더 */}
      <Header />

      {/* 조회순 */}
      <VideoList title="Top Hits" />

      {/* 최신순 */}
      <VideoList title="New Releases" />

      {/* 나라별 */}
      <VideoList title="Popular in Our Country" />

      {/* 연령별 */}
      <VideoList title="Trending with Our Age Group" />

      {/* 푸터 */}
      <footer style={{ color: 'white', textAlign: 'center', margin: '5rem' }} />
    </BackLayout>
  );
}

export default Main;
