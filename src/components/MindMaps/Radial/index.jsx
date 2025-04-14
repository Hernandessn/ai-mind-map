// index.jsx
import React from 'react';
import {
  Container,
  MainNode,
  TopicNode,
  Line,
  TopicsList,
  TopicItem,
  MainWrapper,
} from './styles';

const Radial = ({ data }) => {
  const mainTitle = data.title || "Tópico Principal";
  const topics = data.nodes || [];

  // Distribuir as posições em círculo
  const calculatePositions = (index, total) => {
    const angle = (360 / total) * index;
    const radius = 40; // porcentagem de distância a partir do centro
    const x = 50 + radius * Math.cos((angle * Math.PI) / 180);
    const y = 50 + radius * Math.sin((angle * Math.PI) / 180);
    return { top: `${y}%`, left: `${x}%` };
  };

  const calculateAngle = (x, y) => {
    const centerX = 0.5;
    const centerY = 0.5;
    const angle = Math.atan2(y - centerY, x - centerX) * (180 / Math.PI);
    return angle;
  };

  return (
    <Container>
      <MainWrapper>
        <MainNode>{mainTitle}</MainNode>

        {topics.map((topic, index) => {
          const pos = calculatePositions(index, topics.length);
          const angle = calculateAngle(
            parseFloat(pos.left) / 100,
            parseFloat(pos.top) / 100
          );

          const colorList = [
            '#FFD866', '#4CD3A8', '#0C9DC2', '#EF5778',
            '#B16BEF', '#FF9047', '#00D1FF', '#FF66C4'
          ];
          const color = colorList[index % colorList.length];

          return (
            <React.Fragment key={index}>
              {/* Linha */}
              <Line
                color={color}
                style={{
                  top: "50%",
                  left: "50%",
                  width: "25%",
                  transformOrigin: "left center",
                  transform: `rotate(${angle}deg)`
                }}
              />

              {/* Nó do Tópico */}
              <TopicNode
                color={color}
                style={{
                  top: pos.top,
                  left: pos.left,
                }}
              >
                <div className="topic-title">{topic.title}</div>
                <TopicsList>
                  {(topic.subtopics || []).map((item, i) => (
                    <TopicItem key={i}>→ {item}</TopicItem>
                  ))}
                </TopicsList>
              </TopicNode>
            </React.Fragment>
          );
        })}
      </MainWrapper>
    </Container>
  );
};

export default Radial;
