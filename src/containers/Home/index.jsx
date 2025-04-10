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
  Title
} from "./styles";

import radialImage from '/src/assets/map-radial.png';
import linearImage from '/src/assets/map-linear.png';
import hierarquicoImage from '/src/assets/map-hierarquico.png';
import gradeImage from '/src/assets/map-grade.png';

import { ServicesGemini } from '../../services/testGeminiAPI';
import { FileViewer } from '../../components/FileViewer';
import { FilePreview } from '../../components/FilePreview';

import Tesseract from 'tesseract.js';

// Componente de debug para visualizar o texto extraído
const DebugTextViewer = ({ text, isVisible }) => {
  if (!isVisible || !text) return null;
  
  return (
    <div style={{ 
      margin: '1rem 0', 
      padding: '1rem', 
      background: '#f8f9fa', 
      border: '1px solid #dee2e6',
      borderRadius: '4px',
      maxHeight: '300px',
      overflow: 'auto'
    }}>
      <h4>Debug: Texto Extraído ({text.length} caracteres)</h4>
      <pre style={{ 
        whiteSpace: 'pre-wrap', 
        fontSize: '12px',
        fontFamily: 'monospace',
        color: '#212529'
      }}>
        {text || "Nenhum texto extraído"}
      </pre>
    </div>
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

  const handleFileSelect = async (file) => {
    // Limpa o estado anterior
    setPdfText('');
    setFileData(null);
    
    if (file.type === 'image') {
      try {
        setIsLoading(true);
        const { data: { text } } = await Tesseract.recognize(file.file, 'eng', {
          logger: m => console.log(m)
        });

        setFileData({ ...file, text });
        setPdfText(text);
      } catch (error) {
        console.error("Erro ao processar imagem:", error);
        alert("Erro ao extrair texto da imagem. Tente novamente.");
      } finally {
        setIsLoading(false);
      }
    } else if (file.type === 'pdf' && file.text) {
      // Tratamento específico para PDFs
      console.log("Texto extraído do PDF:", file.text.substring(0, 100) + "...");
      console.log("Tamanho total do texto:", file.text.length, "caracteres");
      
      setFileData(file);
      setPdfText(file.text); // Garante que o texto completo é salvo
    }
  };

  const handleCardClick = (template) => {
    setSelectedTemplate(template);
    console.log(`Template ${template} selecionado`);
  };

  const handleGenerateMap = async () => {
    setIsLoading(true);
    
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
      
      console.log(`Prompt final enviado para a API: ${trimmedPrompt.length} caracteres`);
      const response = await ServicesGemini(trimmedPrompt);
      setMapResult(response);
      console.log("Resposta da IA recebida com sucesso");
    } catch (error) {
      console.error("Erro ao gerar mapa:", error);
      alert("Erro ao gerar mapa mental. Tente novamente.");
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
          </ContainerComponent>
        </InputSection>

        {fileData && <FilePreview fileData={fileData} />}

        {pdfText && (
          <div style={{ margin: '1rem 0', padding: '0.5rem', background: '#f1f1f1', borderRadius: '4px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <p style={{ fontSize: '14px', color: '#333', margin: 0 }}>
              {`Texto extraído: ${pdfText.length} caracteres`}
            </p>
            <button 
              onClick={() => setShowDebug(!showDebug)}
              style={{
                background: 'transparent',
                border: '1px solid #ccc',
                borderRadius: '4px',
                padding: '4px 8px',
                fontSize: '12px',
                cursor: 'pointer'
              }}
            >
              {showDebug ? 'Ocultar Texto' : 'Mostrar Texto'}
            </button>
          </div>
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

          <TemplateCards
            img={gradeImage}
            name="Grade"
            Description="Perfeito para comparações, matrizes de decisão ou organização de conceitos em categorias bem definidas."
            dataTemplate="grade"
            isSelected={selectedTemplate === "grade"}
            onClick={() => handleCardClick("grade")}
          />
        </SectionCards>

        <MapSection />
        <Footer />
      </Main>
    </>
  );
}