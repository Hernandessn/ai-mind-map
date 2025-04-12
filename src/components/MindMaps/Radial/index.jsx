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
  // Definição dos tópicos
  const topics = [
    {
      title: "Frontend",
      color: "#FFD866", // amarelo
      position: { top: "25%", left: "80%" },
      items: ["→React", "→Vue", "→Angular"]
    },
    {
      title: "Backend",
      color: "#4CD3A8", // verde
      position: { top: "70%", left: "85%" },
      items: ["→Node.js", "→Express", "→API REST"]
    },
    {
      title: "Banco de Dados",
      color: "#0C9DC2", // azul
      position: { top: "95%", left: "40%" },
      items: ["→MongoDB", "→PostgreSQL", "→MySQL"]
    },
    {
      title: "DevOps",
      color: "#EF5778", // rosa
      position: { top: "70%", left: "15%" },
      items: ["→Docker", "→CI/CD", "→Kubernetes"]
    },
    {
      title: "Mobile",
      color: "#B16BEF", // roxo
      position: { top: "25%", left: "15%" },
      items: ["→React Native", "→Flutter", "→Swift"]
    },
    {
      title: "Testes",
      color: "#FF9047", // laranja
      position: { top: "5%", left: "45%" },
      items: ["→Jest", "→Cypress", "→Selenium"]
    }
  ];

  // Cálculo de ângulos para linhas organizadas
  const calculateLinePath = (position) => {
    // Convertendo posições percentuais para coordenadas
    const x = parseInt(position.left) / 100;
    const y = parseInt(position.top) / 100;
    
    // Centro é 50%, 50%
    const centerX = 0.5;
    const centerY = 0.5;
    
    // Ângulo entre o centro e o nó
    const angle = Math.atan2(y - centerY, x - centerX) * (180 / Math.PI);
    
    return angle;
  };

  return (
    <Container>
      <MainWrapper>
        {/* Nó central */}
        <MainNode>
          PROGRAMAÇÃO
        </MainNode>

        {/* Renderizar cada tópico com suas linhas conectoras */}
        {topics.map((topic, index) => {
          const angle = calculateLinePath(topic.position);
          
          return (
            <React.Fragment key={index}>
              {/* Linha conectora */}
              <Line 
                color={topic.color}
                style={{
                  top: "50%",
                  left: "50%",
                  width: "25%", // Comprimento base da linha
                  transformOrigin: "left center",
                  transform: `rotate(${angle}deg)`
                }}
              />
              
              {/* Nó do tópico */}
              <TopicNode 
                color={topic.color}
                style={{
                  top: topic.position.top,
                  left: topic.position.left,
                }}
              >
                <div className="topic-title">{topic.title}</div>
                <TopicsList>
                  {topic.items.map((item, i) => (
                    <TopicItem key={i}>{item}</TopicItem>
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
