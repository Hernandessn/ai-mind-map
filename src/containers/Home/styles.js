import styled, { keyframes } from 'styled-components';

// Animated Background Keyframes
const flowAnimation = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

const particleAnimation = keyframes`
  0% {
    transform: translateY(0) rotate(0deg);
    opacity: 0.7;
  }
  100% {
    transform: translateY(-100vh) rotate(720deg);
    opacity: 0;
  }
`;

// Futuristic Container with Animated Background
export const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  overflow: hidden;
  background: linear-gradient(
    -45deg, 
    #0f2027, 
    #203a43, 
    #2c5364, 
    #0f2027
  );
  background-size: 400% 400%;
  animation: ${flowAnimation} 15s ease infinite;
`;

// Particle Background
export const Particle = styled.div`
  position: absolute;
  background: rgba(255,255,255,0.1);
  border-radius: 50%;
  animation: ${particleAnimation} ${props => props.duration}s linear infinite;
  left: ${props => props.left}%;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
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
    0 0 20px rgba(0,255,255,0.3),
    inset 0 0 15px rgba(0,255,255,0.2);
  border: 2px solid rgba(0,255,255,0.2);
  backdrop-filter: blur(10px);

  @media (max-width: 600px) {
    width: 200px;
    height: 200px;
  }
`;

// Holographic Effect
export const HolographicOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    45deg, 
    rgba(0,255,255,0.1), 
    rgba(255,0,255,0.1)
  );
  mix-blend-mode: overlay;
  pointer-events: none;
`;

// Styled Robot Face
export const RobotFace = styled.div`
  width: 80%;
  height: 80%;
  background: rgba(0,119,190,0.8);
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

// Get Started Button
export const GetStartedButton = styled.button`
  background: linear-gradient(to right, #00b4db, #0083b0);
  color: white;
  border: none;
  padding: 12px 30px;
  border-radius: 30px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 0 15px rgba(0,180,219,0.5);

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 0 25px rgba(0,180,219,0.8);
  }

  @media (max-width: 600px) {
    padding: 10px 25px;
    font-size: 0.9rem;
  }
`;