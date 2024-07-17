// Search.jsx

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import LongCover from '../components/LongCover';
import { useLocation } from 'react-router-dom';
import { getsearch } from '../api/search';

const BigContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const WholeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-left: 3%;
`;

const LoadingMessage = styled.img.attrs({
  src: 'https://i.ibb.co/jvXptkm/loading.gif',
})`
  width: 2rem;
  height: 1rem;
  margin-bottom: 1rem;
`;

const NoResultsMessage = styled.p`
  font-size: 1.5rem;
  color: #555555;
  margin-top: 2rem;
`;

const Search = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const keyword = searchParams.get('keyword') || '';
  const [currentPage, setCurrentPage] = useState(1);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await getsearch(currentPage, 2, keyword);
        console.log('Response data:', result);
        if (result && result.music_videos) {
          setItems((prevItems) => [...prevItems, ...result.music_videos]);
          setHasMore(result.pagination && result.pagination.next_page);
        } else {
          setHasMore(false);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setHasMore(false);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage, keyword]);

  useEffect(() => {
    const handleScroll = () => {
      if (!loading && hasMore) {
        const scrollPosition =
          window.innerHeight + document.documentElement.scrollTop;
        const pageHeight = document.documentElement.offsetHeight;
        const remainingScroll = pageHeight - scrollPosition;

        if (remainingScroll <= 5 * window.innerHeight) {
          setCurrentPage((prevPage) => prevPage + 1);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, hasMore]);

  return (
    <WholeContainer>
      <BigContainer>
        {items.length > 0 &&
          items.map((item, index) => (
            <LongCover
              key={index}
              data={{
                pic: item.cover_image,
                title: item.subject,
                uploader: item.member_name,
                view: item.views,
                options: {
                  genres: item.genres,
                  instruments: item.instruments,
                  style_name: item.style_name,
                  language: item.language,
                  vocal: item.vocal,
                  tempo: item.tempo,
                },
                isOwner: item.is_owner,
              }}
            />
          ))}
        {loading && <LoadingMessage />}
        {!loading && items.length === 0 && (
          <NoResultsMessage>검색결과가 없습니다.</NoResultsMessage>
        )}
      </BigContainer>
    </WholeContainer>
  );
};

export default Search;
