import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: auto;
  padding: 20px;
  background-color: transparent;
  overflow: visible;
  margin: 0 auto;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
`;

export const MainWrapper = styled.div`
  position: relative;
  background-color: transparent;
  margin: 0 auto;
  overflow: visible;
  display: flex;
  justify-content: center;
`;

export const MainNode = styled.div`
  position: absolute;
  background-color: #37BDC8;
  color: white;
  font-size: 24px;
  padding: 20px 40px;
  border-radius: 10px;
  z-index: 10;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  text-align: center;
  max-width: 250px;
  word-wrap: break-word;
  
  clip-path: polygon(
    0% 20%, 10% 0%, 90% 0%, 100% 20%,
    100% 80%, 90% 100%, 10% 100%, 0% 80%
  );
`;

export const TopicNode = styled.div`
  position: absolute;
  background-color: ${props => props.color};
  color: white;
  padding: 15px;
  border-radius: 8px;
  width: ${props => props.style?.width || '200px'};
  min-height: ${props => props.style?.minHeight || '100px'};
  max-width: 300px;
  z-index: 5;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  overflow: visible;
  transform: translate(-50%, -50%);

  .topic-title {
    font-weight: bold;
    font-size: 16px;
    margin-bottom: 10px;
    padding-bottom: 8px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.3);
    text-align: center;
    word-break: break-word;
  }
  
  &:hover {
    z-index: 20;
    transform: translate(-50%, -50%) scale(1.05);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  }
`;

export const NodeContent = styled.div`
  overflow: visible;
  padding-right: 8px;
  flex-grow: 1;
`;

export const TopicsList = styled.ul`
  margin: 0;
  padding: 0 5px;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const TopicItem = styled.li`
  margin: 6px 0;
  font-size: 16px;
  line-height: 1.4;
  word-break: break-word;
`;

export const Line = styled.div`
  position: absolute;
  height: 2px;
  background: linear-gradient(to right, #37BDC8, ${props => props.color});
  transform-origin: left center;
  z-index: 2;
  
  &::after {
    content: '';
    position: absolute;
    right: 0;
    top: -3px;
    width: 8px;
    height: 8px;
    background: ${props => props.color};
    border-radius: 50%;
  }
`;

export const MobileNotice = styled.div`
  text-align: center;
  padding: 30px;
  background: rgba(55, 189, 200, 0.1);
  border-radius: 10px;
  max-width: 500px;
  margin: 0 auto;
  
  h3 {
    color: #37BDC8;
    margin-bottom: 15px;
  }
  
  p {
    margin-bottom: 10px;
    line-height: 1.5;
  }
`;