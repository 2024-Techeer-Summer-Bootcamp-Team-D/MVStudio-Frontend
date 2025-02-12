import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { useNavigate } from 'react-router-dom';

const BigContainer = styled.div`
  display: flex;
  width: 95rem;
  height: 18.5rem;
  position: relative;
  flex-direction: row;
  align-items: start;
  border-radius: 2rem;
`;

const ReaderContainer = styled.div`
  position: relative;
  width: 28.8rem;
  height: 17rem;
  margin-top: 2.8rem;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover .reader-pic {
    filter: brightness(0.8);
  }

  &:hover .play-icon {
    opacity: 1;
  }
`;

const ReaderPic = styled.img`
  border-radius: 0.5rem;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: filter 0.3s ease;
  filter: brightness(90%);
`;

const PlayIcon = styled(PlayArrowIcon)`
  position: absolute;
  color: white;
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 3;
`;

const Overlay = styled.div`
  position: relative;
  z-index: 3;
  display: flex;
  flex-direction: column;
  width: calc(100% - 12.375rem);
  height: 100%;
  margin-left: 1.5rem;
  margin-top: 3.8rem;
  margin-bottom: 1rem;
`;

const UploaderContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
`;

const Title = styled.p`
  font-size: 1.8rem;
  font-weight: 550;
  color: #ffffff;
  margin-bottom: 0.5rem;
  margin-top: -1rem;
`;

const ViewContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 0.1rem;
`;

const Uploader = styled.p`
  font-size: 1rem;
  color: #ffffff;
  margin-left: 0.8rem;
  margin-bottom: 0.5rem;
`;

const View = styled.p`
  font-size: 0.8rem;
  color: #ffffff;
  margin-top: 0.5rem;
  margin-right: auto;
`;

const Options = styled.div`
  font-size: 1rem;
  color: #ffffff;
  margin: 0;
  word-wrap: break-word;
  width: 93.5%;
  height: 14rem;
  border-radius: 1rem;
  line-height: 1.1;
`;

const LengthText = styled.span`
  position: absolute;
  bottom: 0.6rem;
  right: 0.7rem;
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  padding: 0.2rem 0.4rem;
  border-radius: 0.2rem;
  font-size: 0.8rem;
  font-family: suit;
  font-weight: 800;
`;

const Profile = styled.img`
  width: 2rem;
  height: 2rem;
  border-radius: 1rem;
`;

const LongCover = ({ data }) => {
  const navigate = useNavigate();

  const handleReaderContainerClick = () => {
    navigate(`/play?id=${data.id}`);
  };

  if (!data) {
    return null;
  }

  const options = [
    ...data.options.genres,
    ...data.options.instruments,
    data.options.style_name,
    data.options.language,
    data.options.vocal,
    data.options.tempo,
  ]
    .filter(Boolean)
    .join(', ');

  return (
    <BigContainer>
      <ReaderContainer onClick={handleReaderContainerClick}>
        <ReaderPic src={data.pic} className="reader-pic" />
        <PlayIcon className="play-icon" />
        <LengthText>{data.mvlength}</LengthText>
      </ReaderContainer>
      <Overlay>
        <Title>{data.title}</Title>
        <ViewContainer>
          <View>{data.view} views</View>
        </ViewContainer>
        <UploaderContainer>
          <Profile
            src={data.profile_image || 'https://i.ibb.co/h8q8YgC/pro.jpg'}
          />
          <Uploader>{data.uploader}</Uploader>
        </UploaderContainer>
        <Options>{options}</Options>
      </Overlay>
    </BigContainer>
  );
};

LongCover.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    pic: PropTypes.string.isRequired,
    profile_image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    uploader: PropTypes.string.isRequired,
    view: PropTypes.number.isRequired,
    mvlength: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
      .isRequired,
    options: PropTypes.shape({
      genres: PropTypes.arrayOf(PropTypes.string).isRequired,
      instruments: PropTypes.arrayOf(PropTypes.string).isRequired,
      style_name: PropTypes.string.isRequired,
      language: PropTypes.string.isRequired,
      vocal: PropTypes.string.isRequired,
      tempo: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default LongCover;
