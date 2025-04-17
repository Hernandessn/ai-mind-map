import styled, { keyframes } from "styled-components";
import { theme } from '../../styles/theme';

export const Button = styled.button`
  padding: 12px 30px;
  font-size: 16px;
  font-weight: 600;
  border: 2px solid ${(props) => props.$borderColor === true ? "rgba(0, 243, 255, 0.3)" : 'none'};
  border-radius: ${(props) => (props.$rounded ? "30px" : "8px")};
  background: ${(props) =>
    props.$gradient
      ? `linear-gradient(90deg, ${props.$colorStart || theme.colors.neonBlue}, ${props.$colorEnd || theme.colors.neonPurple})`
      : props.$color || theme.colors.neonBlue};
  color: ${(props) => props.$textColor || "white"};
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  white-space: nowrap;

  &:hover {
    transform: translateY(-3px);
    border-color: ${(props)=> props.$borderColor === true ? theme.colors.neonBlue : '0px'};
    box-shadow: 0 0 20px rgba(0, 243, 255, 0.8);
  }
`;
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const LoadingSpinner = styled.div`
  width: 18px;
  height: 18px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top: 2px solid #ffffff;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;