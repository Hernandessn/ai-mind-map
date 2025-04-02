import {PageContainer, Header,Title, Subtitle, Section, SectionTitle,
    Paragraph, TeamGrid, TeamMember, Avatar, AvatarImage, MemberName,
    MemberPosition, MemberBio, InfoGrid, InfoCard, CardTitle, Timeline,
    TimelineItem, TimelineContent, TimelineDate, Contact, ContactLink

  } from './styles';
// Component
export const AboutPage = () => {
    return (
      <PageContainer>
        <Header>
          <Title>Sobre Nossa Empresa</Title>
          <Subtitle>Somos uma empresa inovadora focada em criar soluções tecnológicas que transformam o mundo e melhoram a vida das pessoas.</Subtitle>
        </Header>
        
        <Section>
          <SectionTitle>Nossa Missão</SectionTitle>
          <Paragraph>
            Nossa missão é desenvolver tecnologias inovadoras que resolvam problemas reais e criem um impacto positivo na sociedade. Acreditamos que a tecnologia deve ser acessível a todos e trabalhar para o bem comum.
          </Paragraph>
          <Paragraph>
            Com um compromisso inabalável com a qualidade e a satisfação do cliente, buscamos constantemente aprimorar nossos produtos e serviços para atender às necessidades em evolução do mercado global.
          </Paragraph>
        </Section>
        
        <Section>
          <SectionTitle>Nossa História</SectionTitle>
          <Timeline>
            <TimelineItem position="left">
              <TimelineContent position="left">
                <TimelineDate>2018</TimelineDate>
                <p>Fundação da empresa por um grupo de empreendedores visionários com o objetivo de revolucionar o mercado de tecnologia.</p>
              </TimelineContent>
            </TimelineItem>
            
            <TimelineItem position="right">
              <TimelineContent position="right">
                <TimelineDate>2019</TimelineDate>
                <p>Lançamento do nosso primeiro produto principal, recebendo reconhecimento imediato do setor e conquistando nossos primeiros 100 clientes.</p>
              </TimelineContent>
            </TimelineItem>
            
            <TimelineItem position="left">
              <TimelineContent position="left">
                <TimelineDate>2021</TimelineDate>
                <p>Expansão para novos mercados internacionais e crescimento da equipe para mais de 50 colaboradores talentosos.</p>
              </TimelineContent>
            </TimelineItem>
            
            <TimelineItem position="right">
              <TimelineContent position="right">
                <TimelineDate>2023</TimelineDate>
                <p>Recebimento de importante investimento para acelerar o desenvolvimento de produtos inovadores e expandir nossa presença global.</p>
              </TimelineContent>
            </TimelineItem>
            
            <TimelineItem position="left">
              <TimelineContent position="left">
                <TimelineDate>Hoje</TimelineDate>
                <p>Continuamos a inovar e expandir nosso portfólio de produtos, mantendo nosso compromisso com a excelência e a satisfação do cliente.</p>
              </TimelineContent>
            </TimelineItem>
          </Timeline>
        </Section>
        
        <Section>
          <SectionTitle>Nossos Valores</SectionTitle>
          <InfoGrid>
            <InfoCard>
              <CardTitle>Inovação</CardTitle>
              <p>Estamos constantemente buscando novas ideias e abordagens para resolver problemas complexos. A inovação está no coração de tudo o que fazemos.</p>
            </InfoCard>
            
            <InfoCard>
              <CardTitle>Integridade</CardTitle>
              <p>Mantemos os mais altos padrões éticos em todas as nossas interações. A confiança é a base de nossos relacionamentos com clientes e parceiros.</p>
            </InfoCard>
            
            <InfoCard>
              <CardTitle>Colaboração</CardTitle>
              <p>Acreditamos que as melhores soluções surgem da colaboração. Valorizamos diferentes perspectivas e trabalhamos juntos para alcançar objetivos comuns.</p>
            </InfoCard>
            
            <InfoCard>
              <CardTitle>Impacto</CardTitle>
              <p>Medimos nosso sucesso pelo impacto positivo que geramos. Buscamos não apenas crescer como empresa, mas também contribuir para um mundo melhor.</p>
            </InfoCard>
          </InfoGrid>
        </Section>
        
        <Section>
          <SectionTitle>Nossa Equipe</SectionTitle>
          <Paragraph>
            Nossa equipe é composta por profissionais talentosos e apaixonados, comprometidos com a excelência e a inovação. Cada membro traz habilidades únicas e perspectivas diversas que enriquecem nosso trabalho.
          </Paragraph>
          
          <TeamGrid>
            <TeamMember>
              <Avatar>
                <AvatarImage src="/api/placeholder/150/150" alt="Ana Silva" />
              </Avatar>
              <MemberName>Ana Silva</MemberName>
              <MemberPosition>CEO & Fundadora</MemberPosition>
              <MemberBio>Com mais de 15 anos de experiência em tecnologia, Ana lidera nossa visão estratégica e crescimento.</MemberBio>
            </TeamMember>
            
            <TeamMember>
              <Avatar>
                <AvatarImage src="/api/placeholder/150/150" alt="Marcos Santos" />
              </Avatar>
              <MemberName>Marcos Santos</MemberName>
              <MemberPosition>CTO</MemberPosition>
              <MemberBio>Especialista em desenvolvimento de software e arquitetura de sistemas, Marcos lidera nossa equipe técnica.</MemberBio>
            </TeamMember>
            
            <TeamMember>
              <Avatar>
                <AvatarImage src="/api/placeholder/150/150" alt="Juliana Costa" />
              </Avatar>
              <MemberName>Juliana Costa</MemberName>
              <MemberPosition>Diretora de Design</MemberPosition>
              <MemberBio>Com um olhar aguçado para UX/UI, Juliana garante que nossos produtos sejam intuitivos e agradáveis.</MemberBio>
            </TeamMember>
            
            <TeamMember>
              <Avatar>
                <AvatarImage src="/api/placeholder/150/150" alt="Ricardo Oliveira" />
              </Avatar>
              <MemberName>Ricardo Oliveira</MemberName>
              <MemberPosition>Diretor de Marketing</MemberPosition>
              <MemberBio>Ricardo é responsável por amplificar nossa mensagem e construir conexões com nossos clientes.</MemberBio>
            </TeamMember>
          </TeamGrid>
        </Section>
        
        <Contact>
          <SectionTitle style={{ textAlign: 'center' }}>Entre em Contato</SectionTitle>
          <Paragraph style={{ textAlign: 'center' }}>
            Estamos sempre interessados em ouvir de potenciais clientes, parceiros ou talentos interessados em se juntar à nossa equipe.
          </Paragraph>
          <ContactLink href="#contact">Fale Conosco</ContactLink>
          <ContactLink href="#careers">Carreiras</ContactLink>
        </Contact>
      </PageContainer>
    );
  };
  