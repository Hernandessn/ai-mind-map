// index.jsx (Hierarchical)
import React, { useState, useEffect } from "react";
import {
  Container,
  OrgChart,
  ResponsiveOrgChart,
  ZoomControls,
  ZoomButton,
  MobileNotice
} from "./styles";
import Node from "./Node";

const Hierarchical = ({ data, forceDesktopLayout = false, onMapReady }) => {
  const [zoom, setZoom] = useState(100);

  // Notificar o componente pai quando o mapa estiver pronto
  useEffect(() => {
    if (onMapReady && typeof onMapReady === 'function') {
      // Pequeno delay para garantir que o mapa esteja totalmente renderizado
      const timer = setTimeout(() => {
        onMapReady();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [onMapReady]);

  // Handle zoom controls  
  const handleZoomIn = () => setZoom(Math.min(zoom + 10, 150));
  const handleZoomOut = () => setZoom(Math.max(zoom - 10, 50));
  const handleZoomReset = () => setZoom(100);

  return (
    <Container className={forceDesktopLayout ? 'force-desktop-layout' : ''}>
      {/* Mobile notice que só aparece em telas menores e não aparece quando forceDesktopLayout está ativo */}
      {!forceDesktopLayout && (
        <MobileNotice>
          <h3>Mapa Mental Hierárquico</h3>
          <p>Para melhor visualização, acesse um dispositivo com tela maior ou role horizontalmente para ver todo o conteúdo.</p>
        </MobileNotice>
      )}
      
      {/* Controles de zoom - apenas visíveis na visualização normal (não na exportação) */}
      {!forceDesktopLayout && (
        <ZoomControls className="zoom-controls">
          <ZoomButton onClick={handleZoomIn}>+</ZoomButton>
          <ZoomButton onClick={handleZoomReset}>{zoom}%</ZoomButton>
          <ZoomButton onClick={handleZoomOut}>-</ZoomButton>
        </ZoomControls>
      )}
      
      <ResponsiveOrgChart className={forceDesktopLayout ? 'full-width-export' : ''}>
        <OrgChart 
          style={{ 
            transform: forceDesktopLayout ? 'scale(1)' : `scale(${zoom / 100})`,
            transformOrigin: 'top center' 
          }}
          data-expandable="true"
        >
          <Node data={data} level={0} />
        </OrgChart>
      </ResponsiveOrgChart>
    </Container>
  );
};

export default Hierarchical;