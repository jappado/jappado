import React from 'react';
import styled from 'styled-components';
import CloseIcon from '../../assets/CloseIcon.png';

const Modal = ({ isOpen, closeModal, children }) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <ModalOverlay onClick={handleOverlayClick}>
      <ModalContent>
        {children}
        <CloseButton onClick={closeModal}>
          <CloseIconWrapper src={CloseIcon} alt="닫기 아이콘" />
        </CloseButton>
      </ModalContent>
    </ModalOverlay>
  );
};

export default Modal;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalContent = styled.div`
  background: #fff;
  padding: 30px;
  border-radius: 8px;
  width: 400px;
  text-align: center;
  position: relative; /* 버튼을 모달 내부 우측 상단에 배치하기 위해 필요 */
`;

const CloseButton = styled.button`
  position: absolute;
  top: 33px;
  right: 30px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;

  &:focus {
    outline: none;
  }
`;

const CloseIconWrapper = styled.img`
  width: 24px;
  height: 24px;
`;
