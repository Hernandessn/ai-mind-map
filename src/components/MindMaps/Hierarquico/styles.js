// styles.js - atualização com suporte para forceDesktopLayout
import styled from "styled-components";

export const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Poppins', sans-serif;
  width: 100%;
  overflow-x: auto;
  position: relative;
  
  @media (max-width: 1200px) {
    padding: 10px;
  }
  
  &.force-desktop-layout {
    padding: 40px;
    width: 100%;
    overflow: visible;
    min-width: 1200px; /* Forçar largura mínima para desktop */
  }
`;

export const OrgChart = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 100%;
  transition: transform 0.3s ease;
`;

export const NodeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  max-width: 100%;
`;

export const NodeContent = styled.div`
  padding: 12px 16px;
  border-radius: 6px;
  min-width: 100px;
  max-width: 150px;
  text-align: center;
  font-weight: ${({ level }) => (level === 0 ? '600' : level === 1 ? '500' : '400')};
  font-size: ${({ level }) => (level === 0 ? '16px' : level === 1 ? '15px' : '14px')};
  white-space: normal;
  word-break: break-word;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  
  ${({ nodeType }) => {
    switch(nodeType) {
      case 'company':
        return `
          background-color: #7B68EE;
          color: white;
        `;
      case 'cmo':
        return `
          background-color: #FFC107;
          color: #333;
        `;
      case 'cto':
        return `
          background-color: #2196F3;
          color: white;
        `;
      case 'coo':
        return `
          background-color: #20B2AA;
          color: white;
        `;
      case 'cpo':
        return `
          background-color: #A67B5B;
          color: white;
        `;
      case 'ceo':
        return `
          background-color: #9C27B0;
          color: white;
        `;
      case 'marketing':
        return `
          background-color: #FFF9C4;
          color: #333;
          border: 1px solid #FFC107;
        `;
      case 'engineering':
        return `
          background-color: #BBDEFB;
          color: #333;
          border: 1px solid #2196F3;
        `;
      case 'operations':
        return `
          background-color: #B2DFDB;
          color: #333;
          border: 1px solid #20B2AA;
        `;
      case 'product':
        return `
          background-color: #E6D7CF;
          color: #333;
          border: 1px solid #A67B5B;
        `;
      default:
        return `
          background-color: #f4f4f4;
          color: #333;
          border: 1px solid #ddd;
        `;
    }
  }}
`;

export const ChildrenContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 20px;
  max-width: 100%;
  
  @media (max-width: 992px) {
    gap: 10px;
  }
  
  /* Removida a alteração de direção para layout mobile */
`;

export const LineDown = styled.div`
  height: 20px;
  width: 2px;
  background-color: #888;
  margin: 0;
`;

export const LineAcross = styled.div`
  height: 2px;
  flex: 1;
  background-color: #888;
`;

export const HorizontalConnector = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  right: -80px;
  top: 0;
  height: 100%;
  width: 80px;
`;

export const ConnectorsWrapper = styled.div`
  display: grid;
  grid-template-columns: ${({ childCount }) => `repeat(${childCount}, 1fr)`};
  width: 100%;
  gap: 20px;
  
  @media (max-width: 992px) {
    gap: 10px;
  }
`;

export const ResponsiveOrgChart = styled.div`
  width: 100%;
  overflow-x: auto;
  margin-top: 20px;
  
  @media (min-width: 1400px) {
    overflow-x: visible;
  }
  
  &.full-width-export {
    overflow-x: visible;
    width: auto;
    min-width: 1200px; /* Garantir largura mínima para exportação */
  }
`;

// Adicionando componentes de controle de zoom
export const ZoomControls = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
  position: sticky;
  top: 10px;
  z-index: 10;
`;

export const ZoomButton = styled.button`
  padding: 5px 10px;
  background-color: #0a0a1e;
  color: white;
  border: 1px solid #444;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: #222244;
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(123, 104, 238, 0.5);
  }
`;

// Adicionando o componente MobileNotice
export const MobileNotice = styled.div`
  display: none;
  background-color: #fff3cd;
  color: #856404;
  border: 1px solid #ffeeba;
  border-radius: 6px;
  padding: 15px;
  margin-bottom: 20px;
  width: 100%;
  text-align: center;
  
  @media (max-width: 768px) {
    display: block;
  }
  
  h3 {
    margin-top: 0;
    margin-bottom: 10px;
    font-size: 18px;
  }
  
  p {
    margin: 0;
    font-size: 14px;
  }
`;