// src/pages/MindMapView/styles.js
import styled from 'styled-components';
import { theme } from '../../styles/theme';

export const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: ${theme.colors.darkBg};
`;

export const Header = styled.header`
  padding: 2rem 1rem;
  background: linear-gradient(180deg, rgba(6, 6, 20, 0.8) 0%, rgba(6, 6, 20, 0.6) 100%);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  text-align: center;
`;

export const Title = styled.h1`
  font-size: 2.5rem;
  color: ${theme.colors.white};
  margin: 0;
  background: linear-gradient(90deg, ${theme.colors.neonBlue}, ${theme.colors.neonPurple});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 700;

  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

export const MapContainer = styled.div`
  flex: 1;
  padding: 2rem;
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
  background: rgba(10, 10, 30, 0.5);
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.08);
  margin-top: 2rem;
  margin-bottom: 2rem;
  min-height: 500px;
  
  @media (max-width: 768px) {
    padding: 1rem;
    min-height: 400px;
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
  padding: 0 1rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const NoDataMessage = styled.div`
  text-align: center;
  color: ${theme.colors.lightGray};
  padding: 2rem;
  font-size: 1.2rem;
  margin: 3rem auto;
  max-width: 600px;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;