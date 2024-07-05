/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import IosShareIcon from '@mui/icons-material/IosShare';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

const BigContainer = styled.div`
  display: flex;
  width: 60rem;
  height: 12.82rem;
  position: relative;
  flex-direction: row;
  margin-bottom: 1.5rem;
`;

const ReaderContainer = styled.div`
  position: absolute;
  top: 0.5rem;
  left: 0.5rem;
  width: 10.875rem;
  height: 11.875rem;
  z-index: 2; /* Ensure this is above the InfoContainer */

  &:hover .play-icon {
    opacity: 1;
  }
`;

const ReaderPic = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 20%;
  object-fit: cover;
  transition: filter 0.3s ease;
  filter: brightness(90%);

  &:hover {
    filter: brightness(0.8);
  }
`;

const PlayIcon = styled(PlayArrowIcon)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  opacity: 0;
  transition: opacity 0.3s ease;
  cursor: pointer;
`;

const InfoContainer = styled.div`
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.src});
  background-size: cover;
  background-position: center;
  filter: blur(3px) brightness(50%);
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  border-radius: 2rem;
`;

const Overlay = styled.div`
  position: relative;
  z-index: 3;
  display: flex;
  flex-direction: column;
  width: calc(100% - 12.375rem);
  margin-left: 13.375rem; /* Consider the margin and ReaderContainer width */
  margin-top: 0.5rem;
  padding-right: 2rem;
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
  font-size: 1.2rem;
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
  font-size: 1.2rem;
  color: #c0bdbd;
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
  top: -1.4rem;
  right: -0.2rem;
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
      <ReaderContainer>
        <ReaderPic src="https://i.ibb.co/Jn12dqF/unnamed.jpg" alt="Reader" />
        <PlayIcon fontSize="large" className="play-icon" />
      </ReaderContainer>
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
          <ShareIcon owner={owner} fontSize="medium" />
          <DeleteIcon owner={owner} fontSize="medium" />
        </ExtraInfo>
      </Overlay>
    </BigContainer>
  );
}

export default LongCover;
