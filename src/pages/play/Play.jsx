import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { getPlay } from '@/api/play';

import { defaultProfile } from '@/assets/image';
import VideoPlayer from './VideoPlayer';

const BackLayout = styled.div`
  width: 90%;
  display: flex;
  flex-direction: row;
  margin-left: 7%;
`;

const PlayBox = styled.div`
  width: ${({ expanded }) => (expanded ? '71%' : '74.4vw')};
  margin-top: ${({ expanded }) => (expanded ? '1rem' : '-4rem')};
  margin-left: ${({ expanded }) => (expanded ? '-1rem' : 'rem')};
  display: flex;
  flex-direction: column;
  align-items: center;
  transition:
    width 0.5s ease,
    height 0.5s ease;
`;

const TextBox = styled.div`
  color: #ffffff;
  display: flex;
  flex-direction: column;
  margin-left: -50%;
  margin-bottom: 2%;
  width: 50%;
  position: relative;
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

const VideoContainer = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 3rem;
  position: relative;
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
  width: ${({ expanded }) => (expanded ? '24%' : '0%')};
  height: ${({ expanded }) => (expanded ? '75.5%' : '0')};
  display: flex;
  justify-content: start;
  align-items: start;
  margin-left: 2rem;
  margin-top: 4rem;
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
        <VideoContainer>
          {data?.data?.mv_file ? (
            <div className="player-container">
              <VideoPlayer
                src={data?.data.mv_file}
                id={id}
                toggleLyrics={toggleLyrics}
                setToggleLyrics={setToggleLyrics}
              />
            </div>
          ) : (
            <div>No video available</div>
          )}
        </VideoContainer>
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
      </PlayBox>

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
    </BackLayout>
  );
}

export default Play;
