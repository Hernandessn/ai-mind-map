// MindMapView.jsx - Função de exportação aprimorada
import React, { useRef, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toPng } from 'html-to-image';
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
  NoDataMessage,
  LoadingOverlay
} from './styles';

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
    console.log("Estado atual: isMapReady =", isMapReady);
    console.log("mapRef disponível:", !!mapRef.current);
    console.log("desktopMapRef disponível:", !!desktopMapRef.current);
  }, [isMapReady]);

  // Garantir que a referência para o mapa desktop esteja pronta antes de exportar
  useEffect(() => {
    // Pré-renderizar o mapa desktop para exportação
    if (mapData) {
      console.log("mapData carregado, inicializando desktop map");
      // Definir isMapReady como true após um tempo para garantir que os componentes foram montados
      const timer = setTimeout(() => {
        setIsMapReady(true);
        console.log("Map marcado como pronto (timeout)");
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
      console.log("Desktop map configurado para renderização oculta");
    }
  }, [mapData]);

  // Effect para verificar quando o download foi concluído
  useEffect(() => {
    if (downloadStarted && exportProgress === 100) {
      // Detectar o fim do download - esperar um tempo adicional para garantir que o download seja concluído
      const downloadTimer = setTimeout(() => {
        console.log("Download presumivelmente concluído, finalizando estados de carregamento");
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
      console.error("Tentativa de baixar JSON sem dados disponíveis");
      alert("Não há dados para baixar");
      return;
    }

    try {
      console.log("Iniciando download do JSON");
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
      
      console.log("Download do JSON concluído");
    } catch (error) {
      console.error('Erro ao gerar JSON:', error);
      alert('Falha ao gerar JSON. Por favor, tente novamente.');
    }
  };

  // Função com tempos de carregamento ajustados e melhor tratamento de erros
  const handleDownloadPNG = async () => {
    console.log("Iniciando processo de download PNG");
    console.log("desktopMapRef existe:", !!desktopMapRef.current);
    
    // Verificação adicional para garantir que temos dados para exportar
    if (!mapData) {
      console.error("Tentativa de baixar PNG sem dados disponíveis");
      alert("Não há dados para baixar");
      return;
    }
    
    // Se não temos a referência, tente usar o mapa principal visível
    const elementToCapture = desktopMapRef.current || mapRef.current;
    
    if (!elementToCapture) {
      console.error("Nenhuma referência de mapa disponível para captura");
      alert("Não foi possível localizar o mapa para exportação. Tente recarregar a página.");
      return;
    }
    
    try {
      // Ativar estados de carregamento ANTES de qualquer operação
      setIsPNGExporting(true);
      setIsExporting(true);
      setExportProgress(10);
      console.log("Estados de carregamento ativados");
      
      // Aumentar o tempo inicial para visualizar melhor o loading
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Armazenar estilos originais
      console.log("Salvando estilos originais");
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
      
      // Definir estilos para captura
      console.log("Aplicando estilos para exportação");
      elementToCapture.style.backgroundColor = '#0a0a1e';
      elementToCapture.style.padding = '40px';
      elementToCapture.style.transform = 'scale(1)';
      elementToCapture.style.overflow = 'visible';
      elementToCapture.style.visibility = 'visible';
      elementToCapture.style.position = 'fixed';
      elementToCapture.style.top = '0';
      elementToCapture.style.left = '0';
      elementToCapture.style.width = '100%';
      elementToCapture.style.height = '100%';
      elementToCapture.style.zIndex = '9999';
      
      // Pré-processamento para garantir que todos os nós estejam visíveis
      console.log("Preparando nós expansíveis");
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
      console.log("Iniciando conversão para PNG");
      const dataUrl = await toPng(elementToCapture, {
        quality: 0.98,
        backgroundColor: '#0a0a1e',
        width: elementToCapture.scrollWidth,
        height: elementToCapture.scrollHeight,
        canvasWidth: elementToCapture.scrollWidth * 2,
        canvasHeight: elementToCapture.scrollHeight * 2,
        pixelRatio: 2.5,
        style: {
          transform: 'scale(1)',
          transformOrigin: 'top left',
        },
        filter: (node) => {
          // Filtrar controles de UI da imagem
          return !node.classList?.contains('zoom-controls');
        },
        skipFonts: true,
        fetchOptions: {
          mode: 'no-cors'
        }
      });
      
      console.log("Conversão para PNG concluída");
      
      // Adicionar um delay antes de atualizar o progresso
      await new Promise(resolve => setTimeout(resolve, 800));
      setExportProgress(80);
      
      // Marcar que o download está sendo iniciado
      setDownloadStarted(true);
      
      // Criar link de download
      console.log("Criando link de download");
      const link = document.createElement('a');
      link.download = `mindmap-${templateType}-${new Date().toISOString().slice(0, 10)}.png`;
      link.href = dataUrl;
      document.body.appendChild(link); // Adicionar ao DOM para garantir que funcione em todos os navegadores
      link.click();
      
      // Adicionar um delay após concluir a exportação
      await new Promise(resolve => setTimeout(resolve, 800));
      setExportProgress(100);
      
      console.log("Download do PNG iniciado - aguardando conclusão");
      
      // Remover o link após o uso
      setTimeout(() => {
        if (document.body.contains(link)) {
          document.body.removeChild(link);
        }
      }, 100);
      
      // Restaurar estilos originais
      console.log("Restaurando estilos originais");
      // Restaurar estilos do elemento principal
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
      
      // Restaurar estilos originais dos nós
      expandableElements.forEach((el, index) => {
        if (originalNodeStyles[index]) {
          el.style.maxHeight = originalNodeStyles[index].maxHeight;
          el.style.overflow = originalNodeStyles[index].overflow;
          el.style.maxWidth = originalNodeStyles[index].maxWidth;
        }
      });
      
      console.log("Estilos restaurados - tela de carregamento permanece ativa até download concluir");
      
      // Nota importante: Não resetamos os estados de carregamento aqui!
      // O useEffect que monitora downloadStarted e exportProgress se encarregará disso
      // após um tempo adicional para garantir que o download seja concluído
      
    } catch (error) {
      console.error('Erro detalhado ao gerar PNG:', error);
      alert(`Falha ao gerar PNG: ${error.message || 'Erro desconhecido'}. Por favor, tente novamente.`);
      
      // Certifique-se de resetar todos os estados mesmo em erro
      setDownloadStarted(false);
      setIsExporting(false);
      setExportProgress(0);
      setIsPNGExporting(false);
    }
  };

  // Método para sinalizar quando o mapa está pronto para exibição
  const handleMapReady = () => {
    console.log("handleMapReady chamado: Mapa está pronto");
    setIsMapReady(true);
  };

  // Renderizar o mapa mental apropriado com base no template
  const renderMindMap = (forceDesktopLayout = false) => {
    if (!mapData || !templateType) {
      console.log("Dados insuficientes para renderizar o mapa");
      return null;
    }

    try {
      console.log(`Renderizando mapa ${templateType}${forceDesktopLayout ? ' (desktop)' : ''}`);
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
          console.error(`Tipo de mapa não reconhecido: ${templateType}`);
          return <NoDataMessage>Tipo de mapa não reconhecido</NoDataMessage>;
      }
    } catch (error) {
      console.error("Erro ao renderizar mapa mental:", error);
      return <NoDataMessage>Erro ao renderizar o mapa mental. Verifique o console para mais detalhes.</NoDataMessage>;
    }
  };

  // Se não houver dados, mostrar mensagem
  if (!mapData || !templateType) {
    console.log("Nenhum dado disponível para exibição do mapa");
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
          $borderColor={false}
        >
          Voltar para a Página Inicial
        </DefaultButton>

        <DefaultButton
          onClick={handleDownloadJSON}
          $borderColor={false}
        >
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