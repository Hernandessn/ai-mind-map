import styled from "styled-components";

export const PreviewsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
  margin-top: 30px;
  width: 100%;
`;

export const PreviewBox = styled.div`
  background: #f8f9fa;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
  
  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const PreviewTitle = styled.h3`
  margin-top: 0;
  margin-bottom: 15px;
  color: #333;
  font-size: 18px;
  
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

export const PreviewImage = styled.img`
  max-width: 400px;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 768px) {
    max-width: 100%;
  }
`;