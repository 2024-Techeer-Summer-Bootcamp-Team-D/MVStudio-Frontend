import React from 'react';
import styled from 'styled-components';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';
import ShareIcon from '@mui/icons-material/Share';
import DownloadIcon from '@mui/icons-material/Download';
import LyricsCover from '../components/LyricsCover';

// PlayBox styled-component
const PlayBox = styled.div`
  width: 60%;
  height: 100%;
  display: flex;
  flex-direction: column; /* PlayBox를 세로로 정렬 */
  align-items: center; /* 가운데 정렬 */
`;

// ShareBox styled-component
const ShareBox = styled.div`
  width: 100%;
  height: 6rem;
  display: flex;
  justify-content: flex-end;
  align-items: center; /* 아이콘 세로 가운데 정렬 */
  padding-right: 2rem; /* 우측 여백 추가 */
  margin-top: 5rem;
`;

// YouTube 아이콘을 스타일링한 컴포넌트
const StyledYouTubeIcon = styled(YouTubeIcon)`
  font-size: 2rem;
  color: white; /* 아이콘 색상 */
  margin-right: 1rem; /* 아이콘 간격 */
`;

// Instagram 아이콘을 스타일링한 컴포넌트
const StyledInstagramIcon = styled(InstagramIcon)`
  font-size: 2rem;
  color: white; /* 아이콘 색상 */
  margin-right: 1rem; /* 아이콘 간격 */
`;
const StyledShareIcon = styled(ShareIcon)`
  font-size: 2rem;
  color: white; /* 아이콘 색상 */
  margin-right: 1rem; /* 아이콘 간격 */
`;

const StyledDownloadIcon = styled(DownloadIcon)`
  font-size: 2rem;
  color: white; /* 아이콘 색상 */
  margin-right: 1rem; /* 아이콘 간격 */
`;

const VideoContainer = styled.div`
  width: 100%;
  margin-top: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// LyricsBox styled-component
const LyricsBox = styled.div`
  width: 40%;
  height: 100%;
  display: flex;
  margin-top: 2rem;
  flex-direction: column; /* PlayBox를 세로로 정렬 */
  align-items: center; /* 가운데 정렬 */
`;

function Play() {
  return (
    <>
      <PlayBox>
        <VideoContainer>
          <video controls width="650">
            <source src="/media/cc0-videos/flower.webm" type="video/webm" />
            <source src="/media/cc0-videos/flower.mp4" type="video/mp4" />
            Download the
            <a href="/media/cc0-videos/flower.webm">WEBM</a>
            or
            <a href="/media/cc0-videos/flower.mp4">MP4</a>
            video.
          </video>
        </VideoContainer>
        <ShareBox>
          <StyledDownloadIcon />
          <StyledShareIcon />
          <StyledYouTubeIcon />
          <StyledInstagramIcon />
        </ShareBox>
      </PlayBox>
      <LyricsBox>
        <LyricsCover>가사가사가사가사</LyricsCover>
      </LyricsBox>
    </>
  );
}
export default Play;
