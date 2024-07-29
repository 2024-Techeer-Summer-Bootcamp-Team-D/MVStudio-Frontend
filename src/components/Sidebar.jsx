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

const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

function Sidebar() {
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
            <MenuTitle>Analysis</MenuTitle>
          </MenuItem>
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
