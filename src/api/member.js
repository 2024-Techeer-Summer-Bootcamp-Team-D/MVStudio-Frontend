import { formAxios, jsonAxios } from './axios.config';

export const postLogin = async (id, pw) => {
  //동기처리
  try {
    const response = await jsonAxios.post(
      //await로 함수 끝날때까지 다른거 사용 x
      '/members/login',
      {
        login_id: id,
        password: pw,
      },
    );
    console.log('response:', response.data);
    return response.data;
  } catch (error) {
    console.error('errorcode:', error);
  }
};

export const postRegister = async (
  id,
  pw,
  nickName,
  birthday,
  sex,
  country,
) => {
  try {
    const response = await jsonAxios.post('/members/sign-up', {
      login_id: id,
      password: pw,
      nickname: nickName,
      sex: sex,
      country: country,
      birthday: birthday,
    });

    console.log('response:', response.data);
    return response.data;
  } catch (error) {
    console.error('errorcode:', error);
  }
};

export const getCountries = async () => {
  try {
    const response = await jsonAxios.get('/members/countries');
    console.log('response:', response);
    return response.data;
  } catch (error) {
    console.error('errorcode:', error);
  }
};

export const getMemberInfo = async (username) => {
  try {
    const response = await jsonAxios.get(`/members/details/${username}`);
    console.log('겟멤버:', response.data);
    return response.data;
  } catch (error) {
    console.error('errorcode:', error);
  }
};

export const patchMemberInfo = async (
  username,
  nickname,
  comment,
  country,
  birthday,
  profileImageFile,
  email,
) => {
  const formData = new FormData();

  // 이미지 파일 추가
  if (profileImageFile) {
    formData.append('profile_image', profileImageFile);
  }

  // JSON 데이터 추가
  const jsonData = {
    email,
    username,
    nickname,
    comment,
    country,
    birthday,
  };
  formData.append('json_data', JSON.stringify(jsonData));

  try {
    const response = await formAxios.patch(`/members/details/${username}`, {
      nickname: formData.nickname,
      comment: formData.comment,
      country: formData.country,
      birthday: formData.birthday,
      profile_image: formData.profileImageFile,
      email: formData.email,
    });
    return response.data;
  } catch (error) {
    console.error('Error patching member info:', error);
    throw error;
  }
};
