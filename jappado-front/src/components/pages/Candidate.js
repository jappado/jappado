import Nav from "../common/Nav";
import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // 📌 useParams 추가
import { getCandidateById } from "../../utils/api";
import Details from "../common/Details";

const Candidate = () => {
  const { id } = useParams(); // 📌 URL에서 id 가져오기
  const [candidate, setCandidate] = useState(null); // 초기값을 null로 설정
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCandidateDetail = async () => {
      if (!id) return; // id가 없으면 API 호출 안 함

      try {
        const response = await getCandidateById(id); // 📌 id를 API에 전달
        setCandidate(response);
      } catch (err) {
        console.error("구직자 정보를 가져오는 데 실패했습니다.", err);
        setError("정보를 찾을 수 없습니다.");
      }
    };

    fetchCandidateDetail();
  }, [id]); // 📌 id가 변경될 때마다 호출

  return (
    <Container>
      <Nav />
      {error ? (
        <DetailsWrapper>{error}</DetailsWrapper>
      ) : candidate === null ? ( // 📌 초기값을 null로 설정했으므로 비교 연산자 변경
        <DetailsWrapper>로딩 중...</DetailsWrapper>
      ) : (
        <DetailsWrapper>
          <Details data={candidate} type="candidate" />
        </DetailsWrapper>
      )}
    </Container>
  );
};

export default Candidate;

const Container = styled.div`
`;
const DetailsWrapper = styled.div`
width: 100%;
height: calc(100vh - 60px);
display: flex;
justify-content: center;
align-items: center;
`;
