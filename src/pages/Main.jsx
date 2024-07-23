import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { getList } from '@/api/musicVideos';

const CreateContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const TitleStyle = styled.p`
  margin-top: 3rem;
  font-family: 'SUIT', sans-serif;
  font-size: 1.5rem;
  color: #ffffff;
  font-weight: 700;
  margin-left: 5rem;
`;

const TrendCoverBox = styled.div`
  transition: transform 0.5s ease-in-out;
  width: 26%;
  height: 26%;
  flex: 0 0 26%;
`;

const CoverBox = styled.div`
  transition: transform 0.5s ease-in-out;
  width: 16.8%;
  height: 16.8%;
  flex: 0 0 16.8%;
  /* width: 14rem;
  height: 10rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column; */
`;

const TrendRoundCover = styled.button`
  background-image: url(${(props) => props.src});
  background-size: cover;
  border-radius: 1.2rem;
  width: 18rem;
  height: 11rem;
  position: relative;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  border: none;
  padding: 0;
  flex-direction: column;
`;

const RoundCover = styled.button`
  background-image: url(${(props) => props.src});
  background-size: cover;
  border-radius: 1.2rem;
  width: 12rem;
  height: 7em;
  align-items: center;
  position: relative;
  display: flex;
`;

const TrendArrowFunction = styled(ArrowForwardIosIcon)`
  display: flex;
  width: 3rem;
  margin-top: 7.8%;
  cursor: pointer;
  color: ${(props) => (props.disabled ? 'transparent' : '#7b7b7b')};
  transform: ${(props) => (props.preved ? 'rotate(0deg)' : 'rotate(180deg)')};
  z-index: 2;
`;

const ArrowFunction = styled(ArrowForwardIosIcon)`
  display: flex;
  margin-top: 4.5%;
  cursor: pointer;
  color: ${(props) => (props.disabled ? 'transparent' : '#7b7b7b')};
  transform: ${(props) => (props.preved ? 'rotate(0deg)' : 'rotate(180deg)')};
  z-index: 2;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  width: 100%;
  height: 13rem;
  justify-content: center;
`;

const TrendViewContainer = styled.div`
  margin-top: 2rem;
  width: 90%;
  height: 20rem;
  display: flex;
  align-items: flex-start;
  overflow: hidden;
`;

const ViewContainer = styled.div`
  width: 90%;
  height: 11rem;
  display: flex;
  overflow: hidden;
  align-items: center;
  justify-content: flex-start;
`;

const ViewListBox = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 8rem;
  transition: transform 0.5s ease-in-out;
  transform: ${({ index }) => `translateX(-${index * 26}%)`};
  position: relative;
`;

const RecentListBox = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 8rem;
  transition: transform 0.5s ease-in-out;
  transform: ${({ index }) => `translateX(-${index * 16.5}%)`};
  position: relative;
`;

const CountryListBox = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 8rem;
  transition: transform 0.5s ease-in-out;
  transform: ${({ index }) => `translateX(-${index * 16.8}%)`};
  position: relative;
`;

const ShareListBox = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 8rem;
  transition: transform 0.5s ease-in-out;
  transform: ${({ index }) => `translateX(-${index * 16.8}%)`};
  position: relative;
`;

const TrendImageOverlay = styled.div`
  width: 100%;
  height: 25%;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  border-bottom-left-radius: 1.2rem;
  border-bottom-right-radius: 1.2rem;
  color: white;
  font-size: 0.8rem;
  display: flex;
  padding: 0;
  justify-content: center;
  align-items: center;
`;

const FontMargin = styled.div`
  color: white;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  font-size: 0.7rem;
  padding: 0.75rem;
`;

const FontMargin2 = styled.div`
  color: white;
  margin-left: 0.2rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 12em;
  height: 100%;
  font-size: 0.7rem;
  margin-top: 1rem;
`;
const SmallText = styled.div`
  display: flex;
  font-size: 0.7rem;
  color: white;
  margin-bottom: 0.5rem;
`;

const ViewNumber = styled.div`
  font-size: 0.7rem;
  text-align: right;
  // margin-right: 1rem;
  color: white;
  display: flex;
`;

const ViewIcon = styled(VisibilityIcon)`
  color: #ffffff;
  margin-right: 0.3rem;
`;

const CoverContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
const IconBox = styled.div`
  display: flex;
  flex-direction: row;
`;

function MainPageTest() {
  const [mostViewList, setMostViewList] = useState([]);
  const [recentList, setRecentList] = useState([]);
  const [countryList, setCountryList] = useState([]);
  const [shareList, setShareList] = useState([]);

  const [mostViewPage, setMostViewPage] = useState(1);
  const [recentPage, setRecentPage] = useState(1);
  const [countryPage, setCountryPage] = useState(1);
  const [sharePage, setSharePage] = useState(1);

  const [mostViewIndex, setMostViewIndex] = useState(0);
  const [recentIndex, setRecentIndex] = useState(0);
  const [countryIndex, setCountryIndex] = useState(0);
  const [shareIndex, setShareIndex] = useState(0);

  useEffect(() => {
    fetchMostViewList();
    fetchRecentList();
    fetchCountryList();
  }, []);

  const fetchMostViewList = async () => {
    try {
      const response = await getList(mostViewPage, 4, 'views');
      if (response && response.music_videos) {
        setMostViewList((prevList) => [...prevList, ...response.music_videos]);
        setMostViewPage((prevPage) => prevPage + 1);
      }
    } catch (error) {
      console.error('Failed to fetch most viewed list:', error);
    }
  };

  const fetchRecentList = async () => {
    try {
      const response = await getList(recentPage, 6, 'recently_viewed');
      if (response && response.music_videos) {
        // 정확한 개수만 추가하도록 합니다
        const newMusicVideos = response.music_videos.slice(0, 6);
        setRecentList((prevList) => [...prevList, ...newMusicVideos]);
        setRecentPage((prevPage) => prevPage + 1);
      }
    } catch (error) {
      console.error('Failed to fetch recent list:', error);
    }
  };

  const fetchCountryList = async () => {
    try {
      const response = await getList(countryPage, 6, 'countries');
      if (response && response.music_videos) {
        setCountryList((prevList) => [...prevList, ...response.music_videos]);
        setCountryPage((prevPage) => prevPage + 1);
      }
    } catch (error) {
      console.error('Failed to fetch country list:', error);
    }
  };

  const fetchShareList = async () => {
    try {
      const response = await shareList(sharePage, 6, 'shares');
      if (response && response.music_videos) {
        setShareList((prevList) => [...prevList, ...response.music_videos]);
        setSharePage((prevPage) => prevPage + 1);
      }
    } catch (error) {
      console.error('Failed to fetch share list:', error);
    }
  };

  const viewHandlePrev = () => {
    if (mostViewIndex > 0) {
      setMostViewIndex(mostViewIndex - 1);
    }
  };

  const viewHandleNext = () => {
    if (mostViewIndex < mostViewList.length / 4 - 1) {
      setMostViewIndex(mostViewIndex + 1);
    } else {
      fetchMostViewList();
    }
  };

  const recentHandlePrev = () => {
    if (recentIndex > 0) {
      setRecentIndex(recentIndex - 1);
    }
  };

  const recentHandleNext = () => {
    if (recentIndex < recentList.length / 6 - 1) {
      setRecentIndex(recentIndex + 1);
    } else {
      fetchRecentList();
    }
  };

  const countryHandlePrev = () => {
    if (countryIndex > 0) {
      setCountryIndex(countryIndex - 1);
    }
  };

  const countryHandleNext = () => {
    if (countryIndex < countryList.length / 6 - 1) {
      setCountryIndex(countryIndex + 1);
    } else {
      fetchCountryList();
    }
  };

  const shareHandlePrev = () => {
    if (shareIndex > 0) {
      setShareIndex(shareIndex - 1);
    }
  };

  const shareHandleNext = () => {
    if (shareIndex < countryList.length / 6 - 1) {
      setCountryIndex(shareIndex + 1);
    } else {
      fetchShareList();
    }
  };

  return (
    <CreateContainer>
      <TitleStyle>Most View</TitleStyle>
      <Container>
        <TrendArrowFunction
          onClick={viewHandlePrev}
          preved={false}
          fontSize="large"
          disabled={mostViewIndex === 0}
        />
        <TrendViewContainer>
          <ViewListBox index={mostViewIndex}>
            {mostViewList?.map((cover, index) => (
              <TrendCoverBox key={index}>
                <TrendRoundCover src={cover.cover_image}>
                  <TrendImageOverlay>
                    <FontMargin>
                      <SmallText>{cover.subject}</SmallText>
                      <IconBox>
                        <ViewIcon
                          sx={{ color: '#ffffff', fontSize: '0.8rem' }}
                        />
                        <ViewNumber>{cover.views}</ViewNumber>
                      </IconBox>
                    </FontMargin>
                  </TrendImageOverlay>
                </TrendRoundCover>
              </TrendCoverBox>
            ))}
          </ViewListBox>
        </TrendViewContainer>
        <TrendArrowFunction
          onClick={viewHandleNext}
          preved={true}
          fontSize="large"
        />
      </Container>
      <TitleStyle>Recent Upload</TitleStyle>
      <Container>
        <ArrowFunction
          onClick={recentHandlePrev}
          preved={false}
          fontSize="small"
          disabled={recentIndex === 0}
        />
        <ViewContainer>
          <RecentListBox index={recentIndex}>
            {recentList?.map((cover, index) => (
              <CoverBox key={index}>
                <CoverContainer>
                  <RoundCover src={cover.cover_image} />
                  <FontMargin2>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                      }}
                    >
                      {cover.subject}
                      <SmallText>{cover.username}</SmallText>
                      <ViewIcon sx={{ color: '#ffffff', fontSize: '0.8rem' }} />
                      <ViewNumber>{cover.views}</ViewNumber>
                    </div>
                  </FontMargin2>
                </CoverContainer>
              </CoverBox>
            ))}
          </RecentListBox>
        </ViewContainer>
        <ArrowFunction
          onClick={recentHandleNext}
          preved={true}
          fontSize="small"
        />
      </Container>
      <TitleStyle>My Country Trend</TitleStyle>
      <Container>
        <ArrowFunction
          onClick={countryHandlePrev}
          preved={false}
          fontSize="small"
          disabled={countryIndex === 0}
        />
        <ViewContainer>
          <CountryListBox index={countryIndex}>
            {countryList?.map((cover, index) => (
              <CoverBox key={index}>
                <CoverContainer>
                  <RoundCover src={cover.cover_image} />
                  <FontMargin2>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                      }}
                    >
                      {cover.subject}
                      <SmallText>{cover.username}</SmallText>
                      <ViewIcon sx={{ color: '#ffffff', fontSize: '0.8rem' }} />
                      <ViewNumber>{cover.views}</ViewNumber>
                    </div>
                  </FontMargin2>
                </CoverContainer>
              </CoverBox>
            ))}
          </CountryListBox>
        </ViewContainer>
        <ArrowFunction
          onClick={countryHandleNext}
          preved={true}
          fontSize="small"
        />
      </Container>
      <TitleStyle>Share</TitleStyle>
      <Container>
        <ArrowFunction
          onClick={shareHandlePrev}
          preved={false}
          fontSize="small"
          disabled={shareIndex === 0}
        />
        <ViewContainer>
          <ShareListBox index={shareIndex}>
            {shareList?.map((cover, index) => (
              <CoverBox key={index}>
                <CoverContainer>
                  <RoundCover src={cover.cover_image} />
                  <FontMargin2>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        marginTop: '1rem',
                      }}
                    >
                      {cover.subject}
                      <SmallText>{cover.username}</SmallText>
                      <ViewIcon sx={{ color: '#ffffff', fontSize: '0.8rem' }} />
                      <ViewNumber>{cover.views}</ViewNumber>
                    </div>
                  </FontMargin2>
                </CoverContainer>
              </CoverBox>
            ))}
          </ShareListBox>
        </ViewContainer>
        <ArrowFunction
          onClick={shareHandleNext}
          preved={true}
          fontSize="small"
        />
      </Container>
    </CreateContainer>
  );
}

export default MainPageTest;
