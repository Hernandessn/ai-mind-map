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
