// src/pages/MindMapView/index.jsx
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Radial from '../../components/MindMaps/Radial';
import Hierarchical from '../../components/MindMaps/Hierarquico';
import Linear from '../../components/MindMaps/Linear';
import { Footer } from "../../components/Footer";
import { DefaultButton } from "../../components/Button";

import { theme } from "../../styles/theme";

import {
  Container,
  Header,
  Title,
  MapContainer,
  ButtonsContainer,
  NoDataMessage
} from './styles';

export function MindMapView() {
  const location = useLocation();
  const navigate = useNavigate();
  const { mapData, templateType } = location.state || {};

  // Função para voltar à página inicial
  const handleBackToHome = () => {
    navigate('/home');
  };

  // Função para baixar o mapa como JSON
  const handleDownloadJSON = () => {
    if (!mapData) return;
    
    const dataStr = JSON.stringify(mapData, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.download = `mindmap-${templateType}-${new Date().toISOString().slice(0, 10)}.json`;
    a.href = url;
    a.click();
    
    URL.revokeObjectURL(url);
  };

  // Renderizar o mapa mental adequado com base no template
  const renderMindMap = () => {
    if (!mapData || !templateType) return null;

    try {
      switch (templateType) {
        case "radial":
          return <Radial data={mapData} />;
        case "hierarquico":
          return <Hierarchical data={mapData} />;
        case "linear":
          return <Linear data={mapData} />;
        default:
          return <NoDataMessage>Tipo de mapa não reconhecido</NoDataMessage>;
      }
    } catch (error) {
      console.error("Erro ao renderizar mapa mental:", error);
      return <NoDataMessage>Erro ao renderizar o mapa mental. Verifique o console para mais detalhes.</NoDataMessage>;
    }
  };

  // Se não houver dados, exibir mensagem
  if (!mapData || !templateType) {
    return (
      <Container>
        <Header>
          <Title>Visualização de Mapa Mental</Title>
        </Header>
        <NoDataMessage>
          Nenhum dado de mapa mental disponível. Por favor, volte à página inicial e gere um mapa.
        </NoDataMessage>
        <ButtonsContainer>
          <DefaultButton
            onClick={handleBackToHome}
            $borderColor={false}
            $gradient
            $colorStart={theme.colors.neonBlue}
            $colorEnd={theme.colors.neonPurple}
          >
            Voltar para a Página Inicial
          </DefaultButton>
        </ButtonsContainer>
        <Footer />
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <Title>Seu Mapa Mental</Title>
      </Header>
      
      <MapContainer>
        {renderMindMap()}
      </MapContainer>
      
      <ButtonsContainer>
        <DefaultButton
          onClick={handleBackToHome}
          $borderColor={false}
        >
          Voltar para a Página Inicial
        </DefaultButton>
        
        <DefaultButton
          onClick={handleDownloadJSON}
          $borderColor={false}
          $gradient
          $colorStart={theme.colors.neonBlue}
          $colorEnd={theme.colors.neonPurple}
        >
          Baixar JSON do Mapa
        </DefaultButton>
      </ButtonsContainer>
      
      <Footer />
    </Container>
  );
}