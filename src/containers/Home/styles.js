import styled from "styled-components";
import { theme } from '../../styles/theme';
import { Link } from "react-router-dom";
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
export const LoadingIndicator = styled.div`
  display: inline-block;
  width: 16px;
  height: 16px;
  margin-right: 8px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s ease-in-out infinite;
  
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

export const ProcessingInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 12px;
  padding: 8px 12px;
  font-size: 14px;
  color: white;
  background: linear-gradient(45deg, rgba(74, 0, 224, 0.7), rgba(142, 45, 226, 0.7));
  border-radius: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(4px);
`;

export const DebugViewerContainer = styled.div`
  margin: 1rem 0;
  padding: 1rem;
  background: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 8px;
  max-height: 300px;
  overflow: auto;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
`;

export const DebugHeader = styled.h4`
  margin: 0 0 10px 0;
  font-size: 14px;
  color: #333;
  font-weight: 600;
`;

export const DebugContent = styled.pre`
  white-space: pre-wrap;
  font-size: 12px;
  font-family: monospace;
  color: #212529;
  margin: 0;
  line-height: 1.5;
  padding: 8px;
  background: rgba(0, 0, 0, 0.03);
  border-radius: 4px;
`;

export const DebugControlButton = styled.button`
  background: linear-gradient(45deg, #4a00e0, #8e2de2);
  color: white;
  border: none;
  border-radius: 20px;
  padding: 6px 12px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: 500;
  
  &:hover {
    opacity: 0.9;
    transform: translateY(-1px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
  }
  
  &:active {
    transform: translateY(1px);
  }
`;

export const TextStats = styled.div`
  margin: 1rem 0;
  padding: 10px 16px;
  background: linear-gradient(45deg, rgba(74, 0, 224, 0.1), rgba(142, 45, 226, 0.1));
  border-radius: 8px;
  border: 1px solid rgba(142, 45, 226, 0.2);
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  p {
    font-size: 14px;
    color: #ffff;
    margin: 0;
    font-weight: 500;
  }
`;

// Adicione estas definições de estilo ao seu arquivo styles.js

// MapResultContainer - Container para o mapa mental renderizado
export const MapResultContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 2rem auto;
  padding: 1.5rem;
  background: rgba(10, 10, 30, 0.7);
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.08);
  
  h2 {
    color: ${theme.colors.white};
    margin-bottom: 1.5rem;
    text-align: center;
    font-size: 1.8rem;
  }
`;

// ErrorMessage - Exibe mensagens de erro
export const ErrorMessage = styled.div`
  width: 100%;
  padding: 1rem;
  margin: 1rem 0;
  background-color: rgba(220, 53, 69, 0.1);
  border: 1px solid rgba(220, 53, 69, 0.5);
  color: #ff6b6b;
  border-radius: 8px;
  font-size: 0.9rem;
`;

export const ContainerAlert = styled.div`
  display: flex;
  align-items: center;
; justify-content: center;
`;
export const AlertBox = styled.div`
  padding: 1rem;
  background: linear-gradient(90deg, var(#00f3ff), var( #b700ff));
  border-left: 5px solid #fbc02d;
  color: #ffff;
  border-radius: 8px;
  margin-bottom: 1rem;
  font-size: 0.95rem;
  width: 60%;
`;
export const Contact = styled(Link)``
