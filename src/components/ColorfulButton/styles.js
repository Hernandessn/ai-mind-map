import styled from "styled-components";
import { theme } from '../../styles/theme';

export const Button = styled.button`
  padding: 12px 30px;
  font-size: 16px;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  background: linear-gradient(90deg, #00f3ff, #8a2be2); /* Cores definidas diretamente: ciano e roxo */
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
  `;