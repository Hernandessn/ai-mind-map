import styled from "styled-components";
import { theme } from '../../styles/theme';

export const Header = styled.header`
  padding: 20px 0;
  border-bottom: 1px solid rgba(0, 243, 255, 0.2);
  width: 100%;
`;

export const ContainerText = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  width: 100%;
  
  @media (max-width: 768px) {
    padding: 0 15px;
  }
`;

export const Title = styled.h1`
  font-size: 32px;
  font-weight: 700;
  background: linear-gradient(90deg, var(${theme.colors.neonBlue}), var(${theme.colors.neonPurple}));
  -webkit-background-clip: text;
  background-clip: text;
  color: rgba(0, 243, 255, 0.5);
  text-shadow: 0 0 10px rgba(0, 243, 255, 0.5);
  text-align: center;
  margin-bottom: 10px;
  
  @media (max-width: 768px) {
    font-size: 28px;
  }
  
  @media (max-width: 480px) {
    font-size: 24px;
  }
`;

export const SubTitle = styled.h2`
  font-size: 16px;
  text-align: center;
  color: rgba(255, 255, 255, 0.7);
  
  @media (max-width: 480px) {
    font-size: 14px;
  }
`;

export const Main = styled.main`
  width: 100%;
`;

export const InputSection = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 0;
  width: 100%;
  
  @media (max-width: 768px) {
    padding: 30px 0;
  }
  
  @media (max-width: 480px) {
    padding: 20px 0;
  }
`;

export const ContainerComponent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
    padding: 0 15px;
  }
`;

export const InputContainer = styled.div`
  flex: 1;
  margin-right: 20px;
  
  @media (max-width: 768px) {
    width: 100%;
    margin-right: 0;
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 15px 20px;
  border-radius: 8px;
  background-color: rgba(0, 27, 41, 0.7);
  border: 2px solid rgba(0, 243, 255, 0.3);
  color: white;
  font-size: 16px;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: var(${theme.colors.neonBlue});
    box-shadow: 0 0 15px rgba(0, 243, 255, 0.5);
  }
  
  @media (max-width: 480px) {
    padding: 12px 15px;
    font-size: 14px;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 20px;
  width: auto;
  
  @media (max-width: 768px) {
    width: 100%;
  }
  
  @media (max-width: 480px) {
    flex-direction: column;
    gap: 15px;
  }
`;

export const SendImageButton = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  background-color: rgba(0, 27, 41, 0.7);
  border: 2px solid rgba(0, 243, 255, 0.3);
  color: white;
  padding: 12px 20px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
  
  &:hover {
    border-color: var(${theme.colors.neonBlue});
    box-shadow: 0 0 15px rgba(0, 243, 255, 0.5);
  }
  
  @media (max-width: 768px) {
    flex: 1;
    justify-content: center;
  }
  
  @media (max-width: 480px) {
    width: 100%;
    padding: 10px 15px;
    font-size: 14px;
  }
`;

export const GenerateButton = styled.button`
  padding: 12px 30px;
  font-size: 16px;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  background: linear-gradient(90deg, var(${theme.colors.neonBlue}), var(${theme.colors.neonPurple}));
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  white-space: nowrap;
  
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, transparent 70%);
    transform: scale(0);
    opacity: 0;
    transition: transform 0.6s, opacity 0.6s;
  }
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 0 20px rgba(0, 243, 255, 0.8);
  }
  
  &:hover::before {
    transform: scale(1);
    opacity: 1;
  }
  
  @media (max-width: 768px) {
    flex: 1;
  }
  
  @media (max-width: 480px) {
    width: 100%;
    padding: 10px 20px;
    font-size: 14px;
  }
`;

export const SectionCards = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex-wrap: wrap;
  
  @media (max-width: 768px) {
    padding: 0 15px;
  }
`;