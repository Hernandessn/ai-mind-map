import styled from 'styled-components';

// Definição de breakpoints
const breakpoints = {
  mobile: '480px',
  tablet: '768px',
  laptop: '1024px',
  desktop: '1200px'
};

// Styled Components
export const FooterContainer = styled.footer`
  padding: 30px 0;
  background-color: rgba(0, 13, 20, 0.7);
  backdrop-filter: blur(10px);
  border-top: 1px solid rgba(0, 243, 255, 0.2);
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;

  p {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    
    @media (max-width: ${breakpoints.mobile}) {
      flex-direction: column;
      text-align: center;
    }
  }
  
  @media (max-width: ${breakpoints.mobile}) {
    padding: 0 15px;
    gap: 15px;
  }
`;

export const FooterContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
  
  @media (max-width: ${breakpoints.tablet}) {
    flex-direction: column;
    align-items: center;
  }
`;

export const FooterDescription = styled.p`
  font-size: 16px;
  color: rgba(255, 255, 255, 0.8);
  flex: 1;
  min-width: 200px;
  
  @media (max-width: ${breakpoints.tablet}) {
    text-align: center;
    min-width: unset;
    width: 100%;
  }
  
  @media (max-width: ${breakpoints.mobile}) {
    font-size: 14px;
  }
`;

export const AboutButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: rgba(0, 27, 41, 0.7);
  border: 2px solid rgba(0, 243, 255, 0.3);
  color: white;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: var(--neon-blue);
    box-shadow: 0 0 15px rgba(0, 243, 255, 0.5);
    transform: translateY(-2px);
  }
  
  @media (max-width: ${breakpoints.mobile}) {
    padding: 8px 16px;
    font-size: 14px;
  }
`;

export const ButtonIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ButtonText = styled.span``;

export const SocialLinks = styled.div`
  display: flex;
  gap: 15px;
  
  @media (max-width: ${breakpoints.tablet}) {
    margin-top: 10px;
  }
  
  @media (max-width: ${breakpoints.mobile}) {
    gap: 10px;
  }
`;

export const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: rgba(0, 27, 41, 0.7);
  border: 1px solid rgba(0, 243, 255, 0.3);
  color: white;
  transition: all 0.3s ease;

  &:hover {
    border-color: var(--neon-purple);
    box-shadow: 0 0 10px rgba(183, 0, 255, 0.6);
    transform: translateY(-2px);
  }
  
  @media (max-width: ${breakpoints.mobile}) {
    width: 32px;
    height: 32px;
  }
`;

export const Copyright = styled.div`
  text-align: center;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.5);
  margin-top: 10px;
  
  @media (max-width: ${breakpoints.mobile}) {
    font-size: 12px;
  }
`;