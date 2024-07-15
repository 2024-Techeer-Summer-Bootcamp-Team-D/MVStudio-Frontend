import { jsonAxios } from './axios.config';

export const postLogin = async (id, pw) => {
  //동기처리
  try {
    const response = await jsonAxios.post(
      //await로 함수 끝날때까지 다른거 사용 x
      '/members/login/',
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
    const response = await jsonAxios.get('/members/countries/');
    console.log('response:', response);
    return response.data;
  } catch (error) {
    console.error('errorcode:', error);
  }
};

export const getMemberInfo = async (id) => {
  try {
    const response = await jsonAxios.get(`/members/${id}/`);
    console.log('겟멤버:', response.data);
    return response.data;
  } catch (error) {
    console.error('errorcode:', error);
  }
};
