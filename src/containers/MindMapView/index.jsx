// MindMapView.jsx - Função de exportação aprimorada
import React, { useRef, useState, useEffect } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

import { toPng } from 'html-to-image';

import { theme } from "../../styles/theme";

import {
  Container,
  Header,
  Title,
  MapContainer,
  ButtonsContainer,
  NoDataMessage,
  LoadingOverlay
} from './styles';

// Componentes da aplicação
import { DefaultButton, Footer } from '../../components';

import Radial from '../../components/MindMaps/Radial';
import Hierarchical from '../../components/MindMaps/Hierarquico';
import Linear from '../../components/MindMaps/Linear';

export function MindMapView() {
  const location = useLocation();
  const navigate = useNavigate();
  const { mapData, templateType } = location.state || {};
  const mapRef = useRef(null);
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const [isPNGExporting, setIsPNGExporting] = useState(false);
  const [downloadStarted, setDownloadStarted] = useState(false);


  // Sempre iniciar como true para garantir que o botão não fique desabilitado desnecessariamente
  const [isMapReady, setIsMapReady] = useState(true);

  // Pre-render desktop view for PNG export (hidden by default)
  const desktopMapRef = useRef(null);

  // Debug para verificar o estado das referências e variáveis importantes
  useEffect(() => {
  }, [isMapReady]);

  // Garantir que a referência para o mapa desktop esteja pronta antes de exportar
  useEffect(() => {
    // Pré-renderizar o mapa desktop para exportação
    if (mapData) {
      // Definir isMapReady como true após um tempo para garantir que os componentes foram montados
      const timer = setTimeout(() => {
        setIsMapReady(true);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [mapData]);

  // Certificar-se de que o mapa desktop foi montado corretamente
  useEffect(() => {
    if (desktopMapRef.current && mapData) {
      // Forçar renderização inicial
      desktopMapRef.current.style.visibility = 'hidden';
      desktopMapRef.current.style.position = 'absolute';
      desktopMapRef.current.style.left = '-9999px';
    }
  }, [mapData]);

  // Effect para verificar quando o download foi concluído
  useEffect(() => {
    if (downloadStarted && exportProgress === 100) {
      // Detectar o fim do download - esperar um tempo adicional para garantir que o download seja concluído
      const downloadTimer = setTimeout(() => {
        setDownloadStarted(false);
        setIsExporting(false);
        setExportProgress(0);
        setIsPNGExporting(false);
      }, 3000); // Tempo extra para garantir que o download seja concluído

      return () => clearTimeout(downloadTimer);
    }
  }, [downloadStarted, exportProgress]);

  // Function to go back to home page
  const handleBackToHome = () => {
    navigate('/home');
  };

  // Function to download the map as JSON
  const handleDownloadJSON = () => {
    if (!mapData) {
      alert("Não há dados para baixar");
      return;
    }

    try {
      // Create a Blob with the JSON data
      const jsonBlob = new Blob([JSON.stringify(mapData, null, 2)], { type: 'application/json' });

      // Create download link
      const link = document.createElement('a');
      link.download = `mindmap-${templateType}-${new Date().toISOString().slice(0, 10)}.json`;
      link.href = URL.createObjectURL(jsonBlob);
      document.body.appendChild(link); // Adicionar ao DOM para garantir que funcione em todos os navegadores
      link.click();

      // Clean up
      setTimeout(() => {
        document.body.removeChild(link);
        URL.revokeObjectURL(link.href);
      }, 100);

    } catch (error) {
      alert('Falha ao gerar JSON. Por favor, tente novamente.');
    }
  };

  // Função com tempos de carregamento ajustados e melhor tratamento de erros,
  // com melhorias para garantir que a exportação use o layout desktop
const handleDownloadPNG = async () => {
  // Verificação adicional para garantir que temos dados para exportar
  if (!mapData) {
    alert("Não há dados para baixar");
    return;
  }

  // Sempre usar a referência do mapa desktop para exportação
  const elementToCapture = desktopMapRef.current;

  if (!elementToCapture) {
    alert("Não foi possível localizar o mapa para exportação. Tente recarregar a página.");
    return;
  }

  try {
    // Ativar estados de carregamento ANTES de qualquer operação
    setIsPNGExporting(true);
    setIsExporting(true);
    setExportProgress(10);

    // Aumentar o tempo inicial para visualizar melhor o loading
    await new Promise(resolve => setTimeout(resolve, 800));

    // Armazenar estilos originais
    const originalStyles = {
      backgroundColor: elementToCapture.style.backgroundColor,
      padding: elementToCapture.style.padding,
      transform: elementToCapture.style.transform,
      width: elementToCapture.style.width,
      height: elementToCapture.style.height,
      overflow: elementToCapture.style.overflow,
      visibility: elementToCapture.style.visibility,
      position: elementToCapture.style.position,
      zIndex: elementToCapture.style.zIndex
    };

    // Adicionar um pequeno delay para o progresso
    await new Promise(resolve => setTimeout(resolve, 500));
    setExportProgress(20);

    // Garantir que o elemento seja visível mas fora da tela para renderização
    elementToCapture.style.backgroundColor = '#0a0a1e';
    elementToCapture.style.padding = '40px';
    elementToCapture.style.transform = 'scale(1)';
    elementToCapture.style.overflow = 'visible';
    elementToCapture.style.visibility = 'visible';
    elementToCapture.style.position = 'fixed';
    elementToCapture.style.top = '0';
    elementToCapture.style.left = '0';
    elementToCapture.style.width = '100%';
    elementToCapture.style.height = 'auto'; // Permitir altura automática
    elementToCapture.style.minWidth = '1200px'; // Garantir largura mínima para desktop
    elementToCapture.style.zIndex = '9999';

    // Forçar o modo desktop nas classes
    elementToCapture.classList.add('force-desktop-layout');
    const responsiveChart = elementToCapture.querySelector('.desktop-layout');
    if (responsiveChart) {
      responsiveChart.classList.add('full-width-export');
    }

    // Pré-processamento para garantir que todos os nós estejam visíveis
    const expandableElements = elementToCapture.querySelectorAll('[data-expandable="true"]');
    const originalNodeStyles = [];

    expandableElements.forEach((el, index) => {
      // Salvar estilos originais
      originalNodeStyles[index] = {
        maxHeight: el.style.maxHeight,
        overflow: el.style.overflow,
        maxWidth: el.style.maxWidth
      };

      // Aplicar estilos para exportação
      el.style.maxHeight = 'none';
      el.style.overflow = 'visible';
      el.style.maxWidth = 'none';
    });

    // Adicionar um delay antes de atualizar o progresso
    await new Promise(resolve => setTimeout(resolve, 800));
    setExportProgress(30);

    // Aguardar tempo suficiente para que todos os elementos sejam renderizados
    await new Promise(resolve => setTimeout(resolve, 1000));

    setExportProgress(50);

    // Gerar PNG com alta qualidade
    const dataUrl = await toPng(elementToCapture, {
      quality: 0.98,
      backgroundColor: '#0a0a1e',
      width: elementToCapture.scrollWidth,
      height: elementToCapture.scrollHeight,
      canvasWidth: elementToCapture.scrollWidth * 1.5, // Reduzido um pouco para evitar imagens muito grandes
      canvasHeight: elementToCapture.scrollHeight * 1.5,
      pixelRatio: 2,
      style: {
        transform: 'scale(1)',
        transformOrigin: 'top left',
      },
      filter: (node) => {
        // Filtrar controles de UI da imagem
        return !node.classList?.contains('zoom-controls') && 
               !node.classList?.contains('mobile-notice');
      },
      skipFonts: true,
      fetchOptions: {
        mode: 'no-cors'
      }
    });

    // Adicionar um delay antes de atualizar o progresso
    await new Promise(resolve => setTimeout(resolve, 800));
    setExportProgress(80);

    // Marcar que o download está sendo iniciado
    setDownloadStarted(true);

    // Criar link de download
    const link = document.createElement('a');
    link.download = `mindmap-${templateType}-${new Date().toISOString().slice(0, 10)}.png`;
    link.href = dataUrl;
    document.body.appendChild(link);
    link.click();

    // Adicionar um delay após concluir a exportação
    await new Promise(resolve => setTimeout(resolve, 800));
    setExportProgress(100);

    // Remover o link após o uso
    setTimeout(() => {
      if (document.body.contains(link)) {
        document.body.removeChild(link);
      }
    }, 100);

    // Restaurar estilos originais
    elementToCapture.style.backgroundColor = originalStyles.backgroundColor;
    elementToCapture.style.padding = originalStyles.padding;
    elementToCapture.style.transform = originalStyles.transform;
    elementToCapture.style.width = originalStyles.width;
    elementToCapture.style.height = originalStyles.height;
    elementToCapture.style.overflow = originalStyles.overflow;
    elementToCapture.style.visibility = originalStyles.visibility;
    elementToCapture.style.position = originalStyles.position;
    elementToCapture.style.top = '';
    elementToCapture.style.left = '';
    elementToCapture.style.zIndex = originalStyles.zIndex;
    elementToCapture.style.minWidth = '';

    // Remover classes adicionadas para exportação
    elementToCapture.classList.remove('force-desktop-layout');
    const chartElement = elementToCapture.querySelector('.desktop-layout');
    if (chartElement) {
      chartElement.classList.remove('full-width-export');
    }

    // Restaurar estilos originais dos nós
    expandableElements.forEach((el, index) => {
      if (originalNodeStyles[index]) {
        el.style.maxHeight = originalNodeStyles[index].maxHeight;
        el.style.overflow = originalNodeStyles[index].overflow;
        el.style.maxWidth = originalNodeStyles[index].maxWidth;
      }
    });

  } catch (error) {
    alert(`Falha ao gerar PNG: ${error.message || 'Erro desconhecido'}. Por favor, tente novamente.`);

    // Certifique-se de resetar todos os estados mesmo em erro
    setDownloadStarted(false);
    setIsExporting(false);
    setExportProgress(0);
    setIsPNGExporting(false);
  }
  
  // Redirecionar para home após garantir tempo para o download iniciar
  setTimeout(() => {
    navigate('/home');
  }, 1000);
};

  // Método para sinalizar quando o mapa está pronto para exibição
  const handleMapReady = () => {
    setIsMapReady(true);
  };

  // Renderizar o mapa mental apropriado com base no template
  const renderMindMap = (forceDesktopLayout = false) => {
    if (!mapData || !templateType) {
      return null;
    }

    try {
      switch (templateType) {
        case "radial":
          return <Radial
            data={mapData}
            forceDesktopLayout={forceDesktopLayout}
            onMapReady={handleMapReady}
          />;
        case "hierarquico":
          return <Hierarchical
            data={mapData}
            forceDesktopLayout={forceDesktopLayout}
            onMapReady={handleMapReady}
          />;
        case "linear":
          return <Linear
            data={mapData}
            forceDesktopLayout={forceDesktopLayout}
            onMapReady={handleMapReady}
          />;
        default:
          return <NoDataMessage>Tipo de mapa não reconhecido</NoDataMessage>;
      }
    } catch (error) {
      return <NoDataMessage>Erro ao renderizar o mapa mental. Verifique o console para mais detalhes.</NoDataMessage>;
    }
  };

  // Se não houver dados, mostrar mensagem
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

      {/* Mapa visível principal */}
      <MapContainer ref={mapRef}>
        {renderMindMap(false)}
      </MapContainer>

      {/* Mapa desktop oculto para exportação PNG */}
      <div
        ref={desktopMapRef}
        style={{
          position: 'absolute',
          left: '-9999px',
          width: '1200px',
          height: '900px',
          visibility: 'hidden',
          overflow: 'visible'
        }}
        className="desktop-layout"
      >
        {renderMindMap(true)}
      </div>

      <ButtonsContainer>
        <DefaultButton
          onClick={handleBackToHome}
          $borderColor={true}
          $gradient={theme.colors.darkBlue}
          $colorStart={theme.colors.darkBlue}
          $colorEnd={theme.colors.darkBlue}

        >
          Voltar para a Página Inicial
        </DefaultButton>

        <DefaultButton
          onClick={handleDownloadJSON}
          $borderColor={false}
          $gradient
          $colorStart={theme.colors.neonBlue}
          $colorEnd={theme.colors.neonPurple}           >
          Baixar JSON do Mapa
        </DefaultButton>

        <DefaultButton
          loading={isPNGExporting}
          onClick={handleDownloadPNG}
          $borderColor={false}
          $gradient
          $colorStart={theme.colors.neonBlue}
          $colorEnd={theme.colors.neonPurple}
          disabled={isExporting || isPNGExporting} // Removida a dependência de isMapReady
        >
          {isExporting ? `Exportando... ${exportProgress}%` : 'Baixar como PNG'}
        </DefaultButton>
      </ButtonsContainer>

      {isExporting && (
        <LoadingOverlay>
          <div className="spinner"></div>
          <div className="progress">
            {exportProgress < 100
              ? `Gerando imagem... ${exportProgress}%`
              : "Concluindo download, aguarde..."}
          </div>
        </LoadingOverlay>
      )}

      <Footer />
    </Container>
  );
}
