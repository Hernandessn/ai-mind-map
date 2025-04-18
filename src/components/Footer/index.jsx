
import { TwitterLogo, InstagramLogo, LinkedinLogo, Copyright } from "@phosphor-icons/react";
import { Container, FooterContainer, FooterContent, FooterDescription, SocialLink, SocialLinks } from './styles';

import { DefaultButton } from "../../components/Button";
import { theme } from "../../styles/theme";
// Componente React do Rodapé
export const Footer = () => {
  const handleAboutClick = () => {
    // Implementação da função ClickAboutButton
    // Adicione aqui a lógica desejada
  };

  return (
    <FooterContainer>
      <Container className="footer-container">
        <FooterContent>
          <FooterDescription>
            Crie mapas mentais de forma automática com IA.
          </FooterDescription>


          <DefaultButton
            onClick={handleAboutClick}
            $borderColor={true}
            $gradient={theme.colors.darkBlue}
            $colorStart={theme.colors.darkBlue}
            $colorEnd={theme.colors.darkBlue}        >
            Sobre
          </DefaultButton>


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

