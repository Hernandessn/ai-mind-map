import { Info } from "@phosphor-icons/react";
import { Container, MapContainer, MapPlaceholder, MapSectionContainer, MindMap, PlaceholderIcon, PlaceholderText } from "./styles";


export const MapSection = ({ showPlaceholder = true }) => {
    return (
      <MapSectionContainer>
        <Container>
          <MapContainer>
            {showPlaceholder ? (
              <MapPlaceholder>
                <PlaceholderIcon>
                 <Info size={32}/>
                </PlaceholderIcon>
                <PlaceholderText>
                  Insira um tema acima e clique em "Gerar Mapa Mental" para visualizar o resultado
                </PlaceholderText>
              </MapPlaceholder>
            ) : (
              <MindMap>
                {/* O mapa mental será gerado dinamicamente aqui */}
              </MindMap>
            )}
          </MapContainer>
        </Container>
      </MapSectionContainer>
    );
  };