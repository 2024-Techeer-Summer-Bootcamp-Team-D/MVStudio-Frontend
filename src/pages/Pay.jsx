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
  justify-content: space-between;
  align-items: center;
  width: 80%;
  height: 60%;
  padding: 1rem;
  margin-bottom: 2rem;
`;

const SelectBox = styled.div`
  width: 22.5rem;
  height: 25rem;
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
  font-size: 1.5rem;
  color: white;
  margin-top: 3rem;
`;

const MoreSmall2TextBox = styled.p`
  font-size: 1.5rem;
  color: white;
  margin-top: 1rem;
`;

const SmallTextBox = styled.p`
  font-size: 2rem;
  color: white;
`;

const MediumTextBox = styled.p`
  font-size: 2.8rem;
  color: white;
`;

const LargeTextBox = styled.p`
  font-size: 4.5rem;
  color: white;
`;

const PaymentButton = styled.button`
  width: 14rem;
  height: 4rem;
  background-image: url('https://i.ibb.co/gwVfSgx/kakaoo-removebg-preview.png');
  background-size: cover;
  background-position: center;
  border-radius: 0.5rem;
  margin-bottom: 5rem;
  cursor: pointer;
`;

const Pay = () => {
  const [selectedBox, setSelectedBox] = React.useState(null);

  const handleClick = (index) => {
    setSelectedBox(index);
  };

  const handlePayment = () => {
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
      alert(`Payment for ${credits} Credits selected.`);
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
        <PaymentButton onClick={handlePayment}></PaymentButton>
      </ParentContainer>
    </BackGoundContainer>
  );
};

export default Pay;
