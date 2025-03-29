import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Container, 
  RobotIcon, 
  Image,
  Title, 
  Subtitle, 
  GetStartedButton 
} from './styles';
import RobotImg from '../../assets/robot.png'; // Assuming the path to your image

export const Apresentation = () => {
  
  return (
    <Container>
      <RobotIcon>
        <Image src={RobotImg} alt="Robot Icon" />
      </RobotIcon>
      <Title>Soluções inteligentes em IA</Title>
      <Subtitle>Transforme suas ideias em mapas mentais com IA, de forma simples e rápida!</Subtitle>
      <Link to="/home" >
      <GetStartedButton>Começar</GetStartedButton>
      </Link>
      
    </Container>
  );
};

