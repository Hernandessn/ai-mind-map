import styled from "styled-components";
import { theme } from '../../styles/theme';

export const Header = styled.header`
  padding: 20px 0;
  border-bottom: 1px solid rgba(0, 243, 255, 0.2);
`;

export const ContainerText = styled.div`
   max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
    width: 100%;
`;

export const Title = styled.h1`
    font-size: 32px;
    font-weight: 700;
    background: linear-gradient(90deg, var(${theme.colors.neonBlue}), var(${theme.colors.neonPurple}));
    -webkit-background-clip: text;
    background-clip: text;
   color:  rgba(0, 243, 255, 0.5);
    text-shadow: 0 0 10px rgba(0, 243, 255, 0.5);
    text-align: center;
    margin-bottom: 10px;
`;

export const SubTitle = styled.h2`
  font-size: 16px;
  text-align: center;
  color: rgba(255, 255, 255, 0.7);
`;

export const Main = styled.main``;

export const InputSection = styled.section`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40px 0;
`;

export const ContainerComponent = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between; /* Espaço entre os elementos */
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
`;

export const InputContainer = styled.div`
    flex: 1;  /* O input ocupa o máximo de espaço possível */
    margin-right: 20px;
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

  `;

export const ButtonContainer = styled.div`
    display: flex;
    flex-direction: row; /* Alinha os botões na horizontal */
    justify-content: center;
    align-items: center;
    gap: 20px;
    width: auto;
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
`;


export const GenerateButton = styled.button`
   padding: 12px 30px;
    font-size: 16px;
    font-weight: 600;
    border: none;
    border-radius: 8px;
    background: linear-gradient(90deg, var(${theme.colors.neonBlue}), var(${theme.colors.neonPurple}));

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
`;