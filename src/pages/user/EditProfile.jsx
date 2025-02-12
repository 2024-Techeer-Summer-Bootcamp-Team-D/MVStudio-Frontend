import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getMemberInfo, getCountries, patchMemberInfo } from '@/api/member';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { useUser } from '@/libs/stores/userStore';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const StyledForm = styled.form`
  background-color: #dfd4df;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 2rem auto;
  padding: 2rem;
  border-radius: 10px;
  text-align: center;
  min-width: 30%;
  margin-top: 5%;
  margin-left: 32%;
`;

const StyledButton = styled.button`
  margin-top: 2rem;
  border-radius: 1.25rem;
  border: none;
  cursor: pointer;
  background-color: #0f0110;
  color: #fff;
  font-size: 0.75rem;
  font-weight: bold;
  padding: 0.75rem 2.8125rem;
  letter-spacing: 1px;
  z-index: 5;
  text-transform: uppercase;
`;

const StyledInput = styled.input`
  background-color: #fbfafb;
  border-radius: 0.25rem;
  border: none;
  padding: 0.75rem 1rem;
  margin: 0.5rem 0;
  width: 100%;
  height: 3.125rem;
  font-size: 1rem;
`;

const ProfileImageWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1rem 0;
`;

const ProfileImage = styled.img`
  border-radius: 50%;
  width: 7rem;
  height: 7rem;
  object-fit: cover;
`;

const CameraIconWrapper = styled.div`
  position: absolute;
  top: 10;
  right: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: end;
  align-items: start;
  opacity: 0;
  transition: opacity 0.3s ease;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.3);

  &:hover {
    opacity: 1;
  }
`;

const CameraIcon = styled(CameraAltIcon)`
  margin-top: 0.2rem;
  color: black;
  cursor: pointer;
`;

const ProfileImageInput = styled.input`
  display: none;
`;

const InputTitle = styled.p`
  display: flex;
  font-size: 0.7rem;
  margin-bottom: -0.9rem;
  margin-left: 1rem;
  color: #585559;
  z-index: 5;
`;

function EditProfile() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    nickname: '',
    country: 0,
    birthday: dayjs(),
    profile_image: null,
    comment: '',
    profile_image_file: null,
  });
  const [countryList, setCountryList] = useState([]);
  const username = useUser((state) => state.username);
  const [placehol, setPlacehol] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getCountries();
        setCountryList(response.data);
      } catch {
        console.error('Error fetching country data');
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchMemberInfo = async () => {
      try {
        const response = await getMemberInfo(username);
        setUserInfo({
          nickname: response.data.nickname,
          birthday: dayjs(response.data.birthday),
          profile_image: response.data.profile_image,
          comment: response.data.comment,
          profile_image_file: null,
          email: response.data.email,
          sex: response.data.sex,
        });
        setPlacehol(response.data.country);
      } catch (error) {
        console.error('Error fetching member info', error);
      }
    };
    fetchMemberInfo();
  }, [username]);

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUserInfo((prevState) => ({
        ...prevState,
        profile_image: URL.createObjectURL(file),
        profile_image_file: file,
      }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCountryChange = (event) => {
    const countryId = event.target.value;
    setUserInfo((prevState) => ({
      ...prevState,
      country: countryId,
    }));
  };

  const handleDateChange = (date) => {
    setUserInfo((prevState) => ({
      ...prevState,
      birthday: date,
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await patchMemberInfo(
        username,
        userInfo.nickname,
        userInfo.comment,
        userInfo.country,
        userInfo.birthday.format('YYYY-MM-DD'),
        userInfo.profile_image_file,
        userInfo.email,
        userInfo.sex,
        '',
        '',
      );
      return response;
    } catch (error) {
      console.error('Error patching member info:', error);
    }
  };

  return (
    <StyledForm>
      <ProfileImageWrapper>
        <ProfileImage
          src={
            userInfo.profile_image
              ? userInfo.profile_image
              : 'https://i.ibb.co/nB2HMyf/image.png'
          }
          alt="Profile"
        />
        <CameraIconWrapper>
          <label>
            <CameraIcon />
            <ProfileImageInput
              type="file"
              accept="image/*"
              onChange={handleProfileImageChange}
            />
          </label>
        </CameraIconWrapper>
      </ProfileImageWrapper>
      <FormControl sx={{ m: 1, minWidth: '90%' }}>
        <InputTitle>Email</InputTitle>
        <StyledInput
          id="email"
          name="email"
          type="text"
          placeholder="Enter your email"
          value={userInfo.email}
          onChange={handleChange}
        />
        <InputTitle>NickName</InputTitle>
        <StyledInput
          id="nickname"
          name="nickname"
          type="text"
          placeholder="Enter your Nickname"
          value={userInfo.nickname}
          onChange={handleChange}
        />
        <InputTitle>Comment</InputTitle>
        <StyledInput
          id="comment"
          name="comment"
          type="text"
          placeholder="Edit your comment"
          value={userInfo.comment}
          onChange={handleChange}
        />
      </FormControl>
      <FormControl
        sx={{
          m: 1,
          minWidth: '90%',
          bgcolor: '#fbfafb',
          border: 'none',
          borderRadius: '0.5rem',
          fontSize: '1rem',
        }}
      >
        <InputLabel id="country-label">{placehol}</InputLabel>
        <Select
          labelId="country-label"
          id="country"
          name="country"
          value={userInfo.country}
          onChange={handleCountryChange}
          autoWidth
          label="Country"
        >
          {countryList.map((data) => (
            <MenuItem key={data.name} value={data.id}>
              {data.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          sx={{
            m: 1,
            minWidth: '90%',
            bgcolor: '#fbfafb',
            border: 'none',
            borderRadius: '0.5rem',
            fontSize: '1rem',
          }}
          value={userInfo.birthday}
          label="Birthday"
          onChange={handleDateChange}
        />
      </LocalizationProvider>
      <StyledButton
        type="button"
        onClick={() => {
          Swal.fire({
            title: '확인',
            text: '정보가 수정되었습니다',
            icon: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: '확인',
          }).then(() => {
            handleSubmit();
            navigate(`/users/${username}`);
          });
        }}
      >
        Save Changes
      </StyledButton>
    </StyledForm>
  );
}

export default EditProfile;
