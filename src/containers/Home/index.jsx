import { ColorfulButton } from "../../components/ColorfulButton";
import { TemplateCards } from "../../components/TemplateCard";
import { ServicesGemini } from "../../services/testGeminiAPI";
import { ButtonContainer, ContainerComponent, ContainerText, SectionCards, GenerateButton, Header, Input, InputContainer, InputSection, Main, SendImageButton, SubTitle, Title } from "./styles";

import radialImage from '/src/assets/map-radial.png';
import linearImage from '/src/assets/map-linear.png';
import hierarquicoImage from '/src/assets/map-hierarquico.png';
import gradeImage from '/src/assets/map-grade.png';

export function Home() {
 
  
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
          <Input />
        </InputContainer>
        <ButtonContainer>
          <SendImageButton>
          <label class="file-input-label">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="17 8 12 3 7 8"></polyline>
              <line x1="12" y1="3" x2="12" y2="15"></line>
            </svg>
            </label>
            Enviar Imagem</SendImageButton>
          <ColorfulButton $theme={false}> Gerar Mapa Mental</ColorfulButton>
        </ButtonContainer>
      </ContainerComponent>
    </InputSection>
<SectionCards>
  <TemplateCards 
  $img={radialImage}
  $name="Radical"
  $Description="Ideal para brainstorming e organização de ideias a partir de um conceito central, com ramificações em todas as direções." />
  
  <TemplateCards 
  $img={hierarquicoImage} 
  $name="Hierárquico"
  $Description="Perfeito para estruturas organizacionais, planos de projeto ou qualquer conteúdo com níveis claros de subordinação."/>
  
  <TemplateCards 
  $img={linearImage}
  $name="Linear"
  $Description="Ideal para processos sequenciais, linhas do tempo, ou fluxos de trabalho com etapas claras e ordenadas."/>
  
  <TemplateCards 
  $img={gradeImage}
  $name="Grade"
  $Description="Perfeito para comparações, matrizes de decisão ou organização de conceitos em categorias bem definidas."/>

</SectionCards>


   </Main>

    </>
  
  );
}