import React from 'react';
import styled, { css } from 'styled-components';

const BackGoundContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-image: url('https://i.ibb.co/QYWG3Wc/image.png');
  background-size: cover;
  background-position: center;
`;

const ParentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

const WholeContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80%;
  height: 50%;
  padding: 1rem;
  margin-bottom: 1rem; // Reduced margin-bottom
  gap: 2rem;
`;

const SelectBox = styled.div`
  width: 18rem;
  height: 20rem;
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
  align-items: flex-end;
  padding-bottom: 2rem;
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
  padding-left: 3.2rem;
  padding-top: 2rem;
`;

const MoreSmallTextBox = styled.p`
  font-size: 1rem;
  color: white;
  margin-top: 3rem;
`;

const MoreSmall2TextBox = styled.p`
  font-size: 1rem;
  color: white;
  margin-top: 1rem;
`;

const SmallTextBox = styled.p`
  font-size: 1.5rem;
  color: white;
`;

const MediumTextBox = styled.p`
  font-size: 2rem;
  color: white;
`;

const LargeTextBox = styled.p`
  font-size: 3rem;
  color: white;
`;

const PayBox = styled.div`
  width: 40rem;
  height: 18rem;
  border: 2px solid #5b5b5b98;
  background-color: #141414;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

const PayButton = styled.button`
  width: 6rem;
  height: 3rem;
  background-color: #747474;
  border: 2px solid #5b5b5b98;
  border-radius: 2rem;
  color: white;
  border: none;
  cursor: pointer;
  transition:
    background-color 0.3s,
    transform 0.3s;

  &:hover {
    background-color: #333;
    transform: translateY(-0.3rem);
  }
`;

const PaymentButton = styled.div`
  position: relative;
  width: 12rem;
  height: 4rem;
  font-family: suit;
  font-weight: 800;
  font-size: 1.5rem;
  text-align: center;
  color: #000000;
  border-radius: 3rem;
  border: 2px solid transparent;
  background-color: ${(props) => props.bgColor};
  padding-top: 1rem;
  cursor: pointer;
  transition:
    transform 0.3s,
    border-color 0.3s;

  ${(props) =>
    props.selected &&
    css`
      border-color: #ffffff;
    `}
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 3rem;
`;

const Pay = () => {
  const [selectedBox, setSelectedBox] = React.useState(null);
  const [selectedPayment, setSelectedPayment] = React.useState(null);

  const handleClick = (index) => {
    setSelectedBox(index);
  };

  const handlePaymentButtonClick = (method) => {
    setSelectedPayment(method);
  };

  const handlePayment = () => {
    if (!selectedPayment) {
      alert('Please select a payment method.');
      return;
    }

    if (selectedPayment !== 'KakaoPay') {
      alert('카카오페이로만 결제가 가능합니다.');
      return;
    }

    let credits = null;
    switch (selectedBox) {
      case 0:
        credits = 20;
        break;
      case 1:
        credits = 50;
        break;
      case 2:
        credits = 100;
        break;
      case 3:
        credits = 200;
        break;
      default:
        break;
    }

    if (credits !== null) {
      alert(
        `Payment for ${credits} Credits selected using ${selectedPayment}.`,
      );
    } else {
      alert('Please select the number of credits to purchase.');
    }
  };

  return (
    <BackGoundContainer>
      <ParentContainer>
        <WholeContainer>
          {[
            { credits: 20, price: '₩2,000', info1: 123, info2: 123 },
            { credits: 50, price: '₩5,000', info1: 123, info2: 123 },
            { credits: 100, price: '₩10,000', info1: 123, info2: 123 },
            { credits: 200, price: '₩20,000', info1: 123, info2: 123 },
          ].map((item, index) => (
            <SelectBox
              key={index}
              onClick={() => handleClick(index)}
              selected={selectedBox === index}
            >
              <TopBox>
                <LargeTextBox>{item.credits}</LargeTextBox>
                <MediumTextBox>&nbsp;Credits</MediumTextBox>
              </TopBox>
              <BottomBox>
                <SmallTextBox>{item.price}</SmallTextBox>
                <MoreSmallTextBox>{item.info1}</MoreSmallTextBox>
                <MoreSmall2TextBox>{item.info2}</MoreSmall2TextBox>
              </BottomBox>
            </SelectBox>
          ))}
        </WholeContainer>
        <PayBox>
          <ButtonRow>
            <PaymentButton
              bgColor="yellow"
              selected={selectedPayment === 'KakaoPay'}
              onClick={() => handlePaymentButtonClick('KakaoPay')}
            >
              KakaoPay
            </PaymentButton>
            <PaymentButton
              bgColor="#00e700"
              selected={selectedPayment === 'NaverPay'}
              onClick={() => handlePaymentButtonClick('NaverPay')}
            >
              NaverPay
            </PaymentButton>
          </ButtonRow>
          <ButtonRow>
            <PaymentButton
              bgColor="blue"
              selected={selectedPayment === 'TossPay'}
              onClick={() => handlePaymentButtonClick('TossPay')}
            >
              TossPay
            </PaymentButton>
            <PaymentButton
              bgColor="red"
              selected={selectedPayment === 'Payco'}
              onClick={() => handlePaymentButtonClick('Payco')}
            >
              Payco
            </PaymentButton>
          </ButtonRow>
          <PayButton onClick={handlePayment} style={{ marginTop: '1rem' }}>
            Pay
          </PayButton>
        </PayBox>
      </ParentContainer>
    </BackGoundContainer>
  );
};

export default Pay;
