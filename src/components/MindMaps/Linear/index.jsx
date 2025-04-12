import React from 'react';
import { Container, VerticalLine, Step, StepTitle, StepDescription } from './styles';

const Linear = ({ data }) => {
  return (
    <Container>
      <VerticalLine />
      {data.map((item, index) => (
        <Step key={index}>
          <StepTitle>{item.title}</StepTitle>
          <StepDescription>{item.description}</StepDescription>
        </Step>
      ))}
    </Container>
  );
};

export default Linear;
