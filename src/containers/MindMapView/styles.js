import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding: 20px;
  background-color: #0a0a1e;
  color: #ffffff;
  position: relative;
`;

export const Header = styled.header`
  margin-bottom: 20px;
  text-align: center;
`;

export const Title = styled.h1`
  font-size: 2.5rem;
  margin: 10px 0;
  background: linear-gradient(90deg, #4ecdc4, #556270);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
  
  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

export const MapContainer = styled.div`
  flex: 1;
  min-height: 70vh;
  border-radius: 10px;
  margin-bottom: 20px;
  padding: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background-color: rgba(0, 0, 0, 0.2);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  position: relative;
  overflow: hidden;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
  flex-wrap: wrap;
  justify-content: center;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
  }
`;

export const NoDataMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
  font-size: 1.2rem;
  text-align: center;
  color: #aaa;
  padding: 20px;
`;

export const LoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(10, 10, 30, 0.9);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  
  .spinner {
    width: 60px;
    height: 60px;
    border: 6px solid rgba(76, 205, 196, 0.2);
    border-radius: 50%;
    border-top-color: #4ecdc4;
    animation: ${spin} 1.5s linear infinite;
    margin-bottom: 20px;
  }
  
  .progress {
    font-size: 1.2rem;
    font-weight: bold;
    color: #fff;
    background: linear-gradient(90deg, #4ecdc4, #556270);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
  }
`;

export const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
`;

export const LoadingSpinner = styled.div`
  width: 50px;
  height: 50px;
  border: 5px solid #f3f3f3;
  border-top: 5px solid #3498db;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;