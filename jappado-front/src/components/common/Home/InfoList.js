import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { getItem } from '../../../utils/localStorage';

const InfoList = ({ data, type }) => {
  const navigate = useNavigate();
  const role = getItem('Role');  // Role을 가져옴

  const handleClick = (id) => {
    if (type === 'company') {
      navigate(`/company/${id}`);
    } else {
      navigate(`/candidate/${id}`);
    }
  };

  return (
    <ItemsWrapper>
      {data.map((item) => (
        <Item
          key={item.id}
          onClick={(!role || role !== 'COMPANY' && type !== 'company') ? undefined : () => handleClick(item.id)} // If role is null or not 'COMPANY' and type isn't 'company', prevent click
          hoverable={(role === 'COMPANY')}
        >
          {type === 'company' ? (
            <>
              {item.image && (
                <CompanyImg src={`data:image/png;base64,${item.image}`} alt="기업 사진" />
              )}
              <Contents>
                <h3>{item.name}</h3>
                <p>주소: {item.address}</p>
                <p>카테고리: {item.category}</p>
                <p>설명: {item.text}</p>
              </Contents>
              
            </>
          ) : (
            <>
              {role !== 'COMPANY' ? (
                <GrayImage alt="프로필 사진" />
              ) : (
                <CandiImg src={`data:image/png;base64,${item.profilePicture}`} alt="프로필 사진" />
              )}
              <Contents>
                <h3>
                  {role !== 'COMPANY' ? `${item.fullName[0]}**` : item.fullName}
                </h3>
                {role === 'COMPANY' && (
                  <>
                    <p>이메일: {item.email}</p>
                    <p>휴대폰 번호: {item.phoneNumber}</p>
                  </>
                )}
                <p>스킬: {item.skills}</p>
                <p>경력: {item.experience}</p>
              </Contents>
              
            </>
          )}
        </Item>
      ))}
    </ItemsWrapper>
  );
};

export default InfoList;

const ItemsWrapper = styled.div`
  padding: 40px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); 
  gap: 40px;
`;

const Item = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  cursor: ${(props) => (props.hoverable ? 'pointer' : 'default')}; /* Change cursor to pointer only if hoverable */
  transition: background 0.2s ease-in-out;
  background: ${(props) => (props.hoverable ? '#fff' : '#f5f5f5')}; /* Change background only if hoverable */

  &:hover {
    background: ${(props) => (props.hoverable ? '#f5f5f5' : '#f5f5f5')}; /* Keep background same when not hoverable */
  }
`;

const CompanyImg = styled.img`
  width: 200px;
`;

const GrayImage = styled.div`
  width: 200px;
  height: 266px;
  background-color: rgba(178, 164, 164, 0.86);
  border-radius: 20px;
  margin-bottom: 15px;
`;

const CandiImg = styled.img`
  width: 200px;
  margin-bottom: 15px;
`;

const Contents = styled.div`
  width: 200px;
`;
