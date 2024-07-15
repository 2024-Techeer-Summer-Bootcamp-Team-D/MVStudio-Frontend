import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import LongCover from '../components/LongCover';
import { useLocation } from 'react-router-dom';
import { getsearch } from '../api/search';

const BigContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 9.4rem;
`;

const WholeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-left: 18rem;
`;

const SearchResult = styled.p`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 0.1rem;
  margin-right: 48rem;
  color: #ffffff;
`;

const SearchTerm = styled.p`
  font-size: 1.5rem;
  color: #ffffff;
  margin-left: 9.5rem;
  font-family: 'SUIT', sans-serif;
  margin-right: auto;
`;

const LoadingMessage = styled.img.attrs({
  src: 'https://i.ibb.co/jvXptkm/loading.gif',
})`
  width: 2rem;
  height: 1rem;
  margin-bottom: 1rem;
`;

const Search = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const keyword = searchParams.get('keyword');
  const [currentPage, setCurrentPage] = useState(1);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await getsearch(currentPage, 3, keyword); // 페이지당 3개씩 가져오도록 설정
        if (result) {
          setItems((prevItems) => [...prevItems, ...result.music_videos]);
          setHasMore(result.pagination.next_page);
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
      const scrollPosition =
        window.innerHeight + document.documentElement.scrollTop;
      const pageHeight = document.documentElement.offsetHeight;
      const remainingScroll = pageHeight - scrollPosition;

      if (remainingScroll <= 5 * window.innerHeight && !loading && hasMore) {
        setCurrentPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, hasMore]);

  return (
    <WholeContainer>
      <SearchResult>Search result</SearchResult>
      <SearchTerm>{`'${keyword}' Search result`}</SearchTerm>
      <BigContainer>
        {items.map((item, index) => (
          <LongCover
            key={index}
            pic={item.cover_image}
            title={item.subject}
            uploader={item.member_name}
            view={item.views}
            options={{
              genres: item.genres,
              instruments: item.instruments,
              language: item.language,
              vocal: item.vocal,
              tempo: item.tempo,
            }}
          />
        ))}
        {loading && <LoadingMessage />}
      </BigContainer>
    </WholeContainer>
  );
};

export default Search;
