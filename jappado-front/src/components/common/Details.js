// src/components/common/Details.js
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getItem } from '../../utils/localStorage';
import Modal from './Modal'; // Import Modal component
import { createOffer } from '../../utils/api';
import { useParams } from "react-router-dom";

const Details = ({ data, type }) => {
  const { id } = useParams();
  const companyId = getItem('userId');
  const [role, setRole] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal visibility state
  const [jobTitle, setJobTitle] = useState(''); // State for job title
  const [jobDescription, setJobDescription] = useState(''); // State for job description
  const [proposedSalary, setProposedSalary] = useState(''); // State for proposed salary

  useEffect(() => {
    const storedRole = getItem('Role'); // 'role'을 로컬스토리지에서 가져옴
    setRole(storedRole || '');
  }, []);

  const openModal = () => {
    setIsModalOpen(true); // Open the modal
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Construct the payload with the required fields
    const payload = {
      candidateId: id, // candidateId from URL params
      companyId: companyId, // companyId from localStorage
      jobTitle: jobTitle, // job title from state
      jobDescription: jobDescription, // job description from state
      proposedSalary: proposedSalary, // proposed salary from state
    };
  
    try {
      // Call the API to create the offer with the payload
      const response = await createOffer(payload);
      console.log(response);
      alert("제안에 성공했어요.");
      closeModal(); // Close the modal after successful submission
    } catch (error) {
      alert("등록에 실패했어요. 다시 시도해주세요.");
    }
  };
  

  if (!data) {
    return <Message>데이터가 없습니다.</Message>;
  }

  return (
    <>
      <Item>
        {type === 'candidate' ? (
          <>
            <CandiImg src={`data:image/jpeg;base64,${data.profilePicture}`} alt="Profile" />
            <Info>
              <h2>{data.fullName}</h2>
              <p>Email: {data.email}</p>
              <p>Experience: {data.experience}</p>
              <p>Phone: {data.phoneNumber}</p>
              <p>Skills: {data.skills}</p>
            </Info>
          </>
        ) : (
          <>
            <CompanyImg src={`data:image/jpeg;base64,${data.profilePicture}`} alt="Company" />
            <Info>
              <h2>{data.companyName}</h2>
              <p>Email: {data.email}</p>
            </Info>
          </>
        )}
        {role === 'CANDIDATE' ? (
          <></>
        ) : (
          <SuggestButton onClick={openModal}>제안하기</SuggestButton> // Open modal on button click
        )}
      </Item>

      <Modal isOpen={isModalOpen} closeModal={closeModal}>
        <Header>제안하기</Header>
        <form onSubmit={handleSubmit}>
          <InputField
            type="text"
            placeholder="직무"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            required
          />
          <TextareaField
            placeholder="하게 될 일"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            required
          />
          <InputField
            type="text"
            placeholder="제안 연봉"
            value={proposedSalary}
            onChange={(e) => setProposedSalary(e.target.value)}
            required
          />
          <SubmitButton type="submit">제안 제출</SubmitButton>
        </form>
      </Modal>
    </>
  );
};

export default Details;

const Message = styled.p`
  text-align: center;
  font-size: 18px;
  color: #888;
`;
const Header = styled.h2`
  padding-bottom: 20px;
`;
const Item = styled.div`
  width: 400px;
  height: 600px;
  padding: 50px;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: translateY(-5px);
  }
`;

const CandiImg = styled.img`
  width: 240px;
  height: 240px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #ddd;
  flex-shrink: 0;
`;

const CompanyImg = styled(CandiImg)``;

const Info = styled.div`
  padding-bottom: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  text-align: center;

  h2 {
    font-size: 22px;
    margin-bottom: 10px;
  }

  p {
    font-size: 16px;
    color: #555;
  }
`;

const SuggestButton = styled.button`
  padding: 12px 24px;
  background-color: #007bff;
  color: #fff;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #0056b3;
  }

  &:focus {
    outline: none;
  }
`;

const InputField = styled.input`
  width: 100%;
  padding: 12px;
  margin: 10px 0;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 16px;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const TextareaField = styled.textarea`
  width: 100%;
  padding: 12px;
  margin: 10px 0;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 16px;
  height: 120px;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const SubmitButton = styled.button`
  padding: 12px 24px;
  margin-top: 20px;
  background-color: #007bff;
  color: #fff;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #0056b3;
  }

  &:focus {
    outline: none;
  }
`;
