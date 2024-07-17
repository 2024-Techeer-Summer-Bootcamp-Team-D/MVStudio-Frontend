/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';
// import VisibilityIcon from '@mui/icons-material/Visibility';
import { getList, getHistory } from '../api/musicVideos';
import { getMemberInfo } from '../api/member';
import { useNavigate, useParams } from 'react-router-dom';
import BasicTabs from '../components/BasicTaps';
import InfiniteScroll from 'react-infinite-scroll-component';

const BigContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  margin-left: 40%;
  margin-right: 20%;
  width: 60%;
`;

const Profile = styled.p`
  font-size: 2rem;
  color: #ffffff;
  padding-left: 1rem;
`;

const ProImg = styled.img`
  width: 10rem;
  height: 10rem;
  border-radius: 50%;
  flex-shrink: 0;
`;

const ProName = styled.div`
  font-size: 1rem;
  color: #ffffff;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const VideoCount = styled.div`
  font-size: 1.1rem;
  color: #a4a4a4;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 2rem;
  gap: 0.3rem;
`;

const ProText = styled.div`
  font-size: 1rem;
  color: #a4a4a4;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0;
  height: 3rem;
`;

const ExtraFunction = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
  padding-bottom: 0;
`;

const InstagramIconEdit = styled(InstagramIcon)`
  margin-right: 1rem;
  color: #a4a4a4;
  cursor: pointer;
`;

const YouTubeIconEdit = styled(YouTubeIcon)`
  margin-right: 1rem;
  color: #a4a4a4;
  cursor: pointer;
`;

const AlbumContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  width: 80%;
  padding-left: 1rem;
  padding-right: 1rem;
  margin-top: 1rem;
  transition: 0.3s;
`;

const AlbumCoverContainer = styled.div`
  position: relative;
  cursor: pointer;

  &:hover .overlay {
    opacity: 1;
  }
`;

const AlbumCoverImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 0.5rem;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem;
  opacity: 0;
  /* gap: 1rem; */
  transition: opacity 0.3s ease-in-out;
`;

const OverlayText = styled.p`
  display: flex;
  align-items: center;
  font-size: 1.3rem;
  font-weight: 550;
  gap: 0.5rem;
`;

const AlbumCover = ({ data }) => (
  <AlbumCoverContainer>
    <AlbumCoverImage src={data.cover_image} alt={data.subject} />
    <Overlay className="overlay">
      <OverlayText>{data.subject}</OverlayText>
      <OverlayText>{/* <VisibilityIcon /> {data.views} */}</OverlayText>
    </Overlay>
  </AlbumCoverContainer>
);

const MyContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 72.5%;
  height: 14rem;
  padding-right: 2rem;
  padding-bottom: 1rem;
  align-items: center;
  /* border-bottom: 0.2rem solid rgba(139, 139, 139, 0.7); */
`;

const ProfileName = styled.p`
  font-size: 1.4rem;
  width: 7rem;
  margin-bottom: 0.9rem;
`;

const Button15 = styled.button`
  width: 6rem;
  background: #6a069c;
  border: none;
  z-index: 1;
  position: relative;
  padding: 10px 20px;
  color: #fff;
  font-size: 1rem;
  cursor: pointer;
  overflow: hidden;
  border-radius: 1rem;
  outline: none;
  font-family: 'SUIT', sans-serif;

  &:hover {
    color: #fff;
  }

  &:after {
    content: '';
    width: 6rem;
    height: 100%;
    top: 0;
    right: 0;
    z-index: -1;
    background-color: #663dff;
    border-radius: 5px;
    box-shadow:
      inset 2px 2px 2px 0px rgba(255, 255, 255, 0.5),
      7px 7px 20px 0px rgba(0, 0, 0, 0.1),
      4px 4px 5px 0px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
  }

  &:hover:after {
    left: 0;
    width: 100%;
  }

  &:active {
    top: 2px;
  }
`;

const EmptyContainer = styled.div`
  margin-left: 40%;
  margin-top: 20%;
  color: #ffffff;
  font-size: 2rem;
  display: flex;
  flex-direction: row;
`;

function Mypage() {
  const { id: memberId } = useParams();
  const [activeTab, setActiveTab] = useState(0);
  const [myVideos, setMyVideos] = useState([]);
  const [recentView, setRecentView] = useState([]);
  const [userInfo, setUserInfo] = useState();
  const [videoCount, setVideoCount] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const myId = localStorage.getItem('memberId');
  const [page, setPage] = useState(1);
  const [fetchedVideoIds, setFetchedVideoIds] = useState([]);

  // 페이지별 데이터를 가져오는 함수
  const fetchData = async (pageNum) => {
    try {
      const response = await getList(pageNum, 9, null, memberId);
      const newData = response.music_videos.filter(
        (video) => !fetchedVideoIds.flat().includes(video.id),
      );
      if (newData.length > 0) {
        setFetchedVideoIds((prevIds) => {
          const newIds = [...prevIds];
          newIds[pageNum - 1] = newData.map((video) => video.id);
          return newIds;
        });
        setMyVideos((prevVideos) => {
          const filteredVideos = newData.filter(
            (video) =>
              !prevVideos.some((prevVideo) => prevVideo.id === video.id),
          );
          return [...prevVideos, ...filteredVideos];
        });
      }
      setVideoCount(response.pagination.total_items);
      setHasMore(response.pagination.total_items > pageNum * 9);
    } catch (error) {
      console.error('뮤비 목록 조회 오류', error);
    }
  };

  // 컴포넌트가 마운트될 때 초기 데이터 가져오기
  useEffect(() => {
    fetchData(1);
    fetchRecent(1);
  }, []);

  // 멤버 정보 가져오기
  useEffect(() => {
    const fetchMemberInfo = async () => {
      try {
        const response = await getMemberInfo(memberId);
        setUserInfo(response);
      } catch (error) {
        console.error('회원 조회 오류', error);
      }
    };
    fetchMemberInfo();
  }, [memberId]);

  const fetchRecent = async (pageNum) => {
    try {
      const response = await getHistory(memberId, pageNum, 9);
      const newData = response.music_videos.filter(
        (video) => !fetchedVideoIds.flat().includes(video.id),
      );
      if (newData.length > 0) {
        setFetchedVideoIds((prevIds) => {
          const newIds = [...prevIds];
          newIds[pageNum - 1] = newData.map((video) => video.id);
          return newIds;
        });
        setRecentView((prevVideos) => {
          // Filter out existing videos in prevVideos to avoid duplicates
          const filteredVideos = newData.filter(
            (video) =>
              !prevVideos.some((prevVideo) => prevVideo.id === video.id),
          );
          return [...prevVideos, ...filteredVideos];
        });
      }
      setHasMore(response.pagination.total_items > pageNum * 9);
    } catch (error) {
      console.error('뮤비 조회 기록 오류', error);
    }
  };

  // 페이지 변경 핸들러
  const handleChange = (event, newValue) => {
    setActiveTab(newValue);
    setFetchedVideoIds([]);
  };

  // 프로필 수정 페이지로 이동
  const navigateToEdit = () => {
    navigate(`/edit`);
  };

  const handleIconClick = (url) => {
    if (url === null) {
      return;
    } else {
      window.open(url, '_blank');
    }
  };

  const isOwner = myId === memberId;

  const navigate = useNavigate();

  if (!userInfo) {
    return <EmptyContainer>조회하신 회원정보가 없습니다.</EmptyContainer>;
  }

  return (
    <BigContainer>
      <Profile>Profile</Profile>
      <MyContainer>
        <ProImg
          src={userInfo?.profile_image || 'https://i.ibb.co/nB2HMyf/image.png'}
          alt={userInfo?.login_id}
        />
        <InfoContainer>
          <ProName>
            <ProfileName>{userInfo?.nickname}</ProfileName>
            {myId === memberId && (
              <Button15 onClick={navigateToEdit}>Edit</Button15>
            )}
          </ProName>
          <VideoCount>동영상 {videoCount}개</VideoCount>
          <ProText>
            <ChatOutlinedIcon />
            <p>{userInfo?.comment || '코멘트를 추가해보세요..'}</p>
          </ProText>
          <ExtraFunction>
            <YouTubeIconEdit
              fontSize="medium"
              onClick={() => handleIconClick(userInfo?.youtube_account)}
            />
            <InstagramIconEdit
              fontSize="medium"
              onClick={() => handleIconClick(userInfo?.instagram_account)}
            />
          </ExtraFunction>
        </InfoContainer>
      </MyContainer>
      <BasicTabs
        value={activeTab}
        handleChange={handleChange}
        isOwner={isOwner}
      />
      <InfiniteScroll
        dataLength={activeTab === 0 ? myVideos.length : recentView.length}
        next={() => {
          const nextPage = page + 1;
          setPage(nextPage);
          activeTab === 0 ? fetchData(nextPage) : fetchRecent(nextPage);
        }}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={<p>No more items</p>}
      >
        <AlbumContainer>
          {activeTab === 0 &&
            myVideos.map((item, index) => (
              <AlbumCover key={index} data={item} />
            ))}
          {activeTab === 1 &&
            recentView.map((item, index) => (
              <AlbumCover key={index} data={item} />
            ))}
        </AlbumContainer>
      </InfiniteScroll>
    </BigContainer>
  );
}

export default Mypage;
