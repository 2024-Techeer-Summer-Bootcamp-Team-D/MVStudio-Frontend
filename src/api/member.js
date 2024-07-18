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
    const response = await jsonAxios.post('/members/', {
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

export const getMemberInfo = async (id) => {
  try {
    const response = await jsonAxios.get(`/members/${id}`);
    console.log('겟멤버:', response.data);
    return response.data;
  } catch (error) {
    console.error('errorcode:', error);
  }
};

export const patchMemberInfo = async (
  memberId,
  nickname,
  comment,
  country,
  birthday,
  profileImageFile,
) => {
  const formData = new FormData();

  // 이미지 파일 추가
  if (profileImageFile) {
    formData.append('profile_image', profileImageFile);
  }

  // JSON 데이터 추가
  const jsonData = {
    nickname,
    comment,
    country,
    birthday,
  };
  formData.append('json_data', JSON.stringify(jsonData));

  try {
    const response = await formAxios.patch(`/members/${memberId}`,{
      nickname: jsonData.nickname
      comment: j
    });
    return response.data;
  } catch (error) {
    console.error('Error patching member info:', error);
    throw error;
  }
};
