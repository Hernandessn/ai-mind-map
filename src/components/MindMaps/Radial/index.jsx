import React from 'react';
import {
  Container,
  RadialWrapper,
  CenterNode,
  Node,
  Line,
  Subtopics,
  Subtopic,
} from './styles';

const RadialMindMap = ({ data }) => {
  const { title, nodes } = data;

  const radius = 250;
  const centerX = 300;
  const centerY = 300;

  const angleStep = (2 * Math.PI) / nodes.length;

  return (
    <Container>
      <RadialWrapper>
        <CenterNode style={{ top: centerY - 30, left: centerX - 60, position: 'absolute' }}>
          {title}
        </CenterNode>

        {nodes.map((node, index) => {
          const angle = index * angleStep;
          const x = centerX + radius * Math.cos(angle) - 50;
          const y = centerY + radius * Math.sin(angle) - 30;

          const lineHeight = radius;
          const rotate = (angle * 180) / Math.PI;

          return (
            <React.Fragment key={index}>
              <Line
                style={{
                  top: centerY,
                  left: centerX,
                  height: lineHeight,
                  transform: `rotate(${rotate}deg)`,
                }}
              />
              <Node style={{ top: y, left: x }}>
                <div>{node.title}</div>
                {node.subtopics && node.subtopics.length > 0 && (
                  <Subtopics>
                    {node.subtopics.map((sub, i) => (
                      <Subtopic key={i}>{sub}</Subtopic>
                    ))}
                  </Subtopics>
                )}
              </Node>
            </React.Fragment>
          );
        })}
      </RadialWrapper>
    </Container>
  );
};

export default RadialMindMap;
