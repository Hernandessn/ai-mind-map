// src/pages/Home/index.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  TextStats,
  ErrorMessage
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
  const navigate = useNavigate();
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [pdfText, setPdfText] = useState('');
  const [fileData, setFileData] = useState(null);
  const [topic, setTopic] = useState('');
  const [mapResult, setMapResult] = useState('');
  const [parsedMapData, setParsedMapData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showDebug, setShowDebug] = useState(false);
  const [jsonError, setJsonError] = useState('');

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

  // Função para tentar extrair conteúdo JSON de uma string que pode conter texto extra
  const extractJsonFromString = (str) => {
    try {
      // Tenta analisar diretamente primeiro
      return JSON.parse(str);
    } catch (e) {
      // Tenta encontrar blocos de código JSON
      const jsonPattern = /```(?:json)?\s*(\{[\s\S]*?\}|\[[\s\S]*?\])\s*```/;
      const match = str.match(jsonPattern);
      
      if (match && match[1]) {
        try {
          return JSON.parse(match[1]);
        } catch (e) {
          console.error("Erro ao analisar bloco JSON extraído:", e);
        }
      }
      
      // Última tentativa: procurar por algo que pareça um objeto ou array JSON
      const objectPattern = /(\{[\s\S]*\})/;
      const arrayPattern = /(\[[\s\S]*\])/;
      
      const objMatch = str.match(objectPattern);
      const arrMatch = str.match(arrayPattern);
      
      if (objMatch && objMatch[1]) {
        try {
          return JSON.parse(objMatch[1]);
        } catch (e) {
          console.error("Erro ao analisar objeto JSON extraído:", e);
        }
      }
      
      if (arrMatch && arrMatch[1]) {
        try {
          return JSON.parse(arrMatch[1]);
        } catch (e) {
          console.error("Erro ao analisar array JSON extraído:", e);
        }
      }
    }
    
    return null;
  };

  const handleGenerateMap = async () => {
    setIsLoading(true);
    setParsedMapData(null);
    setJsonError('');
   
    // Verifica qual conteúdo usar: texto do PDF ou tópico digitado
    const finalPrompt = pdfText || topic;

    if (!finalPrompt) {
      setIsLoading(false);
      return alert("Por favor, digite um tema ou carregue um arquivo!");
    }
    
    if (!selectedTemplate) {
      setIsLoading(false);
      return alert("Por favor, selecione um modelo de mapa mental!");
    }

    console.log("Enviando para a API. Tamanho do conteúdo:", finalPrompt.length);

    try {
      // Se o texto for muito grande, pode ser necessário truncá-lo dependendo dos limites da API
      const maxLength = 100000; // Ajuste conforme necessário para a API
      const trimmedPrompt = finalPrompt.length > maxLength
        ? finalPrompt.substring(0, maxLength) + "..."
        : finalPrompt;

      
      console.log(`Prompt final enviado para a API: ${trimmedPrompt.length} caracteres`);

      // Adicionando instruções mais específicas para formatar o mapa mental
      const enhancedPrompt = `
      Você é uma inteligência artificial especialista em geração de mapas mentais. 
      Com base no conteúdo fornecido abaixo, gere um mapa mental no formato JSON conforme o modelo de estrutura selecionado. 
      Retorne **somente o JSON**, sem explicações adicionais e sem comentários fora da estrutura.
      
      ---
      
      🧠 Modelo selecionado: ${selectedTemplate}
      
      📄 Conteúdo base para geração do mapa:
      """
      ${trimmedPrompt}
      """
      
      ---
      
      📌 Instruções por modelo:
      
      🔵 Se o modelo for **Radial**, use esta estrutura:
      {
        "title": "Título Central",
        "nodes": [
          {
            "title": "Categoria 1",
            "subtopics": ["Subtopico A", "Subtopico B", "Subtopico C"]
          },
          {
            "title": "Categoria 2",
            "subtopics": ["Subtopico A", "Subtopico B"]
          }
        ]
      }
      
      🔶 Se o modelo for **Hierárquico**, use esta estrutura:
      {
        "title": "Tema principal",
        "type": "raiz",
        "children": [
          {
            "title": "Nó 1",
            "type": "categoria",
            "children": [
              {
                "title": "Subcategoria A",
                "type": "sub",
                "children": [
                  { "title": "Item 1", "type": "detalhe" },
                  { "title": "Item 2", "type": "detalhe" }
                ]
              }
            ]
          }
        ]
      }
      
      🟢 Se o modelo for **Linear**, use esta estrutura:
      [
        {
          "title": "Etapa 1",
          "description": "Descrição da etapa 1"
        },
        {
          "title": "Etapa 2",
          "description": "Descrição da etapa 2"
        }
      ]
      
      ---
      
      ⚠️ Retorne apenas o JSON **válido e bem formatado** conforme o modelo escolhido, sem texto extra.
      `;
      
     
      const response = await ServicesGemini(enhancedPrompt);
      setMapResult(response);
      
      
      
      // Tentar extrair e analisar o JSON da resposta
      const jsonData = extractJsonFromString(response);
      
      if (jsonData) {
        console.log("JSON analisado com sucesso:", jsonData);
        setParsedMapData(jsonData);
        setJsonError('');
        
        // Navegar para a página de visualização do mapa com os dados
        navigate('/mindmap-view', { 
          state: { 
            mapData: jsonData, 
            templateType: selectedTemplate 
          } 
        });
      } else {
        console.error("Falha ao analisar JSON da resposta");
        setJsonError('Não foi possível processar o resultado como JSON válido. Tente novamente ou ajuste o conteúdo.');
      }
      
      
    } catch (error) {
      console.error("Erro ao gerar mapa:", error);
      alert("Erro ao gerar mapa mental. Tente novamente.");
      
      setJsonError('Ocorreu um erro durante a geração do mapa mental. Tente novamente.');
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
                disabled={isLoading || !selectedTemplate}
              >
                {isLoading ? 'Processando...' : 'Gerar Mapa Mental'}
              </DefaultButton>
            </ButtonContainer>

         
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

        {jsonError && <ErrorMessage>{jsonError}</ErrorMessage>}

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

        {/* Exibição de erro de JSON, se houver */}
        {mapResult && !parsedMapData && jsonError && (
          <div style={{ marginTop: '1rem', background: '#000', padding: '1rem', borderRadius: '8px' }}>
            <h3>Resposta da API (JSON não processado):</h3>
            <p style={{ whiteSpace: 'pre-wrap' }}>{mapResult}</p>
          </div>
        )}

        <MapSection />
        <Footer />
      </Main>
    </>
  );
}