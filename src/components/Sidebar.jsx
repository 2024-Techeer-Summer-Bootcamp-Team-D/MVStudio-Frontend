/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ignorePath from '../utils/igonerePath';
import { useUser } from '@/libs/stores/userStore';
import { postLogout } from '@/api/member';
import Swal from 'sweetalert2';

// Material-UI
import AddIcon from '@mui/icons-material/Add';
import HomeIcon from '@mui/icons-material/Home';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import MovieIcon from '@mui/icons-material/Movie';
import LogoutIcon from '@mui/icons-material/Logout';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const BackLayout = styled.div`
  display: flex;
  flex-direction: column;
  width: 15rem;
  height: calc(100% - 5rem);
  position: fixed;
  border-right: 1px solid #1e003b;
  padding: 1rem;
  justify-content: space-between;
`;

const BackLayoutSpace = styled.div`
  width: 15rem;
  min-width: 15rem;
  height: 100%;
  display: flex;
`;

const MenuItem = styled.button`
  display: flex;
  height: 2.5rem;
  width: 100%;
  align-items: center;
  color: white;
  cursor: pointer;
  background: none;
  border: none;
  &:hover {
    background-color: #333333;
    border-radius: 0.5rem;
  }
`;

const MenuTitle = styled.div`
  margin-left: 0.625rem;
  flex-grow: 1;
  text-align: left;
`;

const TrendingWrapper = styled.div`
  position: relative;
  flex-grow: inherit;
`;

const TrendingContainer = styled.div`
  border-radius: 0.5rem;
  width: 100%;
  height: 100%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 0.5rem;
  transition: all 0.7s ease;
  max-height: ${({ isOpen }) => (isOpen ? '300px' : '0')};
  opacity: ${({ isOpen }) => (isOpen ? '1' : '0')};
  visibility: ${({ isOpen }) => (isOpen ? 'visible' : 'hidden')};
`;

const ThumbnailContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.5rem;
  border-radius: 0.3rem;
  transition: all 0.2s ease;
  border-radius: 1rem;
  background-image: ${({ backgroundImage }) => `url(${backgroundImage})`};
  background-size: cover;
  background-position: center;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(5px);
    transition: background-color 0.2s ease;
    border-radius: 1rem;
  }

  &:hover::before {
    background-color: rgba(0, 0, 0, 0.7);
  }

  > * {
    position: relative;
    z-index: 1;
  }
`;

const Thumbnail = styled.img`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  object-fit: cover;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const ImageTitle = styled.div`
  font-weight: bold;
  font-size: 0.9rem;
  color: #ffffff;
`;

const Uploader = styled.div`
  font-size: 0.8rem;
  color: #a4a4a4;
`;

const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [trendingItems, setTrendingItems] = useState([]);
  const navigate = useNavigate();
  const username = useUser((state) => state.username);
  console.log('username :', username);

  if (ignorePath().includes(location.pathname)) {
    return null;
  }

  return (
    <>
      <BackLayoutSpace />
      <BackLayout>
        <MenuContainer>
          <MenuItem onClick={() => navigate('/main')}>
            <HomeIcon fontSize="small" />
            <MenuTitle>Home</MenuTitle>
          </MenuItem>

          <MenuItem onClick={() => navigate('/create')}>
            <AddIcon fontSize="small" />
            <MenuTitle>Create</MenuTitle>
          </MenuItem>

          <MenuItem
            onClick={async () => {
              navigate(`/users/${username}`);
            }}
          >
            <MovieIcon fontSize="small" />
            <MenuTitle>My Studio</MenuTitle>
          </MenuItem>

          {/* Chart 버튼 */}
          <MenuItem
            onClick={async () => {
              navigate('/chart');
            }}
          >
            <EqualizerIcon fontSize="small" />
            <MenuTitle>Statics</MenuTitle>
          </MenuItem>

          <TrendingWrapper>
            <MenuItem onClick={() => setIsOpen(!isOpen)}>
              <WhatshotIcon fontSize="small" />
              <MenuTitle>Trending</MenuTitle>
              {isOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </MenuItem>
            <TrendingContainer isOpen={isOpen}>
              {trendingItems.map((item, index) => (
                <ThumbnailContainer
                  key={index}
                  backgroundImage={item.cover_image}
                >
                  <Thumbnail src={item.cover_image} alt={item.subject} />
                  <InfoContainer>
                    <ImageTitle>{item.subject}</ImageTitle>
                    <Uploader>{item.member_name}</Uploader>
                  </InfoContainer>
                </ThumbnailContainer>
              ))}
            </TrendingContainer>
          </TrendingWrapper>
        </MenuContainer>

        <MenuItem
          onClick={() => {
            Swal.fire({
              title: '로그아웃',
              text: '로그아웃하시겠습니까?',
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'logout',
            }).then((result) => {
              if (result.isConfirmed) {
                Swal.fire({
                  title: '로그아웃 완료!',
                  text: '로그아웃 되었습니다.',
                  icon: 'success',
                });
                postLogout().then(() => navigate('/auth'));
              }
            });
          }}
        >
          <LogoutIcon fontSize="small" />
          <MenuTitle>Logout</MenuTitle>
        </MenuItem>
      </BackLayout>
    </>
  );
}

export default Sidebar;
