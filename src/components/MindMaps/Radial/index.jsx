import React, { useRef, useState, useEffect } from 'react';
import {
  Container,
  MainNode,
  TopicNode,
  Line,
  TopicsList,
  TopicItem,
  MainWrapper,
  MobileNotice,
  NodeContent
} from './styles';

const Radial = ({ data, forceDesktopLayout = false }) => {
  const mainTitle = data.title || "Tópico Central";
  const topics = data.nodes || [];
  const containerRef = useRef(null);
  const wrapperRef = useRef(null);
  const [layoutConfig, setLayoutConfig] = useState({
    nodes: [],
    positions: [],
    containerSize: { width: 0, height: 0 }
  });

  useEffect(() => {
    if (topics.length > 0) {
      const nodesConfig = topics.map((topic) => {
        const subtopics = topic.subtopics || [];
        const contentSize = subtopics.join('').length + (topic.title?.length || 0);
        
        const baseWidth = Math.min(320, Math.max(180, 150 + contentSize * 0.3));
        const baseHeight = 80 + (subtopics.length * 18);
        
        return {
          width: baseWidth,
          height: baseHeight
        };
      });

      const totalNodes = topics.length;
      let baseRadius = 200 + (totalNodes * 20);
      
      const center = { x: 0, y: 0 };
      const positions = topics.map((_, index) => {
        const angleStep = 360 / totalNodes;
        let angle = index * angleStep;
        
        if (totalNodes % 2 === 0) {
          angle += angleStep / 2;
        }
        
        const quadrant = Math.floor(angle / 90) % 4;
        const xScale = [1.1, 1.3, 1.1, 0.9][quadrant];
        const yScale = [0.9, 1.1, 1.3, 1.1][quadrant];
        
        const radians = (angle * Math.PI) / 180;
        return {
          x: center.x + baseRadius * xScale * Math.cos(radians),
          y: center.y + baseRadius * yScale * Math.sin(radians),
          angle
        };
      });

      let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
      
      minX = Math.min(minX, center.x - 50);
      maxX = Math.max(maxX, center.x + 50);
      minY = Math.min(minY, center.y - 50);
      maxY = Math.max(maxY, center.y + 50);
      
      positions.forEach((pos, index) => {
        const nodeWidth = nodesConfig[index].width;
        const nodeHeight = nodesConfig[index].height;
        
        minX = Math.min(minX, pos.x - nodeWidth/2);
        maxX = Math.max(maxX, pos.x + nodeWidth/2);
        minY = Math.min(minY, pos.y - nodeHeight/2);
        maxY = Math.max(maxY, pos.y + nodeHeight/2);
      });

      const padding = 40;
      const containerWidth = Math.ceil(maxX - minX + padding * 2);
      const containerHeight = Math.ceil(maxY - minY + padding * 2);
      
      // Centralização perfeita
      const offsetX = (containerWidth - (maxX - minX)) / 2 - minX;
      const offsetY = (containerHeight - (maxY - minY)) / 2 - minY;

      const adjustedPositions = positions.map(pos => ({
        x: pos.x + offsetX,
        y: pos.y + offsetY,
        angle: pos.angle
      }));
      
      const centerAdjusted = {
        x: center.x + offsetX,
        y: center.y + offsetY
      };

      setLayoutConfig({
        nodes: nodesConfig,
        positions: adjustedPositions,
        center: centerAdjusted,
        containerSize: {
          width: containerWidth,
          height: containerHeight
        }
      });
    }
  }, [topics]);

  const calculateLineAngle = (startX, startY, endX, endY) => {
    return Math.atan2(endY - startY, endX - startX) * (180 / Math.PI);
  };

  const calculateLineLength = (startX, startY, endX, endY) => {
    const dx = endX - startX;
    const dy = endY - startY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const isMobile = !forceDesktopLayout && typeof window !== 'undefined' && window.innerWidth <= 768;

  if (isMobile) {
    return (
      <Container>
        <MobileNotice>
          <h3>Mapa Mental Radial</h3>
          <p>Para melhor visualização, acesse de um dispositivo com tela maior ou exporte como imagem.</p>
        </MobileNotice>
      </Container>
    );
  }

  return (
    <Container ref={containerRef}>
      <MainWrapper 
        ref={wrapperRef}
        style={{
          width: `${layoutConfig.containerSize.width}px`,
          height: `${layoutConfig.containerSize.height}px`,
          position: 'relative'
        }}
      >
        {layoutConfig.center && (
          <MainNode style={{
            position: 'absolute',
            left: `${layoutConfig.center.x}px`,
            top: `${layoutConfig.center.y}px`,
            transform: 'translate(-50%, -50%)'
          }}>
            {mainTitle}
          </MainNode>
        )}

        {topics.map((topic, index) => {
          const nodeConfig = layoutConfig.nodes[index] || { width: 200, height: 100 };
          const pos = layoutConfig.positions?.[index] || { x: 0, y: 0 };
          const center = layoutConfig.center || { x: 0, y: 0 };
          
          const lineAngle = calculateLineAngle(center.x, center.y, pos.x, pos.y);
          const lineLength = calculateLineLength(center.x, center.y, pos.x, pos.y);

          const colors = [
            '#FFD866', '#4CD3A8', '#0C9DC2', '#EF5778',
            '#B16BEF', '#FF9047', '#00D1FF', '#FF66C4'
          ];
          const color = colors[index % colors.length];

          return (
            <React.Fragment key={index}>
              <Line
                color={color}
                style={{
                  position: 'absolute',
                  left: `${center.x}px`,
                  top: `${center.y}px`,
                  width: `${lineLength}px`,
                  transform: `rotate(${lineAngle}deg)`,
                  transformOrigin: 'left center'
                }}
              />

              <TopicNode
                color={color}
                style={{
                  position: 'absolute',
                  left: `${pos.x}px`,
                  top: `${pos.y}px`,
                  width: `${nodeConfig.width}px`,
                  minHeight: `${nodeConfig.height}px`,
                  transform: 'translate(-50%, -50%)'
                }}
              >
                <div className="topic-title">{topic.title}</div>
                <NodeContent>
                  <TopicsList>
                    {(topic.subtopics || []).map((item, i) => (
                      <TopicItem key={i}>
                        → {item}
                      </TopicItem>
                    ))}
                  </TopicsList>
                </NodeContent>
              </TopicNode>
            </React.Fragment>
          );
        })}
      </MainWrapper>
    </Container>
  );
};

export default Radial;