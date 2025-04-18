import React, { useState } from 'react';
import {
  TextContainer,
  TruncatedContent,
  FullTextModal,
  ModalContent,
  CloseButton,
  ModalBackdrop,
  ReadMoreButton
} from './styles';

const TruncatedText = ({ text, maxLength = 80, className }) => {
  const [showModal, setShowModal] = useState(false);
  
  if (!text) return null;
  
  const shouldTruncate = text.length > maxLength;
  const displayText = shouldTruncate ? `${text.substring(0, maxLength)}...` : text;
  
  const handleOpenModal = () => {
    setShowModal(true);
    // Prevent scrolling when modal is open
    document.body.style.overflow = 'hidden';
  };
  
  const handleCloseModal = () => {
    setShowModal(false);
    // Re-enable scrolling
    document.body.style.overflow = 'auto';
  };
  
  return (
    <TextContainer className={className}>
      <TruncatedContent>
        {displayText}
        {shouldTruncate && (
          <ReadMoreButton onClick={handleOpenModal}>
            Mais
          </ReadMoreButton>
        )}
      </TruncatedContent>
      
      {showModal && (
        <>
          <ModalBackdrop onClick={handleCloseModal} />
          <FullTextModal>
            <CloseButton onClick={handleCloseModal}>&times;</CloseButton>
            <ModalContent>{text}</ModalContent>
          </FullTextModal>
        </>
      )}
    </TextContainer>
  );
};

export default TruncatedText;
