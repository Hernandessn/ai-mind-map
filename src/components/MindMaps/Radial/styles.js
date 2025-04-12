import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Poppins', sans-serif;
  padding: 40px;
  background: #f4f7fa;
  min-height: 100vh;
`;

export const CenterNode = styled.div`
  background-color: #3f51b5;
  color: white;
  font-weight: 600;
  font-size: 20px;
  padding: 16px 24px;
  border-radius: 12px;
  box-shadow: 0 0 12px rgba(0,0,0,0.2);
  position: relative;
  z-index: 1;
`;

export const RadialWrapper = styled.div`
  position: relative;
  width: 600px;
  height: 600px;
`;

export const Line = styled.div`
  position: absolute;
  width: 2px;
  background-color: #ccc;
  transform-origin: top center;
`;

export const Node = styled.div`
  position: absolute;
  background-color: #ffffff;
  color: #333;
  padding: 12px 18px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  text-align: center;
  font-family: 'Roboto Slab', serif;
`;

export const Subtopics = styled.ul`
  margin-top: 8px;
  padding-left: 0;
  list-style: none;
  font-size: 13px;
  color: #555;
`;

export const Subtopic = styled.li`
  margin: 2px 0;
`;
