/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import styled from 'styled-components';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { getList } from '@/api/musicVideos';
import { useInfiniteQuery } from '@tanstack/react-query';
import { IconButton } from '@mui/material';
import Header from './Header';
import VideoItem from './VideoItem';
import { Helmet } from 'react-helmet';

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

export const IconWrapper = styled.div`
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
  transform: ${({ pageIndex, view }) =>
    `translateX(calc(-${pageIndex * 100}% - ${pageIndex * 0.4 * (view / 4)}rem))`};
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

function VideoList({ title }) {
  const size = 8;
  const pageSize = title === 'Top Hits' ? 4 : 6;
  const [pageIndex, setPageIndex] = useState(0);
  const sortCriteria = sort(title);

  const { data, fetchNextPage, hasNextPage, isLoading } = useInfiniteQuery({
    queryKey: ['musicVideos', { title }],
    queryFn: ({ pageParam = 1 }) =>
      getList(pageParam, size, sortCriteria, undefined),
    getNextPageParam: (lastPage) => {
      if (lastPage?.pagination?.next_page) {
        return lastPage?.pagination?.current_page + 1;
      } else {
        return undefined;
      }
    },
  });
  if (isLoading || data?.pages[0] === undefined) {
    return <div></div>;
  }

  return (
    <VideoLayout>
      <Helmet>
        <meta property="og:title" content="MVStudio" />
        <meta property="og:url" content="https://mvstudio.pro" />
        <meta
          property="og:image"
          content="https://i.ibb.co/2Sdtxhh/MVStudio.png"
        />
        <meta property="og:image:alt" content="MVStudio" />
        <meta
          property="og:description"
          content="Let's Create Music videos and Share them Together!"
        />
      </Helmet>
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
        <ItemArr pageIndex={pageIndex} view={title === 'Top Hits' ? 4 : 6}>
          {data?.pages.map((page) =>
            page?.music_videos?.map((video, index) => (
              <VideoItem video={video} pageSize={pageSize} key={index} />
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
                data?.pages[0]?.pagination.total_items >
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
