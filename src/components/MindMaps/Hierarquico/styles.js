import styled from 'styled-components';

const levelColors = {
  0: '#1e40af', // Azul escuro
  1: '#3b82f6', // Azul médio
  2: '#60a5fa', // Azul claro
  3: '#93c5fd', // Azul mais claro
  4: '#bfdbfe', // Azul bem claro
};

export const HierarchicalMapContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 40px 16px;
  overflow-x: auto;
  min-height: 600px;
`;

export const NodeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  margin-top: ${props => props.level > 0 ? '40px' : '0'};
  width: 100%;
`;

export const NodeCard = styled.div`
  background-color: white;
  border: 2px solid ${props => levelColors[props.level] || levelColors[4]};
  border-radius: 12px;
  padding: 12px 20px;
  min-width: 180px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  cursor: ${props => props.hasChildren ? 'pointer' : 'default'};
  z-index: 2;
  
  &:hover {
    transform: ${props => props.hasChildren ? 'translateY(-3px)' : 'none'};
    box-shadow: ${props => props.hasChildren ? '0 8px 16px rgba(0, 0, 0, 0.12)' : '0 4px 12px rgba(0, 0, 0, 0.08)'};
  }
`;

export const NodeContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  
  .icon {
    font-size: 18px;
  }
`;

export const NodeTitle = styled.h3`
  margin: 0;
  font-size: ${props => 18 - (props.level * 1.5)}px;
  font-weight: ${props => 600 - (props.level * 50)};
  color: ${props => levelColors[props.level] || '#64748b'};
  text-align: center;
`;

export const ChildrenContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
  width: 100%;
`;

export const ConnectionLine = styled.div`
  position: absolute;
  top: -40px;
  width: 2px;
  height: 40px;
  background-color: ${props => levelColors[props.level] || levelColors[4]};
  z-index: 1;
`;