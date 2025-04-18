import React, { useState } from 'react';
import TruncatedText from '../../TruncatedText';
import {
  Container,
  VerticalLine,
  Step,
  StepTitle,
  StepDescription,
  ZoomControls,
  ZoomButton
} from './styles';

const Linear = ({ data }) => {
  const [zoom, setZoom] = useState(100);

  // Handle zoom controls
  const handleZoomIn = () => setZoom(Math.min(zoom + 10, 150));
  const handleZoomOut = () => setZoom(Math.max(zoom - 10, 50));
  const handleZoomReset = () => setZoom(100);

  return (
    <Container>
      <ZoomControls>
        <ZoomButton onClick={handleZoomIn}>+</ZoomButton>
        <ZoomButton onClick={handleZoomReset}>{zoom}%</ZoomButton>
        <ZoomButton onClick={handleZoomOut}>-</ZoomButton>
      </ZoomControls>
      
      <div style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top center' }}>
        <VerticalLine />
        {data.map((item, index) => (
          <Step key={index}>
            <StepTitle>
              <TruncatedText text={item.title} maxLength={60} />
            </StepTitle>
            <StepDescription>
              <TruncatedText text={item.description} maxLength={150} />
            </StepDescription>
          </Step>
        ))}
      </div>
    </Container>
  );
};

export default Linear;
