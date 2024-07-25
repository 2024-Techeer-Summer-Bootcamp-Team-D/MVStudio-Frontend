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
  margin-right: 6%;
  margin-top: 3rem;
`;

const TitleStyle = styled.p`
  margin-top: 3rem;
  font-family: 'SUIT', sans-serif;
  font-size: 1.5rem;
  color: #ffffff;
  font-weight: 700;
  margin-left: 3.2rem;
  margin-bottom: 1rem;
`;

const TitleStyle2 = styled.p`
  font-family: 'SUIT', sans-serif;
  font-size: 1rem;
  color: #ffffff;
  font-weight: 700;
  margin-top: -3.5rem;
  margin-left: 3.2rem;
  margin-bottom: 1rem;
`;

const TrendCoverBox = styled.div`
  transition: transform 0.5s ease-in-out;
  width: 26%;
  height: 26%;
  flex: 0 0 26%;
`;

const CoverBox = styled.div`
  transition: transform 0.5s ease-in-out;
  width: 14.75%;
  height: 14.75%;
  flex: 0 0 14.75%;
`;

const TrendRoundCover = styled.button`
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-position: center;
  border-radius: 10%;
  width: 15.4rem;
  height: 15rem;
  position: relative;
  &:hover {
    filter: brightness(0.8);
  }

  &::after {
    content: '${(props) => props.label}';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 1.2rem;
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
  }
`;

const RoundCover = styled.button`
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-position: center;
  border-radius: 10%;
  width: 8rem;
  height: 8rem;
  align-items: center;
  justify-content: center;
  position: relative;
  &:hover {
    filter: brightness(0.8);
  }

  &::after {
    content: '${(props) => props.label}';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 1.2rem;
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
  }
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

const TrendContainer = styled.div`
  display: flex;
  flex-direction: row;
  overflow: hidden;
  width: 100%;
  margin-left: 1rem;
  margin-bottom: 7rem;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  overflow: hidden;
  width: 100%;
  margin-left: 2rem;
  margin-bottom: 7rem;
`;

const TrendViewContainer = styled.div`
  width: 70rem;
  height: 15rem;
  gap: 2rem;
  display: flex;
  overflow: hidden;
`;

const ViewContainer = styled.div`
  width: 70rem;
  height: 15rem;
  display: flex;
  overflow: hidden;
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
  transform: ${({ index }) => `translateX(-${index * 14.75}%)`};
  position: relative;
`;

const CountryListBox = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 8rem;
  transition: transform 0.5s ease-in-out;
  transform: ${({ index }) => `translateX(-${index * 14.75}%)`};
  position: relative;
`;

const ShareListBox = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 8rem;
  transition: transform 0.5s ease-in-out;
  transform: ${({ index }) => `translateX(-${index * 14.75}%)`};
  position: relative;
`;

const TrendImageOverlay = styled.div`
  position: absolute;
  bottom: 0;
  width: 22%;
  height: 50%;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  border-bottom-left-radius: 1.2rem;
  border-bottom-right-radius: 1.2rem;
  color: white;
  font-size: 0.8rem;
  top: 11rem;
`;

const FontMargin = styled.div`
  margin-left: 1rem;
  margin-top: 0.5rem;
`;

const SmallText = styled.div`
  font-size: 0.5rem;
`;

const ViewNumber = styled.div`
  font-size: 0.7rem;
  text-align: right;
  margin-right: 1rem;
  margin-top: -0.9rem;
`;

const ViewIcon = styled(VisibilityIcon)`
  color: #ffffff;
  margin-right: 0.3rem;
  margin-left: 11.3rem;
  margin-top: 0.6rem;
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
        setRecentList((prevList) => [...prevList, ...response.music_videos]);
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
      <TrendContainer>
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
                <TrendRoundCover src={cover.cover_image} />
                <TrendImageOverlay>
                  <FontMargin>
                    {cover.subject}
                    <SmallText>{cover.username}</SmallText>
                  </FontMargin>
                  <ViewIcon sx={{ color: '#ffffff', fontSize: '0.8rem' }} />
                  <ViewNumber>{cover.views}</ViewNumber>
                </TrendImageOverlay>
              </TrendCoverBox>
            ))}
          </ViewListBox>
        </TrendViewContainer>
        <TrendArrowFunction
          onClick={viewHandleNext}
          preved={true}
          fontSize="large"
        />
      </TrendContainer>
      <TitleStyle2>Recent Upload</TitleStyle2>
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
                <RoundCover src={cover.cover_image} />
                <TrendImageOverlay>
                  <FontMargin>
                    {cover.subject}
                    <SmallText>{cover.username}</SmallText>
                  </FontMargin>
                  <ViewIcon sx={{ color: '#ffffff', fontSize: '0.8rem' }} />
                  <ViewNumber>{cover.views}</ViewNumber>
                </TrendImageOverlay>
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
      <TitleStyle2>My Country Trend</TitleStyle2>
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
                <RoundCover src={cover.cover_image} />
                <TrendImageOverlay>
                  <FontMargin>
                    {cover.subject}
                    <SmallText>{cover.username}</SmallText>
                  </FontMargin>
                  <ViewIcon sx={{ color: '#ffffff', fontSize: '0.8rem' }} />
                  <ViewNumber>{cover.views}</ViewNumber>
                </TrendImageOverlay>
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
      <TitleStyle2>Share</TitleStyle2>
      <Container>
        <ArrowFunction
          onClick={shareHandlePrev}
          preved={false}
          fontSize="small"
          disabled={countryIndex === 0}
        />
        <ViewContainer>
          <ShareListBox index={shareIndex}>
            {shareList?.map((cover, index) => (
              <CoverBox key={index}>
                <RoundCover src={cover.cover_image} />
                <TrendImageOverlay>
                  <FontMargin>
                    {cover.subject}
                    <SmallText>{cover.username}</SmallText>
                  </FontMargin>
                  <ViewIcon sx={{ color: '#ffffff', fontSize: '0.8rem' }} />
                  <ViewNumber>{cover.views}</ViewNumber>
                </TrendImageOverlay>
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
