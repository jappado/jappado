import Nav from "../common/Nav";
import styled from "styled-components";
import { getOffersByCandidateId, respondToOffer } from "../../utils/api";
import { useState, useEffect } from "react";
import { getItem } from '../../utils/localStorage';

const Offer = () => {
  const [offers, setOffers] = useState([]); // 전체 구직자 정보를 저장
  const [error, setError] = useState(''); // 에러 상태
  const [openOfferId, setOpenOfferId] = useState(null); // 열려 있는 제안의 ID 추적
  const userId = getItem('userId'); // userId가 localStorage에서 잘 가져와졌는지 확인

  useEffect(() => {
    const fetchOffersInfo = async (userId) => {
      try {
        const response = await getOffersByCandidateId(userId);
        setOffers(response || []); // 응답 데이터가 없을 경우 빈 배열로 설정
      } catch (err) {
        console.error('제안 목록을 가져오는 데 실패했습니다.', err);
        setError('제안 목록을 가져오는 데 실패했습니다.');
      }
    };

    if (userId) { // userId가 있을 때만 API 호출
      fetchOffersInfo(userId);
    } else {
      setError('유효한 사용자 ID가 없습니다.');
    }
  }, [userId]); // userId가 변경될 때마다 fetchOffersInfo 호출

  const handleOfferClick = (id) => {
    // 이미 열려 있는 제안 항목을 클릭하면 닫기, 아니면 새 항목 열기
    setOpenOfferId(openOfferId === id ? null : id);
  };

  const respondToOfferHandler = async (offerId, responseType) => {
    try {
      await respondToOffer(offerId, responseType); // 수락 또는 거절을 처리하는 API 호출
      setOffers((prevOffers) =>
        prevOffers.map((offer) =>
          offer.id === offerId ? { ...offer, status: responseType } : offer
        )
      ); // 제안 리스트에서 해당 제안의 상태를 업데이트
    } catch (err) {
      console.error('제안 응답 실패', err);
      alert('제안 응답 실패');
    }
  };

  return (
    <OfferContainer>
      <Nav />
      <OfferWrapper>
        {/* 에러 메시지 출력 */}
        {error && <ErrorMessage>{error}</ErrorMessage>}
        {/* Offers rendering */}
        {offers && offers.length > 0 ? (
          <OfferList>
            {offers.map((offer) => {
              // status 값이 JSON이 아닐 수 있으므로 바로 비교
              const responseType = offer.status || 'pending'; // 'pending' 상태 처리

              return (
                <OfferItem key={offer.id} onClick={() => handleOfferClick(offer.id)}>
                  <div>
                    <h3>호메르스</h3>
                    <p>직무 : {offer.jobTitle}</p>
                    {/* 상태 표시 */}
                    <p>상태: {responseType === 'pending' ? '대기중' : responseType === 'accepted' ? '수락' : '거절'}</p>
                  </div>

                  {/* 클릭된 제안만 내용 표시 */}
                  {openOfferId === offer.id && (
                    <>
                      <p>제안 내용: {offer.jobDescription}</p>
                      <p>제안 연봉: {offer.proposedSalary}</p>
                      <ButtonWrapper>
                        {/* 수락 버튼: 대기중일 때만 수락 가능 */}
                        {responseType === 'pending' && (
                          <AcceptButton onClick={() => respondToOfferHandler(offer.id, 'accepted')}>
                            수락
                          </AcceptButton>
                        )}
                        {/* 거절 버튼: 대기중일 때만 거절 가능 */}
                        {responseType === 'pending' && (
                          <RejectButton onClick={() => respondToOfferHandler(offer.id, 'rejected')}>
                            거절
                          </RejectButton>
                        )}
                        {/* 이미 수락/거절된 상태에서 버튼 비활성화 */}
                        {responseType !== 'pending' && (
                          <StatusMessage>{responseType === 'accepted' ? '수락된 제안' : '거절된 제안'}</StatusMessage>
                        )}
                      </ButtonWrapper>
                    </>
                  )}
                </OfferItem>
              );
            })}
          </OfferList>
        ) : (
          <NoOffersMessage>받은 제안이 없습니다.</NoOffersMessage>
        )}
      </OfferWrapper>
    </OfferContainer>
  );
};

export default Offer;

const OfferContainer = styled.div``;

const OfferWrapper = styled.div`
  margin-top: 50px;
  padding: 40px;
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 16px;
  margin-bottom: 20px;
`;

const OfferList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const OfferItem = styled.div`
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  background: #fff;

  h3 {
    margin: 0 0 10px;
  }

  p {
    margin: 5px 0;
  }

  cursor: pointer;
`;

const ButtonWrapper = styled.div`
  margin-top: 15px;
  display: flex;
  gap: 10px;
`;

const AcceptButton = styled.button`
  border: none;
  padding: 10px 15px;
  cursor: pointer;
  border-radius: 5px;
  background-color: green;
  color: white;

  &:hover {
    font-weight: bold;
  }
`;

const RejectButton = styled.button`
  border: none;
  padding: 10px 15px;
  cursor: pointer;
  border-radius: 5px;
  background-color: red;
  color: white;

  &:hover {
    font-weight: bold;
  }
`;

const StatusMessage = styled.div`
  font-size: 16px;
  color: #666;
  text-align: center;
`;

const NoOffersMessage = styled.div`
  font-size: 18px;
  color: #666;
  text-align: center;
`;
