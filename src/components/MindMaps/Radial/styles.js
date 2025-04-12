
// styles.js
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 130vh;
  background-color: #f9f9f9;
  padding: 20px;
  font-family: 'Roboto', sans-serif;
`;

export const MainWrapper = styled.div`
  position: relative;
  width: 900px;
  height: 700px;
  
  @media (max-width: 900px) {
    width: 100%;
    height: 600px;
  }
`;

export const MainNode = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #37BDC8;
  color: white;
  font-size: 28px;
  font-weight: bold;
  padding: 15px 30px;
  border-radius: 8px;
  text-align: center;
  z-index: 10;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  letter-spacing: 1px;
  
  /* Forma irregular para um visual mais moderno */
  clip-path: polygon(
    0% 20%, 10% 0%, 90% 0%, 100% 20%,
    100% 80%, 90% 100%, 10% 100%, 0% 80%
  );
`;

export const TopicNode = styled.div`
  position: absolute;
  transform: translate(-50%, -50%);
  background-color: ${props => props.color || '#f0f0f0'};
  color: white;
  padding: 12px 18px;
  border-radius: 6px;
  min-width: 140px;
  text-align: left;
  z-index: 5;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
  
  .topic-title {
    font-weight: bold;
    font-size: 18px;
    margin-bottom: 8px;
    text-align: center;
    border-bottom: 1px solid rgba(255, 255, 255, 0.3);
    padding-bottom: 5px;
  }
  
  /* Transição suave no hover */
  transition: transform 0.2s, box-shadow 0.2s;
  
  &:hover {
    transform: translate(-50%, -50%) scale(1.05);
    box-shadow: 0 5px 12px rgba(0, 0, 0, 0.15);
  }
`;

export const Line = styled.div`
  position: absolute;
  height: 3px;
  background-color: ${props => props.color || '#ccc'};
  z-index: 1;
  
  /* Efeito de gradiente para fazer a linha parecer conectada ao nó principal */
  background-image: linear-gradient(
    to right, 
    #37BDC8 0%, 
    ${props => props.color || '#ccc'} 100%
  );
  
  /* Pequeno triângulo na ponta da linha */
  &::after {
    content: '';
    position: absolute;
    right: -6px;
    top: -4.5px;
    width: 0;
    height: 0;
    border-left: 8px solid ${props => props.color || '#ccc'};
    border-top: 6px solid transparent;
    border-bottom: 6px solid transparent;
  }
`;

export const TopicsList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

export const TopicItem = styled.li`
  margin: 5px 0;
  font-size: 14px;
  white-space: nowrap;
`;