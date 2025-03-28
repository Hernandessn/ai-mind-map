import React from 'react';
import { 
  Container, 
  Particle, 
  RobotIcon, 
  HolographicOverlay, 
  RobotFace, 
  Title, 
  Subtitle, 
  GetStartedButton 
} from './styles';

export const Home = () => {
  // Generate random particles
  const renderParticles = () => {
    const particles = [];
    for (let i = 0; i < 50; i++) {
      particles.push(
        <Particle 
          key={i}
          left={Math.random() * 100}
          size={Math.random() * 10 + 2}
          duration={Math.random() * 20 + 10}
        />
      );
    }
    return particles;
  };

  return (
    <Container>
      {renderParticles()}
      <RobotIcon>
        <HolographicOverlay />
        <RobotFace>🤖</RobotFace>
      </RobotIcon>
      <Title>Providing The Best AI Solutions</Title>
      <Subtitle>AI assistant can answer any of your questions. Just ask here!</Subtitle>
      <GetStartedButton>Get Started</GetStartedButton>
    </Container>
  );
};

