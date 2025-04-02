
import {TwitterLogo, InstagramLogo, LinkedinLogo, Copyright } from "@phosphor-icons/react";
import { AboutButton, ButtonIcon, ButtonText, Container, FooterContainer, FooterContent, FooterDescription, SocialLink, SocialLinks } from './styles';

// Componente React do Rodapé
export const Footer = () => {
    const handleAboutClick = () => {
      // Implementação da função ClickAboutButton
      console.log("Botão Sobre clicado");
      // Adicione aqui a lógica desejada
    };
  
    return (
      <FooterContainer>
        <Container className="footer-container">
          <FooterContent>
            <FooterDescription>
              Crie mapas mentais de forma automática com IA.
            </FooterDescription>
            
            <AboutButton onClick={handleAboutClick} id="aboutBtn">
              <ButtonText>Sobre</ButtonText>
              <ButtonIcon>
                
              </ButtonIcon>
            </AboutButton>
            
            <SocialLinks>
              <SocialLink href="#" aria-label="LinkedIn">
               <LinkedinLogo size={32} />
              </SocialLink>
              <SocialLink href="#" aria-label="Twitter">
              <TwitterLogo size={32} />
              </SocialLink>
              <SocialLink href="#" aria-label="Instagram">
                <InstagramLogo size={32} />
              </SocialLink>
            </SocialLinks>
          </FooterContent>
          
        
            <p>  <Copyright size={32} /> 2025 IA de Mapas Mentais | Todos os direitos reservados</p>
        </Container>
      </FooterContainer>
    );
  };
  
  