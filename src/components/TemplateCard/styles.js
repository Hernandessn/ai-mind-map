import styled from 'styled-components';
import { theme } from '../../styles/theme';
// Componentes estilizados com responsividade
export const Card = styled.div`
  background-color: rgba(0, 27, 41, 0.7);
  border: 2px solid rgba(0, 243, 255, 0.3);
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  width: 20%;
  padding: 10px;
  margin: 5px;
  
  &:hover, &.selected {
    transform: translateY(-10px);
    border-color: var(${theme.colors.neonBlue});
    box-shadow: 0 0 20px rgba(0, 243, 255, 0.6);
  }
  
  &.selected::after {
    content: '✓';
    position: absolute;
    top: 15px;
    right: 15px;
    width: 25px;
    height: 25px;
    background: linear-gradient(90deg, var(${theme.colors.neonBlue}), var(${theme.colors.neonPurple}));
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    color: white;
    font-size: 14px;
  }
  
  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

export const Image = styled.div`
  width: 100%;
  height: 180px;
  background-color: rgba(0, 13, 20, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  
  img {
    width: 80%;
  }
  
  ${Card}:hover & img {
    transform: scale(1.05);
  }
  
  @media (max-width: 768px) {
    height: 160px;
  }
  
  @media (max-width: 480px) {
    height: 140px;
  }
`;

export const Info = styled.div`
  padding: 20px;
  
  @media (max-width: 480px) {
    padding: 15px;
  }
`;

export const Name = styled.h3`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 10px;
  color: white;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 40px;
    height: 2px;
    background: linear-gradient(90deg, var(${theme.colors.neonBlue}), var(${theme.colors.neonPurple}));
    transition: width 0.3s ease;
  }
  
  ${Card}:hover & ::after {
    width: 60px;
  }
  
  @media (max-width: 480px) {
    font-size: 16px;
  }
`;

export const Desc = styled.p`
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.5;
  
  @media (max-width: 480px) {
    font-size: 13px;
  }
`;
