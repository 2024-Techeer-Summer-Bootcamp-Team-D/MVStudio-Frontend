import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import Swal from 'sweetalert2';
import { kakaoPayment } from '@/api/member';
import { useLocation } from 'react-router-dom';

const BackLayout = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  background-image: url('https://i.ibb.co/72bmVLd/Group-1457.png');
  background-size: cover;
`;

const Blur = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(5, 0, 10, 0.85);
`;

const NoBlur = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const BoxContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 1rem;
  margin-bottom: 1rem;
  z-index: 2;
`;

const Category = styled.div`
  width: 15rem;
  font-size: 1.5rem;
  color: white;
  border-top: 2px solid white;
  padding-top: 1rem;
  padding-left: 1rem;
`;

const Title = styled.h2`
  display: flex;
  font-size: 1.5rem;
  color: white;
  padding: 1rem;
`;

const SelectBox = styled.div`
  width: 12rem;
  height: 19rem;
  border: 2px solid #5b5b5b98;
  margin-bottom: 2rem;
  cursor: pointer;
  transition:
    transform 0.3s,
    border-color 0.3s;

  &:hover {
    transform: translateY(-0.8rem);
    border-color: #ffffff;
  }

  ${(props) =>
    props.selected &&
    css`
      border-color: #ffffff;
    `}
`;

const TopBox = styled.div`
  width: 100%;
  height: 35%;
  background-color: #000000;
  color: white;
  font-family: suit;
  font-weight: 700;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.125rem;
  color: white;
`;

const BottomBox = styled.div`
  width: 100%;
  height: 65%;
  background-color: #141414;
  color: white;
  font-family: suit;
  font-weight: 700;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SmallTextBox = styled.p`
  color: white;
`;

const LargeTextBox = styled.p`
  font-size: 2rem;
  color: white;
`;

const PayMethod = styled.div`
  width: 12rem;
  height: 4rem;
  font-family: suit;
  font-weight: 800;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.bgColor};
  color: ${(props) => props.text};
  border: 2px solid transparent;
  cursor: pointer;
  margin-bottom: 2rem;
  transition:
    transform 0.3s,
    border-color 0.3s;
  &:hover {
    transform: translateY(-0.8rem);
    border-color: white;
  }

  ${(props) =>
    props.selected &&
    css`
      border-color: white;
    `}
`;

const Caution = styled.div`
  font-size: 0.75rem;
  color: white;
  padding: 1rem;
  padding-top: 2rem;
  padding-bottom: 2rem;
  border: 2px solid white;
  width: 48rem;
  line-height: 2;
  margin-bottom: 2rem;
`;

const PaymentButton = styled.button`
  width: 12rem;
  height: 4rem;
  font-family: suit;
  font-weight: 800;
  font-size: 1rem;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #570080;
  color: white;
  cursor: pointer;
  border: 2px solid transparent;
  transition:
    transform 0.3s,
    border-color 0.3s;
  &:hover {
    border: 2px solid white;
  }
`;

const CreditImage = styled.img`
  height: 70%;
`;

const Pay = () => {
  const [selectedBox, setSelectedBox] = useState({});
  const [selectedPayment, setSelectedPayment] = useState();
  const location = useLocation();
  const status = new URLSearchParams(location.search).get('status');

  useEffect(() => {
    if (status === 'success') {
      Swal.fire({
        icon: 'success',
        title: '결제가 완료되었습니다.',
        text: 'Credit이 충전되었습니다.',
      });
    } else if (status === 'fail') {
      Swal.fire({
        icon: 'error',
        title: '결제에 실패하였습니다.',
        text: '다시 시도해주세요.',
      });
    }
  }, [status]);

  const handlePaymentButtonClick = (method) => {
    if (method === 'KakaoPay') {
      setSelectedPayment(method);
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `죄송합니다. 지금은 ${method}로 결제할 수 없습니다.`,
      });
    }
  };

  return (
    <BackLayout>
      <Blur />
      <NoBlur>
        <Title>MVStudio 크레딧 결제 창입니다.</Title>
        <BoxContainer>
          <Category>결제 금액</Category>
          {[
            {
              credits: 20,
              price: 1900,
              image: 'https://i.ibb.co/XDSN5xD/credit-20.png',
            },
            {
              credits: 50,
              price: 4900,
              image: 'https://i.ibb.co/xmtb8wV/credit-50.png',
            },
            {
              credits: 100,
              price: 9900,
              image: 'https://i.ibb.co/jDT5yDt/credit-100.png',
            },
            {
              credits: 200,
              price: 19000,
              image: 'https://i.ibb.co/HN2VhHN/credit-200.png',
            },
          ].map((item, index) => (
            <SelectBox
              key={index}
              onClick={() =>
                setSelectedBox({
                  index: index,
                  credits: item.credits,
                  price: item.price,
                })
              }
              selected={selectedBox.index === index}
            >
              <TopBox>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'end',
                  }}
                >
                  <LargeTextBox>{item.credits}</LargeTextBox>
                  &nbsp;Credits
                </div>
              </TopBox>
              <BottomBox>
                <CreditImage src={item.image} />
                <SmallTextBox>
                  ₩{item.price.toLocaleString('ko-KR')}
                </SmallTextBox>
              </BottomBox>
            </SelectBox>
          ))}
        </BoxContainer>
        <BoxContainer>
          <Category>결제 수단</Category>
          {[
            {
              method: 'KakaoPay',
              bgColor: '#FEE500',
              text: '#3B1F1E',
              icon: 'https://mvstudio-bucket.s3.ap-northeast-2.amazonaws.com/static_image/payment_image/kakao_icon.png',
            },
            {
              method: 'NaverPay',
              bgColor: '#1ECD00',
              text: 'white',
              icon: 'https://mvstudio-bucket.s3.ap-northeast-2.amazonaws.com/static_image/payment_image/naver_icon.png',
            },
            {
              method: 'TossPay',
              bgColor: '#0064FF',
              text: 'white',
              icon: 'https://mvstudio-bucket.s3.ap-northeast-2.amazonaws.com/static_image/payment_image/toss_icon.png',
            },
            { method: 'Payco', bgColor: '#FF242C', text: 'white', icon: '' },
          ].map((item, index) => (
            <PayMethod
              key={index}
              bgColor={item.bgColor}
              text={item.text}
              selected={selectedPayment === item.method}
              onClick={() => handlePaymentButtonClick(item.method)}
            >
              {item.method !== 'Payco' && (
                <img
                  src={item.icon}
                  style={{ height: '1rem', marginRight: '0.5rem' }}
                />
              )}
              {item.method}
            </PayMethod>
          ))}
        </BoxContainer>
        <BoxContainer>
          <Category>주의사항</Category>
          <Caution>
            Credit 충전을 위해 해당 결제 모바일 앱이 필요합니다. <br />
            Credit의 유효기간은 1시간 입니다. <br />
            현재 결제는{' '}
            <span style={{ fontWeight: '900', color: '#d68787' }}>
              테스트 결제
            </span>
            로 진행되며, 실제 결제가 이루어지지 않고 Credit도 충전되지 않습니다.{' '}
            <br />
            실제로 Credit 충전을 원하시면 jinoo0306@naver.com로 문의 주세요.
            <br />
          </Caution>
        </BoxContainer>
        <BoxContainer>
          <Category>결제하기</Category>
          <PaymentButton
            bgColor="green"
            text="white"
            onClick={() => {
              if (!selectedPayment) {
                Swal.fire({
                  icon: 'error',
                  title: '결제방식을 선택해주세요.',
                });
                return;
              }
              kakaoPayment(selectedBox.credits, selectedBox.price).then(
                (res) => {
                  if (res.status === 201) {
                    window.location.href = res.next_redirect_pc_url;
                  }
                },
              );
            }}
            style={{ width: '48rem' }}
          >
            동의하고 결제하기
          </PaymentButton>
        </BoxContainer>
      </NoBlur>
    </BackLayout>
  );
};

export default Pay;
