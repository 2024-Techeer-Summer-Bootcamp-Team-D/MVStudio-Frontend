import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { getPlay } from '@/api/play';

import { defaultProfile } from '@/assets/image';
import VideoPlayer from './VideoPlayer';
import { useNavigate } from 'react-router-dom';

const BackLayout = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
`;

const PlayBox = styled.div`
  width: 100%;
  min-width: 34rem;
  max-height: calc(100% - 5rem);
  margin-top: ${({ expanded }) => (expanded ? '3rem' : '0rem')};
  margin-bottom: ${({ expanded }) => (expanded ? '1rem' : '4rem')};
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 2%;
`;

const VideoContainer = styled.div`
  width: ${({ expanded }) => (expanded ? 'calc(94% - 20rem);' : '100%')};
  max-height: calc(100% - 5rem);
  min-width: 34rem;
  position: relative;
`;

const LyricsBox = styled.div`
  height: calc(100% - 5.375rem);
  display: ${({ expanded }) => (expanded ? 'flex' : 'none')};
  position: relative;
  overflow: hidden;
  max-width: 20rem;
  transition:
    width 0.5s ease,
    height 0.5s ease,
    margin 0.5s ease;

  /* 반응형 너비 적용 */
  @media (max-width: 1600px) {
    min-width: 18rem;
  }
  @media (max-width: 1200px) {
    min-width: 14rem;
  }
  @media (max-width: 992px) {
    min-width: 10rem;
  }
  @media (max-width: 768px) {
    min-width: 10rem;
  }
  @media (max-width: 576px) {
    min-width: 8rem;
  }
  @media (max-width: 400px) {
    min-width: 6rem;
  }
`;

const TextBox = styled.div`
  color: #ffffff;
  display: flex;
  flex-direction: column;
  margin-left: ${({ expanded }) => (expanded ? '2%' : '0%')};
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
  color: white;
  font-weight: 700;
  text-align: left;
  padding: 1.5rem;
  padding-top: 2rem;
  /* 반응형 폰트 크기 적용 */
  @media (max-width: 1200px) {
    font-size: 1.5rem;
  }
  @media (max-width: 992px) {
    font-size: 1.5rem;
  }
  @media (max-width: 768px) {
    font-size: 1rem;
  }
  @media (max-width: 576px) {
    font-size: 1rem;
  }
  /* Viewport 단위 사용 */
  font-size: calc(1rem + 0.7vw);
`;

const LyricsTitle = styled.div`
  position: relative;
  z-index: 2;
  color: white;
  font-weight: 500;
  text-align: left;
  padding-right: 2rem;
  padding-top: 2rem;
  line-height: 2;
  flex-wrap: wrap;

  /* 반응형 폰트 크기 적용 */
  @media (max-width: 1200px) {
    font-size: 0.7rem;
  }
  @media (max-width: 992px) {
    font-size: 0.65rem;
  }
  @media (max-width: 768px) {
    font-size: 0.6rem;
  }
  @media (max-width: 576px) {
    font-size: 0.55rem;
  }
  /* Viewport 단위 사용 */
  font-size: calc(0.5rem + 0.5vw);
`;

const ViewsCount = styled.div`
  font-size: 0.8rem;
  color: #ffffff;
`;

const VideoPlayerWrapper = styled.div`
  width: 100%;
  height: 100%;
  z-index: 2;
`;

function Play() {
  const location = useLocation();
  const [toggleLyrics, setToggleLyrics] = useState(true);
  const getQueryParam = (param) => {
    const params = new URLSearchParams(location.search);
    return params.get(param);
  };
  const id = getQueryParam('id');

  const navigate = useNavigate();

  const { data } = useQuery({
    queryKey: ['play', id],
    queryFn: () => getPlay(id),
  });

  return (
    <BackLayout>
      <PlayBox expanded={toggleLyrics}>
        <VideoContainer expanded={toggleLyrics}>
          {data?.data?.mv_file ? (
            <VideoPlayerWrapper open={toggleLyrics}>
              <VideoPlayer
                mvData={data?.data}
                id={id}
                toggleLyrics={toggleLyrics}
                setToggleLyrics={setToggleLyrics}
              />
            </VideoPlayerWrapper>
          ) : (
            <div>No video available</div>
          )}
          <TextBox>
            <Title>{data?.data?.subject || 'Loading...'}</Title>
            <UserInfo>
              <img
                src={data?.data?.profile_image || defaultProfile}
                alt="Profile"
                style={{
                  width: '3rem',
                  height: '3rem',
                  borderRadius: '100%',
                  cursor: 'pointer',
                }}
                onClick={() => navigate(`/users/${data?.data?.username}`)}
              />
              <UserInfo2>
                <Subtitle>{data?.data?.member_name || 'no name user'}</Subtitle>
                <ViewsCount>
                  {data?.data?.views !== null && data?.data?.views !== undefined
                    ? `${data.data.views.toLocaleString()} Views`
                    : '0 Views'}
                </ViewsCount>
              </UserInfo2>
            </UserInfo>
          </TextBox>
        </VideoContainer>

        <LyricsBox expanded={toggleLyrics}>
          <LyricsBackground coverImage={data?.data?.cover_image} />
          <LyricsContent>
            {data?.data?.subject || 'Loading...'}
            <LyricsTitle>
              <div
                dangerouslySetInnerHTML={{
                  __html: data?.data?.lyrics || 'Loading...',
                }}
              />
            </LyricsTitle>
          </LyricsContent>
        </LyricsBox>
      </PlayBox>
    </BackLayout>
  );
}

export default Play;
