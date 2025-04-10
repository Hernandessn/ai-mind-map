import React, { useState } from 'react';
import { TemplateCards } from "../../components/TemplateCard";
import { MapSection } from "../../components/MapSection";
import { DefaultButton } from "../../components/Button";
import { Footer } from "../../components/Footer";

import { theme } from "../../styles/theme"

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

export function Home() {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [pdfText, setPdfText] = useState('');


  const [fileData, setFileData] = useState(null);



  const handleFileSelect = async (file) => {
    if (file.type.startsWith('image/')) {
      const { data: { text } } = await Tesseract.recognize(file, 'eng', {
        logger: m => console.log(m) // Log de progresso
      });
  
      setFileData({ ...file, text });  // Aqui você adiciona o texto extraído à imagem
      setPdfText(text); // Também preenche no campo para enviar ao Gemini
    } else if (file.text) {
      setFileData(file);
      setPdfText(file.text);
    }
  };
  


  const handleCardClick = (template) => {
    setSelectedTemplate(template);
    console.log(`Template ${template} selecionado`);
  };

  // Estado para armazenar o texto do tema
  const [topic, setTopic] = useState('');

  // Estado para guardar as respostas
  const [mapResult, setMapResult] = useState('')

  const handleGenerateMap = async () => {
    const finalPrompt = pdfText || topic;

    if (!finalPrompt) return alert("Por favor, digite um tema ou carregue um PDF!");

    try {
      const response = await ServicesGemini(finalPrompt);
      setMapResult(response);
      console.log("Resposta da IA:", response);
    } catch (error) {
      console.error("Erro ao gerar mapa:", error);
      alert("Erro ao gerar mapa mental. Tente novamente.");
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
        <InputSection className="input-section">
          <ContainerComponent>
            <InputContainer>
              <Input
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
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
              >
                Gerar Mapa Mental
              </DefaultButton>
            </ButtonContainer>
          </ContainerComponent>
        </InputSection>
        
        {fileData && <FilePreview fileData={fileData} />}
        {mapResult && (
          <div style={{ marginTop: '1rem', background: '#000000', padding: '1rem', borderRadius: '8px' }}>
            <h3>Mapa Mental Gerado:</h3>
            <p style={{ whiteSpace: 'pre-wrap' }}>{mapResult}</p>
          </div>
        )}

        <SectionCards>
          <TemplateCards
            img={radialImage}
            name="Radical"
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
            onClick={() => handleCardClick("grade", console.log("Grade"))}
          />
        </SectionCards>


        <MapSection />
        <Footer />
      </Main>
    </>
  );
}