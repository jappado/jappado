import React, { useState, useEffect } from 'react';
import { getCompanyInfo } from '../../../utils/api'; // API 함수 import
import InfoList from './InfoList'; // InfoList 컴포넌트 import
import styled from 'styled-components';

const CompanyInfo = () => {
  const [companies, setCompanies] = useState(); // 전체 회사 정보를 저장
  const [error, setError] = useState(''); // 에러 상태

  useEffect(() => {
    const fetchCompanyInfo = async () => {
      try {
        const response = await getCompanyInfo();
        setCompanies(response || []); // 응답 데이터가 없을 경우 빈 배열로 설정
      } catch (err) {
        console.error('전체 회사 정보를 가져오는 데 실패했습니다.', err);
        setError('회사를 찾을 수 없습니다.');
      }
    };

    fetchCompanyInfo(); // 컴포넌트가 마운트될 때 API 호출
  }, []); // 컴포넌트가 처음 렌더링될 때만 실행

  if (error) {
    return <Container>{error}</Container>;
  }

  if (companies === undefined) {
    return <Container>로딩 중...</Container>;
  }

  if (companies.length === 0) {
    return <Container>기업 정보가 없습니다.</Container>;
  }

  return <InfoList data={companies} type="company" />;
};

export default CompanyInfo;

const Container = styled.div`
  padding: 40px;
`;