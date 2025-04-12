import React, { useState } from 'react';
import { TemplateCards } from "../../components/TemplateCard";
import { MapSection } from "../../components/MapSection";
import { DefaultButton } from "../../components/Button";
import { Footer } from "../../components/Footer";

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
  LoadingIndicator,
  ProcessingInfo,
  DebugViewerContainer,
  DebugHeader,
  DebugContent,
  DebugControlButton,
  TextStats
} from "./styles";

import radialImage from '/src/assets/map-radial.png';
import linearImage from '/src/assets/map-linear.png';
import hierarquicoImage from '/src/assets/map-hierarquico.png';

import { ServicesGemini } from '../../services/testGeminiAPI';
import { FileViewer } from '../../components/FileViewer';
import { FilePreview } from '../../components/FilePreview';

// Componente de debug para visualizar o texto extraído
const DebugTextViewer = ({ text, isVisible }) => {
  if (!isVisible || !text) return null;
  
  return (
    <DebugViewerContainer>
      <DebugHeader>Debug: Texto Extraído ({text.length} caracteres)</DebugHeader>
      <DebugContent>
        {text || "Nenhum texto extraído"}
      </DebugContent>
    </DebugViewerContainer>
  );
};

export function Home() {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [pdfText, setPdfText] = useState('');
  const [fileData, setFileData] = useState(null);
  const [topic, setTopic] = useState('');
  const [mapResult, setMapResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showDebug, setShowDebug] = useState(false);
  const [processStatus, setProcessStatus] = useState('');

  const handleFileSelect = async (file) => {
    // Limpa o estado anterior
    setPdfText('');
    setFileData(null);
    
    if (file.text) {
      // Se o texto já foi extraído (pelo componente FileViewer atualizado)
      setFileData(file);
      setPdfText(file.text);
      console.log(`Texto extraído recebido: ${file.text.length} caracteres`);
    } else if (file.type === 'image' || file.type === 'pdf') {
      // Caso antigo (se ainda necessário como fallback)
      setFileData(file);
    }
  };

  const handleCardClick = (template) => {
    setSelectedTemplate(template);
    console.log(`Template ${template} selecionado`);
  };

  const handleGenerateMap = async () => {
    setIsLoading(true);
    setProcessStatus('Preparando conteúdo para processamento...');
    
    // Verifica qual conteúdo usar: texto do PDF ou tópico digitado
    const finalPrompt = pdfText || topic;

    if (!finalPrompt) {
      setIsLoading(false);
      return alert("Por favor, digite um tema ou carregue um arquivo!");
    }

    console.log("Enviando para a API. Tamanho do conteúdo:", finalPrompt.length);
    
    try {
      // Se o texto for muito grande, pode ser necessário truncá-lo dependendo dos limites da API
      const maxLength = 100000; // Ajuste conforme necessário para a API
      const trimmedPrompt = finalPrompt.length > maxLength 
        ? finalPrompt.substring(0, maxLength) + "..." 
        : finalPrompt;
      
      setProcessStatus('Enviando para o Gemini...');
      console.log(`Prompt final enviado para a API: ${trimmedPrompt.length} caracteres`);
      
      // Adicionando instruções mais específicas para formatar o mapa mental
      const enhancedPrompt = `
      Crie um mapa mental organizado baseado no seguinte conteúdo: 
      
      ${trimmedPrompt}
      
      O mapa mental deve:
      1. Identificar o tema principal
      2. Organizar os tópicos em uma estrutura hierárquica clara
      3. Usar formato que facilite a leitura e compreensão
      4. Destacar conceitos-chave e suas relações
      5. Servir como um resumo visual do conteúdo
      
      Use marcadores e indentação para mostrar a estrutura do mapa mental.
      `;
      
      const response = await ServicesGemini(enhancedPrompt);
      setMapResult(response);
      setProcessStatus('');
      console.log("Resposta da IA recebida com sucesso");
    } catch (error) {
      console.error("Erro ao gerar mapa:", error);
      alert("Erro ao gerar mapa mental. Tente novamente.");
      setProcessStatus('');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header>
        <ContainerText>
          <Title>IA de Mapas Mentais</Title>
          <SubTitle>Crie mapas mentais impressionantes com apenas um tema</SubTitle>
        </ContainerText>
      </Header>

      <Main>
        <InputSection>
          <ContainerComponent>
            <InputContainer>
              <Input
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Digite o tema aqui..."
                disabled={isLoading}
              />
            </InputContainer>

            <ButtonContainer>
              <FileViewer onFileSelect={handleFileSelect} />

              <DefaultButton
                onClick={handleGenerateMap}
                $borderColor={false}
                $gradient
                $colorStart={theme.colors.neonBlue}
                $colorEnd={theme.colors.neonPurple}
                disabled={isLoading}
              >
                {isLoading ? 'Processando...' : 'Gerar Mapa Mental'}
              </DefaultButton>
            </ButtonContainer>
            
            {isLoading && processStatus && (
              <ProcessingInfo>
                <LoadingIndicator />
                <span>{processStatus}</span>
              </ProcessingInfo>
            )}
          </ContainerComponent>
        </InputSection>

        {fileData && <FilePreview fileData={fileData} />}

        {pdfText && (
          <TextStats>
            <p>
              {`Texto extraído: ${pdfText.length} caracteres`}
            </p>
            <DebugControlButton onClick={() => setShowDebug(!showDebug)}>
              {showDebug ? 'Ocultar Texto' : 'Mostrar Texto'}
            </DebugControlButton>
          </TextStats>
        )}

        <DebugTextViewer text={pdfText} isVisible={showDebug} />

        {mapResult && (
          <div style={{ marginTop: '1rem', background: '#000', padding: '1rem', borderRadius: '8px' }}>
            <h3>Mapa Mental Gerado:</h3>
            <p style={{ whiteSpace: 'pre-wrap' }}>{mapResult}</p>
          </div>
        )}

        <SectionCards>
          <TemplateCards
            img={radialImage}
            name="Radial"
            Description="Ideal para brainstorming e organização de ideias a partir de um conceito central, com ramificações em todas as direções."
            dataTemplate="radial"
            isSelected={selectedTemplate === "radial"}
            onClick={() => handleCardClick("radial")}
          />

          <TemplateCards
            img={hierarquicoImage}
            name="Hierárquico"
            Description="Perfeito para estruturas organizacionais, planos de projeto ou qualquer conteúdo com níveis claros de subordinação."
            dataTemplate="hierarquico"
            isSelected={selectedTemplate === "hierarquico"}
            onClick={() => handleCardClick("hierarquico")}
          />

          <TemplateCards
            img={linearImage}
            name="Linear"
            Description="Ideal para processos sequenciais, linhas do tempo, ou fluxos de trabalho com etapas claras e ordenadas."
            dataTemplate="linear"
            isSelected={selectedTemplate === "linear"}
            onClick={() => handleCardClick("linear")}
          />

        </SectionCards>

        <MapSection />
        <Footer />
      </Main>
    </>
  );
}