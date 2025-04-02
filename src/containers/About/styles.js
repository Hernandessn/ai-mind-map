import styled from 'styled-components';

// Styled Components
 export const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  color: #333;
`;

export const Header = styled.header`
  text-align: center;
  margin-bottom: 3rem;
`;

export const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  color: #222;
  margin-bottom: 1rem;
`;

export const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #666;
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.6;
`;

export const Section = styled.section`
  margin-bottom: 4rem;
`;

export const SectionTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: #222;
  position: relative;
  padding-bottom: 0.5rem;
  
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 60px;
    height: 3px;
    background: linear-gradient(90deg, #3498db, #2980b9);
  }
`;

export const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

export const TeamMember = styled.div`
  text-align: center;
`;

export const Avatar = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background-color: #f0f0f0;
  margin: 0 auto 1rem;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const AvatarImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const MemberName = styled.h3`
  font-size: 1.3rem;
  margin: 0.5rem 0;
`;

export const MemberPosition = styled.p`
  color: #666;
  margin: 0;
`;

export const MemberBio = styled.p`
  font-size: 0.9rem;
  margin-top: 0.5rem;
  line-height: 1.5;
`;

export const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

export const InfoCard = styled.div`
  background: #f9f9f9;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

export const CardTitle = styled.h3`
  font-size: 1.4rem;
  margin-top: 0;
  margin-bottom: 1rem;
`;

export const Paragraph = styled.p`
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

export const Timeline = styled.div`
  position: relative;
  max-width: 800px;
  margin: 2rem auto;
  
  &:before {
    content: '';
    position: absolute;
    left: 50%;
    width: 2px;
    height: 100%;
    background: #e0e0e0;
  }
`;

export const TimelineItem = styled.div`
  display: flex;
  justify-content: ${props => props.position === 'left' ? 'flex-start' : 'flex-end'};
  padding-bottom: 2rem;
  width: 100%;
  
  @media (max-width: 768px) {
    justify-content: flex-end;
  }
`;

export const TimelineContent = styled.div`
  width: 45%;
  padding: 1.5rem;
  background: #fff;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  position: relative;
  
  &:before {
    content: '';
    position: absolute;
    top: 20px;
    ${props => props.position === 'left' ? 'right: -10px' : 'left: -10px'};
    width: 20px;
    height: 20px;
    background: #fff;
    transform: rotate(45deg);
    box-shadow: ${props => props.position === 'left' ? '2px -2px 0 rgba(0, 0, 0, 0.1)' : '-2px 2px 0 rgba(0, 0, 0, 0.1)'};
  }
  
  @media (max-width: 768px) {
    width: 80%;
    
    &:before {
      left: -10px;
      box-shadow: -2px 2px 0 rgba(0, 0, 0, 0.1);
    }
  }
`;

export const TimelineDate = styled.h4`
  margin-top: 0;
  color: #3498db;
  font-weight: 600;
`;

export const Contact = styled.div`
  text-align: center;
  margin-top: 3rem;
`;

export const ContactLink = styled.a`
  display: inline-block;
  padding: 0.8rem 2rem;
  margin: 0 0.5rem;
  background: linear-gradient(90deg, #3498db, #2980b9);
  color: white;
  text-decoration: none;
  border-radius: 30px;
  font-weight: 600;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  }
`;
