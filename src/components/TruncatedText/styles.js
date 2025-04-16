import styled from 'styled-components';

export const TextContainer = styled.div`
  position: relative;
  width: 100%;
`;

export const TruncatedContent = styled.div`
  position: relative;
  word-break: break-word;
  hyphens: auto;
`;

export const ReadMoreButton = styled.button`
  background: none;
  border: none;
  color: #2196F3;
  padding: 0 4px;
  margin-left: 4px;
  font-size: 0.85em;
  cursor: pointer;
  display: inline-block;
  
  &:hover {
    text-decoration: underline;
  }
`;

export const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1000;
`;

export const FullTextModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #222246;
  border-radius: 8px;
  padding: 20px;
  max-width: 90%;
  width: 600px;
  max-height: 80vh;
  overflow-y: auto;
  z-index: 1001;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.4);
  
  @media (max-width: 768px) {
    width: 95%;
    padding: 15px;
  }
`;

export const ModalContent = styled.div`
  color: #fff;
  font-size: 16px;
  line-height: 1.6;
  white-space: pre-wrap;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 24px;
  color: #ccc;
  cursor: pointer;
  z-index: 2;
  
  &:hover {
    color: #fff;
  }
`;