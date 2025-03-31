import { ColorfulButton } from "../../components/ColorfulButton";
import { ServicesGemini } from "../../services/testGeminiAPI";
import { ButtonContainer, ContainerComponent, ContainerText, GenerateButton, Header, Input, InputContainer, InputSection, Main, SendImageButton, SubTitle, Title } from "./styles";


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
   </Main>
    </>
  
  );
}