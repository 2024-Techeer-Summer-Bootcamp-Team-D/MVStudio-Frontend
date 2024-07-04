/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import IosShareIcon from '@mui/icons-material/IosShare';

const BigContainer = styled.div`
  display: flex;
  width: 43.75rem;
  height: 12.82rem;
  position: relative;
  flex-direction: row;
  margin-bottom: 1.5rem;
`;

const ReaderPic = styled.img`
  width: 10.875rem;
  height: 11.875rem;
  margin: 0.5rem;
  object-fit: cover;
  z-index: 2;
  position: relative;
  border-radius: 20%;
`;

const InfoContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-position: center;
  filter: blur(3px) brightness(50%);
  position: absolute;
  border-radius: 2rem;
  top: 0;
  left: 0;
  z-index: 1;
`;

const Overlay = styled.div`
  position: relative;
  z-index: 3;
  display: flex;
  flex-direction: column;
  margin: 0;
  width: calc(100% - 12.375rem);
  margin-left: 2rem;
  margin-top: -0.5rem;
  margin-right: 2rem;
`;

const UploaderContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const UploaderIcon = styled(PersonOutlineIcon)`
  color: #ffffff;
  margin-right: 0.5rem;
`;

const Title = styled.p`
  font-size: 1.5rem;
  color: #ffffff;
  margin-bottom: 0.5rem;
`;

const ViewContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const Uploader = styled.p`
  font-size: 0.9rem;
  color: #ffffff;
  margin: 0;
`;

const ViewIcon = styled(VisibilityIcon)`
  color: #ffffff;
  margin-right: 0.5rem;
`;

const View = styled.p`
  font-size: 1rem;
  color: #ffffff;
  margin: 0;
`;

const Options = styled.p`
  font-size: 0.9rem;
  color: #ffffff;
  margin: 0;
  word-wrap: break-word;
  margin-top: 0.2rem;
`;

const ExtraInfo = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  top: -0.7rem;
  right: -1.5rem;
  width: 10rem;
  height: 93%;
  padding: 1rem;
`;

const DeleteIcon = styled(DeleteOutlineIcon)`
  visibility: ${(props) => (props.owner ? 'hidden' : 'visible')};
  color: #ffffff;
`;

const ShareIcon = styled(IosShareIcon)`
  visibility: ${(props) => (props.owner ? 'hidden' : 'visible')};
  color: #ffffff;
  margin-top: 1rem;
`;

function LongCover({ pic, title, uploader, view, options, owner }) {
  return (
    <BigContainer>
      <ReaderPic src={pic} alt="pic" />
      <InfoContainer src={pic} />
      <Overlay>
        <Title>{title}</Title>
        <UploaderContainer>
          <UploaderIcon fontSize="small" />
          <Uploader>{uploader}</Uploader>
        </UploaderContainer>
        <ViewContainer>
          <ViewIcon fontSize="small" />
          <View>{view}</View>
        </ViewContainer>
        <Options>{options}</Options>
        <ExtraInfo>
          <ShareIcon owner={owner} fontSize="small" />
          <DeleteIcon owner={owner} fontSize="small" />
        </ExtraInfo>
      </Overlay>
    </BigContainer>
  );
}

export default LongCover;
