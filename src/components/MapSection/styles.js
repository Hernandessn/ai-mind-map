import React from 'react';
import styled from 'styled-components';

export const MapSectionContainer = styled.section`
  flex-grow: 1;
  padding: 20px 0 40px;
`;

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  
  @media (max-width: 768px) {
    padding: 0 0.5rem;
  }
`;

export const MapContainer = styled.div`
  background-color: rgba(0, 27, 41, 0.5);
  border: 2px solid rgba(0, 243, 255, 0.3);
  border-radius: 10px;
  min-height: 400px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  
  @media (max-width: 768px) {
    min-height: 300px;
  }

  @media (max-width: 480px) {
    min-height: 250px;
  }
`;

export const MapPlaceholder = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  color: rgba(255, 255, 255, 0.6);

  @media (max-width: 768px) {
    gap: 15px;
  }
`;

export const PlaceholderIcon = styled.div`
  width: 80px;
  height: 80px;
  border: 3px solid rgba(0, 243, 255, 0.3);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40px;

  @media (max-width: 768px) {
    width: 60px;
    height: 60px;
    font-size: 30px;
  }

  @media (max-width: 480px) {
    width: 50px;
    height: 50px;
    font-size: 25px;
  }
`;

export const PlaceholderText = styled.p`
  font-size: 18px;
  text-align: center;
  max-width: 400px;

  @media (max-width: 768px) {
    font-size: 16px;
  }

  @media (max-width: 480px) {
    font-size: 14px;
    max-width: 300px;
  }
`;

export const MindMap = styled.div`
  width: 100%;
  min-height: 400px;
  
  @media (max-width: 768px) {
    min-height: 300px;
  }

  @media (max-width: 480px) {
    min-height: 250px;
  }
`;
