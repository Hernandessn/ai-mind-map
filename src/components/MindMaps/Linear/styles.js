import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  padding: 40px 20px;
  max-width: 600px;
  margin: 0 auto;
`;

export const VerticalLine = styled.div`
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 4px;
  background-color: #c4c4c4;
  transform: translateX(-50%);
`;

export const Step = styled.div`
  background-color: #e9f0ff;
  border-radius: 16px;
  padding: 20px;
  margin: 20px 0;
  position: relative;
  text-align: center;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.05);

  &::after {
    content: '';
    position: absolute;
    bottom: -24px;
    left: 50%;
    transform: translateX(-50%);
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-top: 16px solid #c4c4c4;
  }

  &:last-child::after {
    display: none;
  }
`;

export const StepTitle = styled.h3`
  font-family: 'Poppins', sans-serif;
  font-size: 1.4rem;
  color: #2d2d2d;
  margin-bottom: 8px;
`;

export const StepDescription = styled.p`
  font-family: 'Roboto', sans-serif;
  font-size: 1rem;
  color: #5c5c5c;
`;
