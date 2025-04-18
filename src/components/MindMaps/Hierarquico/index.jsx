// index.jsx
import React, { useState } from "react";
import {
  Container,
  OrgChart,
  ResponsiveOrgChart,
  ZoomControls,
  ZoomButton
} from "./styles";
import Node from "./Node";

const Hierarchical = ({ data }) => {
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
      
      <ResponsiveOrgChart>
        <OrgChart style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top center' }}>
          <Node data={data} level={0} />
        </OrgChart>
      </ResponsiveOrgChart>
    </Container>
  );
};

export default Hierarchical;
