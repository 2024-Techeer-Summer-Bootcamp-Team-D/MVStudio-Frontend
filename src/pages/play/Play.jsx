import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { getPlay } from '@/api/play';

import { defaultProfile } from '@/assets/image';
import VideoPlayer from './VideoPlayer';

const BackLayout = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
`;

const PlayBox = styled.div`
  width: 100%;
  max-height: calc(100% - 5rem);
  margin-top: ${({ expanded }) => (expanded ? '0rem' : '-5rem')};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 3rem;
  gap: 2%;
`;

const VideoContainer = styled.div`
  width: ${({ expanded }) => (expanded ? 'calc(94% - 20rem);' : '100%')};
  max-height: calc(100% - 5rem);
  position: relative;
`;

const LyricsBox = styled.div`
  width: 20rem;
  height: 100%;
  display: ${({ expanded }) => (expanded ? 'flex' : 'none')};
  margin-top: 5rem;
  position: relative;
  overflow: hidden;
  transition:
    width 0.5s ease,
    height 0.5s ease,
    margin 0.5s ease;
`;

const TextBox = styled.div`
  color: #ffffff;
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-left: 2%;
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
  overflow: hidden;
  color: white;
  font-size: 1.5rem;
  font-weight: 700;
  text-align: left;
  padding-left: 2.5rem;
  padding-top: 3rem;
`;

const LyricsTitle = styled.div`
  position: relative;
  z-index: 2;
  color: white;
  font-size: 0.9rem;
  font-weight: 500;
  text-align: left;
  padding-right: 2rem;
  padding-top: 2rem;
  line-height: 2;
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

      <TextBox>
        <Title>{data?.data?.subject || 'Loading...'}</Title>
        <UserInfo>
          <img
            src={data?.data?.profile_image || defaultProfile}
            alt="Profile"
            style={{ width: '3rem', height: '3rem', borderRadius: '100%' }}
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
    </BackLayout>
  );
}

export default Play;
