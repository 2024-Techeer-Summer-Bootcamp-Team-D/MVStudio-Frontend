/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';
// import VisibilityIcon from '@mui/icons-material/Visibility';
import { getList, getHistory } from '../api/musicVideos';
import { getMemberInfo } from '../api/member';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import BasicTabs from '../components/BasicTaps';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useUser } from '@/libs/stores/userStore';
import EditIcon from '@mui/icons-material/Edit';

const BigContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  margin-left: 25%;
  margin-right: 25%;
  min-width: 36rem;
  width: 80%;
`;

const Profile = styled.p`
  font-size: 2rem;
  color: #ffffff;
  padding-left: 1rem;
  margin-top: 2rem;
`;

const ProImg = styled.img`
  width: 8rem;
  height: 8rem;
  border-radius: 50%;
  flex-shrink: 0;
`;

const ProName = styled.div`
  width: 90%;
  font-size: 1rem;
  color: #ffffff;
  display: flex;
  flex-direction: row;
  align-items: start;
  justify-content: space-between;
`;

const VideoCount = styled.div`
  font-size: 1.1rem;
  color: #a4a4a4;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 2rem;
  width: 100%;
  align-items: start;
  gap: 0.875rem;
`;

const ProText = styled.div`
  font-size: 1rem;
  color: #a4a4a4;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0;
`;

const ExtraFunction = styled.div`
  display: flex;
  flex-direction: row;
  padding-bottom: 0;
`;

const InstagramIconEdit = styled(InstagramIcon)`
  margin-right: 1rem;
  color: #a4a4a4;
  cursor: pointer;
  height: 1rem;
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
  width: 100%;
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
  aspect-ratio: 5 / 3;
  object-fit: cover;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  color: #fff;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
`;

const OverlayText = styled.p`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const AlbumCover = ({ data, onClick }) => (
  <AlbumCoverContainer onClick={onClick}>
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
  width: 100%;
  align-items: start;
  margin: 2rem;
`;

const ProfileName = styled.p`
  font-size: 1.4rem;
`;

const EmptyContainer = styled.div`
  margin-left: 40%;
  margin-top: 20%;
  color: #ffffff;
  font-size: 2rem;
  display: flex;
  flex-direction: row;
`;

const EditButton = styled.button`
  background: none;
  border: 2px solid #ffffff;
  border-radius: 50%;
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.3s ease;
  position: relative;
  margin-top: -0.6rem;
  margin-left: 1rem;

  &:hover {
    width: 100px;
    border-radius: 20px;
  }

  svg {
    color: #ffffff;
    transition: all 0.3s ease;
  }

  span {
    position: absolute;
    right: 10px;
    color: #ffffff;
    opacity: 0;
    transition: all 0.3s ease;
  }

  &:hover svg {
    transform: translateX(-15px);
  }

  &:hover span {
    opacity: 1;
  }
`;

function Mypage() {
  const { username: username } = useParams('');
  const [activeTab, setActiveTab] = useState(0);
  const [myVideos, setMyVideos] = useState([]);
  const [recentView, setRecentView] = useState([]);
  const [userInfo, setUserInfo] = useState();
  const [videoCount, setVideoCount] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [fetchedVideoIds, setFetchedVideoIds] = useState([]);
  const myUserName = useUser((state) => state.username);

  const fetchData = async (pageNum) => {
    try {
      const response = await getList(pageNum, 9, 'null', username);
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
  console.log('myVideos: ', myVideos);

  // 컴포넌트가 마운트될 때 초기 데이터 가져오기
  useEffect(() => {
    setMyVideos([]);
    fetchData(1);
    fetchRecent(1);
  }, [username]);

  // 멤버 정보 가져오기
  useEffect(() => {
    const fetchMemberInfo = async () => {
      try {
        const response = await getMemberInfo(username);
        if (response.status === 200) {
          setUserInfo(response.data);
        }
      } catch (error) {
        console.error('회원 조회 오류', error);
        setUserInfo(null);
      }
    };
    fetchMemberInfo();
  }, [username]);

  const fetchRecent = async (pageNum) => {
    try {
      const response = await getHistory(username, pageNum, 9);
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

  const handleChange = (event, newValue) => {
    setActiveTab(newValue);
    setFetchedVideoIds([]);
  };
  const navigate = useNavigate();

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

  const isOwner = myUserName === username;

  // const navigate = useNavigate();

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
            <ProfileName>{userInfo?.nickname || '멋쟁이중절모'}</ProfileName>
            {isOwner && (
              <EditButton onClick={navigateToEdit}>
                <EditIcon fontSize="small" />
                <span style={{ paddingRight: '1rem' }}>Edit</span>
              </EditButton>
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
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <AlbumContainer>
          {activeTab === 0 &&
            myVideos.map((item, index) => (
              <AlbumCover
                key={index}
                data={item}
                onClick={() => navigate(`/play?id=${item.id}`)}
              />
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
