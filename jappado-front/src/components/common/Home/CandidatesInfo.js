import React, { useState, useEffect } from 'react';
import { getCandidates } from '../../../utils/api'; // API 함수 import
import InfoList from './InfoList'; // InfoList 컴포넌트 import
import styled from 'styled-components';

const CandidatesInfo = () => {
  const [candidates, setCandidates] = useState(); // 전체 구직자 정보를 저장
  const [error, setError] = useState(''); // 에러 상태

  useEffect(() => {
    const fetchCandidatesInfo = async () => {
      try {
        const response = await getCandidates();
        setCandidates(response || []); // 응답 데이터가 없을 경우 빈 배열로 설정
      } catch (err) {
        console.error('전체 구직자 정보를 가져오는 데 실패했습니다.', err);
        setError('정보를 찾을 수 없습니다.');
      }
    };

    fetchCandidatesInfo(); // 컴포넌트가 마운트될 때 API 호출
  }, []); // 컴포넌트가 처음 렌더링될 때만 실행

  if (error) {
    return <Container>{error}</Container>;
  }

  if (candidates === undefined) {
    return <Container>로딩 중...</Container>;
  }

  if (candidates.length === 0) {
    return <Container>구직자 정보가 없습니다.</Container>;
  }

  return <InfoList data={candidates} type="candidate" />;
};

export default CandidatesInfo;

const Container = styled.div`
  padding: 40px;
`;
