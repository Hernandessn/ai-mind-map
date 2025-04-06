import React, { useState } from 'react';
import { TemplateCards } from "../../components/TemplateCard";
import { MapSection } from "../../components/MapSection";
import { DefaultButton } from "../../components/Button";
import { Footer } from "../../components/Footer";
import { DownloadSimple } from "@phosphor-icons/react";
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

export function Home() {
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const handleCardClick = (template) => {
    setSelectedTemplate(template);
    console.log(`Template ${template} selecionado`);
  };

  // Estado para armazenar o texto do tema
  const [topic, setTopic] = useState('');

  // Estado para guardar as respostas
  const [mapResult, setMapResult] = useState('')

  const handleGenerateMap = async () => {
    if(!topic) return alert("Porfavor digite um tema!");

    const response = await ServicesGemini(topic);
    setMapResult(response);
    console.log("Resposta da IA", response);
    
    
  }

 
  
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
              onChange={(e)=> setTopic(e.target.value)}
              />
            </InputContainer>
            <ButtonContainer>
              <DefaultButton  
                $color={theme.colors.darkBlue}
                style={{ display: "flex", alignItems: "center", gap: "8px" }} 
                $borderColor={true}
              >
                <DownloadSimple size={32} />
                Enviar Imagem
              </DefaultButton>
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
        {mapResult && (
  <div style={{
    background: '#1e1e2f',
    color: '#fff',
    padding: '16px',
    borderRadius: '8px',
    margin: '20px',
    maxHeight: '300px',
    overflowY: 'auto',
    whiteSpace: 'pre-line'
  }}>
    {mapResult}
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