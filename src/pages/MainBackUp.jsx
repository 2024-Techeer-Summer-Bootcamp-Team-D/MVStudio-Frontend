import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { getList } from '@/api/musicVideos';

const CreateContainer = styled.div`
  width: 85%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: start;
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
  width: 25%;
  /* height: 26%;
  flex: 0 0 25.5%; */
`;

const CoverBox = styled.div`
  transition: transform 0.5s ease-in-out;
  width: 16.8%;
  height: 16.8%;
  flex: 0 0 17%;
`;

const TrendRoundCover = styled.button`
  background-image: url(${(props) => props.src});
  background-size: cover;
  border-radius: 0.5rem;
  width: 19rem;
  height: 12rem;
  position: relative;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  border: none;
  padding: 0;
  flex-direction: column;
  cursor: pointer;
`;

const RoundCover = styled.button`
  background-image: url(${(props) => props.src});
  background-size: cover;
  border-radius: 0.5rem;
  width: 12rem;
  height: 7.2em;
  align-items: center;
  position: relative;
  display: flex;
  cursor: pointer;
`;

const TrendArrowFunction = styled(ArrowForwardIosIcon)`
  display: flex;
  width: 3rem;
  margin-top: 7%;
  cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};
  color: ${(props) => (props.disabled ? 'transparent' : '#7b7b7b')};
  transform: ${(props) => (props.preved ? 'rotate(0deg)' : 'rotate(180deg)')};
  z-index: 2;
`;

const ArrowFunction = styled(ArrowForwardIosIcon)`
  display: flex;
  margin-top: 4.5%;
  cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};
  color: ${(props) => (props.disabled ? 'transparent' : '#7b7b7b')};
  transform: ${(props) => (props.preved ? 'rotate(0deg)' : 'rotate(180deg)')};
  z-index: 2;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  width: 100%;
  height: 15rem;
  justify-content: center;
`;

const Container2 = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  width: 100%;
  height: 11rem;
  justify-content: center;
`;

const TrendViewContainer = styled.div`
  margin-top: 2rem;
  width: 90%;
  height: 16.5rem;
  display: flex;
  align-items: flex-start;
  justify-content: center;
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
  transform: ${({ index }) => `translateX(-${index * 25.5}%)`};
  position: relative;
`;

const RecentListBox = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 8rem;
  transition: transform 0.5s ease-in-out;
  transform: ${({ index }) => `translateX(-${index * 17}%)`};
  position: relative;
`;

const CountryListBox = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 8rem;
  transition: transform 0.5s ease-in-out;
  transform: ${({ index }) => `translateX(-${index * 17}%)`};
  position: relative;
`;

const ShareListBox = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 8rem;
  transition: transform 0.5s ease-in-out;
  transform: ${({ index }) => `translateX(-${index * 17}%)`};
  position: relative;
`;

const TrendImageOverlay = styled.div`
  width: 100%;
  height: 25%;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  border-bottom-left-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
  color: white;
  font-size: 0.8rem;
  display: flex;
  flex-direction: column;
  padding: 0;
  justify-content: center;
  align-items: start;
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
  padding: 0.5rem 0.5rem 0rem 0.5rem;
`;

const FontMargin2 = styled.div`
  color: white;
  margin-left: 0.2rem;
  display: flex;
  flex-direction: row;
  width: 12em;
  height: 100%;
  font-size: 0.7rem;
  margin-top: 0.5rem;
`;

const SmallText = styled.div`
  display: flex;
  font-size: 0.8rem;
  font-weight: 600;
  color: white;
`;

const SmallText2 = styled.div`
  display: flex;
  font-size: 0.5rem;
  color: white;
  margin-bottom: 0.5rem;
  margin-left: 0.5rem;
`;

const ViewNumber = styled.div`
  font-size: 0.7rem;
  text-align: right;
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

  const [mostViewTotalItems, setMostViewTotalItems] = useState(0);
  const [recentTotalItems, setRecentTotalItems] = useState(0);
  const [countryTotalItems, setCountryTotalItems] = useState(0);
  const [shareTotalItems, setShareTotalItems] = useState(0);

  const [mostViewDisabled, setMostViewDisabled] = useState(false);
  const [recentDisabled, setRecentDisabled] = useState(false);
  const [countryDisabled, setCountryDisabled] = useState(false);
  const [shareDisabled, setShareDisabled] = useState(false);

  useEffect(() => {
    fetchMostViewList();
    fetchRecentList();
    fetchCountryList();
    fetchShareList();
  }, []);

  console.log('most view list: ', mostViewList);

  const fetchMostViewList = async () => {
    try {
      const response = await getList(mostViewPage, 4, 'views');
      if (response && response.music_videos) {
        setMostViewList((prevList) => [
          ...prevList,
          ...response.music_videos.filter(
            (item) => !prevList.some((prev) => prev.id === item.id),
          ),
        ]);
        setMostViewTotalItems(response.pagination.total_items);
        setMostViewPage((prevPage) => prevPage + 1);
        setMostViewDisabled(response.pagination.last_page);
      }
    } catch (error) {
      console.error('Failed to fetch most viewed list:', error);
    }
  };

  const fetchRecentList = async () => {
    try {
      const response = await getList(recentPage, 6, 'recently_viewed');
      if (response && response.music_videos) {
        setRecentList((prevList) => [
          ...prevList,
          ...response.music_videos.filter(
            (item) => !prevList.some((prev) => prev.id === item.id),
          ),
        ]);
        setRecentTotalItems(response.pagination.total_items);
        setRecentPage((prevPage) => prevPage + 1);
        setRecentDisabled(response.pagination.last_page);
      }
    } catch (error) {
      console.error('Failed to fetch recent list:', error);
    }
  };

  const fetchCountryList = async () => {
    try {
      const response = await getList(countryPage, 6, 'countries');
      if (response && response.music_videos) {
        setCountryList((prevList) => [
          ...prevList,
          ...response.music_videos.filter(
            (item) => !prevList.some((prev) => prev.id === item.id),
          ),
        ]);
        setCountryTotalItems(response.pagination.total_items);
        setCountryPage((prevPage) => prevPage + 1);
        setCountryDisabled(response.pagination.last_page);
      }
    } catch (error) {
      console.error('Failed to fetch country list:', error);
    }
  };

  const fetchShareList = async () => {
    try {
      const response = await getList(sharePage, 6, 'shares');
      if (response && response.music_videos) {
        setShareList((prevList) => [
          ...prevList,
          ...response.music_videos.filter(
            (item) => !prevList.some((prev) => prev.id === item.id),
          ),
        ]);
        setShareTotalItems(response.pagination.total_items);
        setSharePage((prevPage) => prevPage + 1);
        setShareDisabled(response.pagination.last_page);
      }
    } catch (error) {
      console.error('Failed to fetch share list:', error);
    }
  };

  const handleArrowClick = (type, direction) => {
    if (type === 'mostView') {
      if (direction === 'next') {
        if (mostViewIndex < Math.floor(mostViewList.length / 4) - 1) {
          setMostViewIndex(mostViewIndex + 1);
        } else if (!mostViewDisabled) {
          fetchMostViewList();
        }
      } else {
        if (mostViewIndex > 0) {
          setMostViewIndex(mostViewIndex - 1);
        }
      }
    } else if (type === 'recent') {
      if (direction === 'next') {
        if (recentIndex < Math.floor(recentList.length / 6) - 1) {
          setRecentIndex(recentIndex + 1);
        } else if (!recentDisabled) {
          fetchRecentList();
        }
      } else {
        if (recentIndex > 0) {
          setRecentIndex(recentIndex - 1);
        }
      }
    } else if (type === 'country') {
      if (direction === 'next') {
        if (countryIndex < Math.floor(countryList.length / 6) - 1) {
          setCountryIndex(countryIndex + 1);
        } else if (!countryDisabled) {
          fetchCountryList();
        }
      } else {
        if (countryIndex > 0) {
          setCountryIndex(countryIndex - 1);
        }
      }
    } else if (type === 'share') {
      if (direction === 'next') {
        if (shareIndex < Math.floor(shareList.length / 6) - 1) {
          setShareIndex(shareIndex + 1);
        } else if (!shareDisabled) {
          fetchShareList();
        }
      } else {
        if (shareIndex > 0) {
          setShareIndex(shareIndex - 1);
        }
      }
    }
  };

  const handleCoverClick = (id) => {
    window.location.href = `http://localhost:4173/play?id=${id}`;
  };

  return (
    <CreateContainer>
      <TitleStyle>Most View</TitleStyle>
      <Container>
        <TrendArrowFunction
          onClick={() => handleArrowClick('mostView', 'prev')}
          preved={false}
          fontSize="large"
          disabled={mostViewIndex === 0}
        />
        <TrendViewContainer>
          <ViewListBox index={mostViewIndex}>
            {mostViewList?.map((cover, index) => (
              <TrendCoverBox key={index}>
                <TrendRoundCover
                  src={cover.cover_image}
                  onClick={() => handleCoverClick(cover.id)}
                >
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
                    <SmallText2>{cover.member_name}</SmallText2>
                  </TrendImageOverlay>
                </TrendRoundCover>
              </TrendCoverBox>
            ))}
          </ViewListBox>
        </TrendViewContainer>
        <TrendArrowFunction
          onClick={() => handleArrowClick('mostView', 'next')}
          preved={true}
          fontSize="large"
          disabled={mostViewDisabled}
        />
      </Container>
      <TitleStyle>Recent Upload</TitleStyle>
      <Container2>
        <ArrowFunction
          onClick={() => handleArrowClick('recent', 'prev')}
          preved={false}
          fontSize="small"
          disabled={recentIndex === 0}
        />
        <ViewContainer>
          <RecentListBox index={recentIndex}>
            {recentList?.map((cover, index) => (
              <CoverBox key={index}>
                <CoverContainer>
                  <RoundCover
                    src={cover.cover_image}
                    onClick={() => handleCoverClick(cover.id)}
                  />
                  <FontMargin2>{cover.subject}</FontMargin2>
                  <SmallText2>{cover.member_name}</SmallText2>
                </CoverContainer>
              </CoverBox>
            ))}
          </RecentListBox>
        </ViewContainer>
        <ArrowFunction
          onClick={() => handleArrowClick('recent', 'next')}
          preved={true}
          fontSize="large"
          disabled={recentDisabled}
        />
      </Container2>
      <TitleStyle>My Country Trend</TitleStyle>
      <Container2>
        <ArrowFunction
          onClick={() => handleArrowClick('country', 'prev')}
          preved={false}
          fontSize="large"
          disabled={countryIndex === 0}
        />
        <ViewContainer>
          <CountryListBox index={countryIndex}>
            {countryList?.map((cover, index) => (
              <CoverBox key={index}>
                <CoverContainer>
                  <RoundCover
                    src={cover.cover_image}
                    onClick={() => handleCoverClick(cover.id)}
                  />
                  <FontMargin2>{cover.subject}</FontMargin2>
                </CoverContainer>
              </CoverBox>
            ))}
          </CountryListBox>
        </ViewContainer>
        <ArrowFunction
          onClick={() => handleArrowClick('country', 'next')}
          preved={true}
          fontSize="large"
          disabled={countryDisabled}
        />
      </Container2>
      <TitleStyle>Share</TitleStyle>
      <Container2>
        <ArrowFunction
          onClick={() => handleArrowClick('share', 'prev')}
          preved={false}
          fontSize="large"
          disabled={shareIndex === 0}
        />
        <ViewContainer>
          <ShareListBox index={shareIndex}>
            {shareList?.map((cover, index) => (
              <CoverBox key={index}>
                <CoverContainer>
                  <RoundCover
                    src={cover.cover_image}
                    onClick={() => handleCoverClick(cover.id)}
                  />
                  <FontMargin2>{cover.subject}</FontMargin2>
                </CoverContainer>
              </CoverBox>
            ))}
          </ShareListBox>
        </ViewContainer>
        <ArrowFunction
          onClick={() => handleArrowClick('share', 'next')}
          preved={true}
          fontSize="large"
          disabled={shareDisabled}
        />
      </Container2>
    </CreateContainer>
  );
}

export default MainPageTest;
