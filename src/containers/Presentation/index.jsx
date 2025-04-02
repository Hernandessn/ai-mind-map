import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Container, 
  RobotIcon, 
  Image,
  Title, 
  Subtitle
} from './styles';
import RobotImg from '../../assets/robot.png'; // Assuming the path to your image
import { DefaultButton } from '../../components/Button';
import { theme } from '../../styles/theme';

export const Presentation = () => {
  
  return (
    <Container>
      <RobotIcon>
        <Image src={RobotImg} alt="Robot Icon" />
      </RobotIcon>
      <Title>Soluções inteligentes em IA</Title>
      <Subtitle>Transforme suas ideias em mapas mentais com IA, de forma simples e rápida!</Subtitle>
      <Link to="/home" >
      <DefaultButton $gradient $colorStart={theme.colors.neonBlue} $colorEnd={theme.colors.neonPurple}>
        Começar
      </DefaultButton>
      </Link>
      
    </Container>
  );
};

