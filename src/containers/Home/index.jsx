
import { TemplateCards } from "../../components/TemplateCard";

import { ButtonContainer, ContainerComponent, ContainerText, SectionCards, GenerateButton, Header, Input, InputContainer, InputSection, Main, SendImageButton, SubTitle, Title } from "./styles";

import radialImage from '/src/assets/map-radial.png';
import linearImage from '/src/assets/map-linear.png';
import hierarquicoImage from '/src/assets/map-hierarquico.png';
import gradeImage from '/src/assets/map-grade.png';
import { MapSection } from "../../components/MapSection";
import { DefaultButton } from "../../components/Button";
import { theme } from "../../styles/theme";
import { Footer } from "../../components/Footer";
import { DownloadSimple } from "@phosphor-icons/react";

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
          <DefaultButton  
          $color={theme.colors.darkBlue}
          style={{ display: "flex", alignItems: "center", gap: "8px" }} $borderColor={true}>
           <DownloadSimple size={32} />
            Enviar Imagem</DefaultButton>
          <DefaultButton $borderColor={false} $gradient $colorStart={theme.colors.neonBlue} $colorEnd={theme.colors.neonPurple}> 
            Gerar Mapa Mental
            </DefaultButton>
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
  <MapSection />
    <Footer />

   </Main>

    </>
  
  );
}