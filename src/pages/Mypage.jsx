/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { getList, getHistory } from '../api/musicVideos';
import { getMemberInfo } from '../api/member';
import { useNavigate, useParams } from 'react-router-dom';
import BasicTabs from '../components/BasicTaps';
// import InfiniteScroll from 'react-infinite-scroll-component';

const BigContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  margin-left: 20%;
  margin-right: 20%;
  width: 60%;
`;

const Profile = styled.p`
  font-size: 2rem;
  color: #ffffff;
  margin-right: 2rem;
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
  height: 4rem;
`;

const VideoCount = styled.div`
  font-size: 1.1rem;
  color: #a4a4a4;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 3rem;
`;

const ProText = styled.div`
  font-size: 1rem;
  color: #a4a4a4;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-top: 1rem;
`;

const ExtraFunction = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
  padding-bottom: 0;
  margin-top: 1rem;
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
  width: 13rem;
  height: 13rem;
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
  gap: 1rem;
  transition: opacity 0.3s ease-in-out;
`;

const OverlayText = styled.p`
  margin: 0.5rem 0;
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
      <OverlayText>
        <VisibilityIcon /> {data.views}
      </OverlayText>
    </Overlay>
  </AlbumCoverContainer>
);

const MyContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 72.5%;
  height: 14rem;
  padding-right: 2rem;
  padding-left: 5rem;
  padding-bottom: 1rem;
  margin-top: 2rem;
  align-items: center;
`;

const ProfileName = styled.p`
  font-size: 1.4rem;
  width: 7rem;
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

function Mypage() {
  const { id: memberId } = useParams();
  const [activeTab, setActiveTab] = useState(0);
  const [myVideos, setMyVideos] = useState();
  const [recentView, setRecentView] = useState();
  const [userInfo, setUserInfo] = useState();
  const [videoCount, setVideoCount] = useState();

  const myId = localStorage.getItem('memberId');
  console.log('멤버 아이디', memberId);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getList(1, 9, null, null);
        setMyVideos(response.music_videos);
        setVideoCount(response.pagination.total_items);
      } catch {
        console.error('뮤비 목록 조회 오류');
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getMemberInfo(memberId);
        setUserInfo(response);
      } catch {
        console.error('회원  조회 오류');
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getHistory(memberId, 1, 9);
        setRecentView(response.music_videos);
      } catch {
        console.error('기록 목록 조회 오류');
      }
    };
    fetchData();
  }, []);
  const navigate = useNavigate();
  const moveEdit = () => {
    navigate(`/edit`);
  };

  const handleChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  //  버튼 디자인 수정(백만년 예정) , 탭 방식 바꾸기/완 , empty 페이지/아오 안돼 , 기본 프로필/완 , 아이콘에 링크 추가/완
  // 사이드바 네비게이션 추가
  const isOwner = memberId === myId;
  const emptyPage = !memberId;
  return (
    <BigContainer>
      {emptyPage && <h1>찾으시는 회원 정보가 없습니다.</h1>}
      {!emptyPage && (
        <>
          <Profile>Profile</Profile>

          <MyContainer>
            <ProImg
              src={
                userInfo?.profile_image || 'https://i.ibb.co/nB2HMyf/image.png'
              }
              alt={userInfo?.login_id}
            />
            <InfoContainer>
              <ProName>
                <ProfileName>{userInfo?.nickname}</ProfileName>
                {myId === memberId && (
                  <Button15 show onClick={moveEdit}>
                    Edit
                  </Button15>
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
                  onClick={() => {
                    window.location.href =
                      userInfo?.youtube_account ||
                      'https://www.youtube.com/watch?v=xbiih8pzC30';
                  }}
                />

                <InstagramIconEdit
                  color="gradient"
                  fontSize="medium"
                  onClick={() => {
                    window.location.href =
                      userInfo?.instagram_account ||
                      'https://www.youtube.com/watch?v=xbiih8pzC30';
                  }}
                />
              </ExtraFunction>
            </InfoContainer>
          </MyContainer>
          <BasicTabs
            value={activeTab}
            handleChange={handleChange}
            isOwner={isOwner}
          />
          <AlbumContainer>
            {activeTab === 0 &&
              myVideos &&
              myVideos.map((item, index) => (
                <AlbumCover key={index} data={item} />
              ))}
            {isOwner &&
              activeTab === 1 &&
              recentView &&
              recentView.map((item, index) => (
                <AlbumCover key={index} data={item} />
              ))}
          </AlbumContainer>
        </>
      )}
    </BigContainer>
  );
}

export default Mypage;
