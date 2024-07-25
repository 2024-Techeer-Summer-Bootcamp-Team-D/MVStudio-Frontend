/* eslint-disable react/prop-types */
import React from 'react';
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

const BackLayout = styled.div`
  display: flex;
  flex-direction: column;
  width: 15rem;
  height: calc(100% - 5rem);
  position: fixed;
  border-right: 1px solid #1e003b;
  padding: 1rem;
  justify-content: space-between;
  background-color: #05000a;
`;

const BackLayoutSpace = styled.div`
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
  &:hover {
    background-color: #333333;
    border-radius: 0.5rem;
  }
`;

const MenuTitle = styled.div`
  margin-left: 0.625rem;
`;

const TrendingText = styled.p`
  margin-left: 0.625rem;
  padding-right: 2.5rem;
  font-weight: 500;
  font-size: 1.2rem;
`;

const TrendingContainer = styled.div`
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  transition:
    max-height 0.5s ease,
    opacity 0.5s ease;
`;

const Thumbnail = styled.img`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ThumbnailContainer = styled.div`
  display: flex;
  align-items: column;
  gap: 1rem; /* Adjust spacing between image and text */
`;

const ImageTitle = styled.div`
  font-weight: bold;
  font-size: 1.1rem;
`;

const Uploader = styled.div`
  font-size: 0.7rem;
  color: #a4a4a4;
`;

const EditMovieIcon = styled(MovieIcon)`
  margin-right: 0.6rem;
`;

const EditEqualizerIcon = styled(EqualizerIcon)`
  margin-right: 0.6rem;
`;

const LogoutContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: end;
  justify-content: start;
  margin-left: 1rem;
  margin-right: 1rem;
  padding-left: 0.25rem;
  color: white;
  background-color: #a2a2a2;
`;

const LogoutButton = styled.button`
  display: flex;
  height: 3rem;
  align-items: center;
  margin-left: 1rem;
  margin-right: 1rem;
  padding-left: 0.25rem;
  color: white;
  cursor: pointer;
  &:hover {
    background-color: #333333;
    border-radius: 0.5rem;
  }
`;

const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

function Sidebar() {
  const navigate = useNavigate();
  const username = useUser((state) => state.username);
  const fetchUser = useUser((state) => state.fetchUser);

  if (ignorePath().includes(location.pathname)) {
    return null;
  }

  return (
    <>
      <BackLayoutSpace />
      <BackLayout>
        <MenuContainer>
          {/* Home 버튼 */}
          <MenuItem onClick={() => navigate('/main')}>
            <HomeIcon fontSize="small" />
            <MenuTitle>Home</MenuTitle>
          </MenuItem>

          {/* Create 버튼 */}
          <MenuItem onClick={() => navigate('/create')}>
            <AddIcon fontSize="small" />
            <MenuTitle>Create</MenuTitle>
          </MenuItem>

          {/* My Studio 버튼 */}
          <MenuItem
            onClick={async () => {
              await fetchUser();
              navigate(`/users/${username}`);
            }}
          >
            <MovieIcon fontSize="small" />
            <MenuTitle>My Studio</MenuTitle>
          </MenuItem>

          {/* Chart 버튼 */}
          <MenuItem
            onClick={async () => {
              await fetchUser();
              navigate(`/charts/${username}`);
            }}
          >
            <EqualizerIcon fontSize="small" />
            <MenuTitle>Statics</MenuTitle>
          </MenuItem>

          {/* Trending 리스트 */}
          <MenuItem>
            <WhatshotIcon fontSize="small" />
            <MenuTitle>Trending</MenuTitle>
          </MenuItem>
        </MenuContainer>
        {/* Trending 리스트 확장 */}
        <TrendingContainer>
          {/* <ThumbnailContainer>
          <Thumbnail src="https://i.ibb.co/Jn12dqF/unnamed.jpg" alt="alt" />
          <InfoContainer>
            <ImageTitle>Title</ImageTitle>
            <Uploader>Uploader</Uploader>
          </InfoContainer>
        </ThumbnailContainer>
        <ThumbnailContainer>
          <Thumbnail src="https://i.ibb.co/Jn12dqF/unnamed.jpg" alt="alt" />
          <InfoContainer>
            <ImageTitle>Title</ImageTitle>
            <Uploader>Uploader</Uploader>
          </InfoContainer>
        </ThumbnailContainer>
        <ThumbnailContainer>
          <Thumbnail src="https://i.ibb.co/Jn12dqF/unnamed.jpg" alt="alt" />
          <InfoContainer>
            <ImageTitle>Title</ImageTitle>
            <Uploader>Uploader</Uploader>
          </InfoContainer>
        </ThumbnailContainer>
        <ThumbnailContainer>
          <Thumbnail src="https://i.ibb.co/Jn12dqF/unnamed.jpg" alt="alt" />
          <InfoContainer>
            <ImageTitle>Title</ImageTitle>
            <Uploader>Uploader</Uploader>
          </InfoContainer>
        </ThumbnailContainer>
        <ThumbnailContainer>
          <Thumbnail src="https://i.ibb.co/Jn12dqF/unnamed.jpg" alt="alt" />
          <InfoContainer>
            <ImageTitle>Title</ImageTitle>
            <Uploader>Uploader</Uploader>
          </InfoContainer>
        </ThumbnailContainer>
        <ThumbnailContainer>
          <Thumbnail src="https://i.ibb.co/Jn12dqF/unnamed.jpg" alt="alt" />
          <InfoContainer>
            <ImageTitle>Title</ImageTitle>
            <Uploader>Uploader</Uploader>
          </InfoContainer>
        </ThumbnailContainer>
        <ThumbnailContainer>
          <Thumbnail src="https://i.ibb.co/Jn12dqF/unnamed.jpg" alt="alt" />
          <InfoContainer>
            <ImageTitle>Title</ImageTitle>
            <Uploader>Uploader</Uploader>
          </InfoContainer>
        </ThumbnailContainer> */}
        </TrendingContainer>

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
