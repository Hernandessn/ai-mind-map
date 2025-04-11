import styled from "styled-components";

export const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const CombinedButton = styled.button`
  background: linear-gradient(45deg, #4a00e0, #8e2de2);
  color: white;
  border: 2px solid #2d1d6b;
  border-radius: 50px;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
    opacity: 0.9;
  }
  
  &:active {
    transform: translateY(1px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  @media (max-width: 768px) {
    padding: 10px 20px;
    font-size: 14px;
  }
`;

export const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 50%;
  transform: ${props => props.$isOpen ? 'translateX(-50%) scaleY(1)' : 'translateX(-50%) scaleY(0)'};
  transform-origin: top;
  transition: transform 0.3s ease;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  padding: 8px 0;
  margin-top: 8px;
  width: 180px;
  z-index: 100;
`;

export const DropdownItem = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 10px 16px;
  background: none;
  border: none;
  text-align: left;
  cursor: pointer;
  font-size: 14px;
  color: #333;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: #f0f0f0;
  }
  
  svg {
    color: ${props => props.$color || '#333'};
  }
`;

export const Divider = styled.div`
  height: 1px;
  background-color: #eaeaea;
  margin: 8px 0;
`;

export const HiddenInput = styled.input`
  display: none;
`;

// Novos componentes de estilo para progresso e feedback

export const ProgressContainer = styled.div`
  margin-top: 12px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 8px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  backdrop-filter: blur(5px);
`;

export const ProgressBar = styled.progress`
  width: 100%;
  height: 8px;
  border-radius: 4px;
  overflow: hidden;
  
  &::-webkit-progress-bar {
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 4px;
  }
  
  &::-webkit-progress-value {
    background: linear-gradient(90deg, #4a00e0, #8e2de2);
    border-radius: 4px;
  }
  
  &::-moz-progress-bar {
    background: linear-gradient(90deg, #4a00e0, #8e2de2);
    border-radius: 4px;
  }
`;

export const ProgressText = styled.p`
  font-size: 12px;
  color: white;
  margin: 0;
  text-align: center;
  font-weight: 500;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
`;

// Estilos para Home.jsx

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
    color: #333;
    margin: 0;
    font-weight: 500;
  }
`;