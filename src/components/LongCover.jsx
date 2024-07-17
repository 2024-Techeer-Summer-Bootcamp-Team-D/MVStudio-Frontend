import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

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
  cursor: pointer;
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
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
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
  margin-bottom: 1.3rem;
`;

const View = styled.p`
  font-size: 0.8rem;
  color: #ffffff;
  margin: 0;
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
  if (!data) {
    return null;
  }

  return (
    <BigContainer>
      <ReaderContainer>
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

        <Options>
          {data.options.genres.join(', ')}
          ,&nbsp;{data.options.instruments.join(', ')}
          ,&nbsp;{data.options.style_name}
          ,&nbsp;{data.options.language}
          ,&nbsp;{data.options.vocal ? 'Vocal' : 'Instrumental'}
          ,&nbsp;{data.options.tempo}
        </Options>
      </Overlay>
    </BigContainer>
  );
};

LongCover.propTypes = {
  data: PropTypes.shape({
    pic: PropTypes.string.isRequired,
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
      vocal: PropTypes.bool.isRequired,
      tempo: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default LongCover;
