import styled from 'styled-components';

// Futuristic Container with Animated Background
export const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: rgb(0,0,0);
  background: linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(1,1,48,1) 100%, rgba(0,21,25,1) 100%);
`;


// Futuristic Robot Icon
export const RobotIcon = styled.div`
  position: relative;
  width: 250px;
  height: 250px;
  background: rgba(255,255,255,0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
  box-shadow: 
    0 0 20px rgba(0, 255, 255, 0.3),
    inset 0 0 15px rgba(0,255,255,0.2);
  border: 2px solid rgba(0,255,255,0.2);
  backdrop-filter: blur(10px);

  @media (max-width: 600px) {
    width: 200px;
    height: 200px;
  }
`;


// Styled Robot Face
export const Image = styled.img`
  width: 90%;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 3rem;
  position: relative;
  z-index: 10;
`;

// Title Styling
export const Title = styled.h1`
  color: white;
  font-size: 2rem;
  margin-bottom: 15px;
  text-shadow: 0 0 10px rgba(0,255,255,0.5);

  @media (max-width: 600px) {
    font-size: 1.5rem;
  }
`;

// Subtitle Styling
export const Subtitle = styled.p`
  color: rgba(255,255,255,0.7);
  font-size: 1rem;
  margin-bottom: 30px;
  max-width: 400px;
  text-align: center;

  @media (max-width: 600px) {
    font-size: 0.9rem;
    max-width: 300px;
  }
`;

