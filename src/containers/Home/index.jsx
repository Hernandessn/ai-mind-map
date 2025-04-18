import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Componentes da aplicação
import { TemplateCards } from "../../components/TemplateCard";
import { MapSection } from "../../components/MapSection";
import { DefaultButton } from "../../components/Button";
import { Footer } from "../../components/Footer";
import { FileViewer } from '../../components/FileViewer';
import { FilePreview } from '../../components/FilePreview';

import { generateMindMap } from '../../utils/handleGenerateMap';
// Estilos e tema
import { theme } from "../../styles/theme";
import {
  ButtonContainer,
  ContainerComponent,
  ContainerText,
  SectionCards,
  Header,
  Input,
  InputContainer,
  InputSection,
  Main,
  SubTitle,
  Title,
  DebugViewerContainer,
  DebugHeader,
  DebugContent,
  DebugControlButton,
  TextStats,
  ErrorMessage,
  AlertBox,
  ContainerAlert,
  Contact
} from "./styles";

// Imagens dos modelos de mapas mentais
import radialImage from '/src/assets/map-radial.png';
import linearImage from '/src/assets/map-linear.png';
import hierarquicoImage from '/src/assets/map-hierarquico.png';

// Serviço que faz a chamada à IA
import { ServicesGemini } from '../../services/ServicesGeminiAPI';

// Importando o hook
import { useFileToText } from '../../hooks/useFileToText';

// Componente para exibir o texto extraído (debug)
const DebugTextViewer = ({ text, isVisible }) => {
  if (!isVisible || !text) return null;

  return (
    <DebugViewerContainer>
      <DebugHeader>Debug: Texto Extraído ({text.length} caracteres)</DebugHeader>
      <DebugContent>{text}</DebugContent>
    </DebugViewerContainer>
  );
};

export function Home() {
  const navigate = useNavigate();

  // Usando o hook para gerenciar arquivos
  const {
    pdfText,
    fileData,
    resetTrigger,
    handleFileSelect,
    handleRemoveFile,
  } = useFileToText();

  // Estados principais
  const [selectedTemplate, setSelectedTemplate] = useState(null); // Template selecionado (radial, hierárquico, linear)
  const [topic, setTopic] = useState(''); // Tema digitado manualmente
  const [mapResult, setMapResult] = useState(''); // Resposta bruta da API
  const [parsedMapData, setParsedMapData] = useState(null); // JSON extraído da resposta
  const [isLoading, setIsLoading] = useState(false); // Loading enquanto a IA processa
  const [showDebug, setShowDebug] = useState(false); // Mostrar ou ocultar texto extraído
  const [jsonError, setJsonError] = useState(''); // Erro ao extrair JSON da resposta

  // Gera o mapa mental com base no tema digitado ou texto extraído
  const handleGenerateMap = async () => {
    setIsLoading(true);
    setParsedMapData(null);
    setJsonError('');

    const finalPrompt = pdfText || topic;

    if (!finalPrompt) {
      setIsLoading(false);
      return alert("Por favor, digite um tema ou carregue um arquivo!");
    }

    if (!selectedTemplate) {
      setIsLoading(false);
      return alert("Por favor, selecione um modelo de mapa mental!");
    }

    try {
      const { jsonData, response } = await generateMindMap({
        prompt: finalPrompt,
        selectedTemplate,
        navigate,
      });

      setMapResult(response);

      if (jsonData) {
        setParsedMapData(jsonData);
        navigate('/mindmap-view', {
          state: {
            mapData: jsonData,
            templateType: selectedTemplate,
          },
        });
      } else {
        setJsonError('Não foi possível processar o resultado como JSON válido.');
      }
    } catch (error) {
      setJsonError('Ocorreu um erro durante a geração do mapa mental. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Cabeçalho */}
      <Header>
        <ContainerText>
          <Title>IA de Mapas Mentais</Title>
          <SubTitle>Crie mapas mentais impressionantes com apenas um tema</SubTitle>
        </ContainerText>
      </Header>

      {/* Conteúdo principal */}
      <Main>
        <InputSection>
          <ContainerComponent>
            <InputContainer>
              <Input
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Digite o tema aqui..."
                disabled={isLoading || fileData !== null}
              />
            </InputContainer>

            <ButtonContainer>
              <FileViewer
                onFileSelect={handleFileSelect}
                resetTrigger={resetTrigger}
              />

              <DefaultButton
                onClick={handleGenerateMap}
                $borderColor={false}
                $gradient
                $colorStart={theme.colors.neonBlue}
                $colorEnd={theme.colors.neonPurple}
                disabled={isLoading || !selectedTemplate}
              >
                {isLoading ? 'Processando...' : 'Gerar Mapa Mental'}
              </DefaultButton>
            </ButtonContainer>
          </ContainerComponent>
        </InputSection>

        {/* Pré-visualização do arquivo */}
        {fileData && (
          <FilePreview fileData={fileData} onRemove={handleRemoveFile} />
        )}

        {/* Informações de debug e texto extraído */}
        {pdfText && (
          <TextStats>
            <p>{`Texto extraído: ${pdfText.length} caracteres`}</p>
            <DebugControlButton onClick={() => setShowDebug(!showDebug)}>
              {showDebug ? 'Ocultar Texto' : 'Mostrar Texto'}
            </DebugControlButton>
          </TextStats>
        )}

        <DebugTextViewer text={pdfText} isVisible={showDebug} />

        {/* Exibição de erro se não conseguir gerar o JSON */}
        {jsonError && <ErrorMessage>{jsonError}</ErrorMessage>}

        {/* Cartões com os templates disponíveis */}
        <SectionCards>
          <TemplateCards
            img={radialImage}
            name="Radial"
            Description="Ideal para brainstorming com ramificações em todas as direções."
            dataTemplate="radial"
            isSelected={selectedTemplate === "radial"}
            onClick={() => setSelectedTemplate("radial")}
          />
          <TemplateCards
            img={hierarquicoImage}
            name="Hierárquico"
            Description="Perfeito para estruturas com subníveis organizacionais."
            dataTemplate="hierarquico"
            isSelected={selectedTemplate === "hierarquico"}
            onClick={() => setSelectedTemplate("hierarquico")}
          />
          <TemplateCards
            img={linearImage}
            name="Linear"
            Description="Ideal para processos sequenciais e fluxos de trabalho."
            dataTemplate="linear"
            isSelected={selectedTemplate === "linear"}
            onClick={() => setSelectedTemplate("linear")}
          />
        </SectionCards>

        {/* Exibe a resposta bruta caso não consiga extrair o JSON */}
        {mapResult && !parsedMapData && jsonError && (
          <div style={{ marginTop: '1rem', background: '#000', padding: '1rem', borderRadius: '8px' }}>
            <h3>Resposta da API (JSON não processado):</h3>
            <p style={{ whiteSpace: 'pre-wrap' }}>{mapResult}</p>
          </div>
        )}

        {/* Alerta sobre limite de uso da API */}
        <ContainerAlert>
          <AlertBox>
            <strong>Atenção:</strong> Caso ocorra um erro ao gerar o mapa mental, pode ser que o <strong>limite de uso mensal</strong> tenha sido atingido.
            Tente novamente mais tarde ou entre em contato com o 
            <Contact to="https://www.instagram.com/hernandes.sn/" target='_blank'>Desenvolvedor</Contact>.
          </AlertBox>
        </ContainerAlert>

        {/* Área de exibição dos mapas */}
        <MapSection />
        <Footer />
      </Main>
    </>
  );
}
