import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  padding: 40px 20px;
  max-width: 600px;
  margin: 0 auto;
  min-height: 70vh;
  
  @media (max-width: 768px) {
    padding: 20px 10px;
  }
`;

export const VerticalLine = styled.div`
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 4px;
  background-color: #999;
  transform: translateX(-50%);
  
  @media (max-width: 768px) {
    left: 30px;
  }
`;

export const Step = styled.div`
  background-color: #2a2a42;
  border-radius: 16px;
  padding: 20px;
  margin: 40px 0;
  position: relative;
  text-align: center;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.4);
  }

  &::before {
    content: '';
    position: absolute;
    left: 50%;
    top: -20px;
    width: 16px;
    height: 16px;
    background-color: #716ACA;
    border: 3px solid #999;
    border-radius: 50%;
    transform: translateX(-50%);
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -24px;
    left: 50%;
    transform: translateX(-50%);
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-top: 16px solid #999;
    
    @media (max-width: 768px) {
      left: 30px;
    }
  }

  &:last-child::after {
    display: none;
  }
  
  @media (max-width: 768px) {
    margin-left: 50px;
    text-align: left;
    
    &::before {
      left: -30px;
    }
  }
`;

export const StepTitle = styled.h3`
  font-family: 'Poppins', sans-serif;
  font-size: 1.4rem;
  color: #fff;
  margin-bottom: 8px;
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

export const StepDescription = styled.div`
  font-family: 'Roboto', sans-serif;
  font-size: 1rem;
  color: #ccc;
  line-height: 1.6;
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

export const ZoomControls = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  gap: 5px;
  z-index: 100;
`;

export const ZoomButton = styled.button`
  width: 36px;
  height: 36px;
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }
`;