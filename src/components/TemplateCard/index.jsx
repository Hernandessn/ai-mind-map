import { Card, CardDesc, ImageCard, CardInfo, CardName } from "./styles";

// Componente principal de TemplateCards
export const TemplateCards = ({ isSelected, onClick, $img, $name, $Description}) => {
  return (
    <Card
      data-template="radial" 
      className={isSelected ? 'selected' : ''}
      onClick={onClick}
    >
      <ImageCard>
        <img src={$img} alt="Imagem" />
      </ImageCard>
      <CardInfo>
        <CardName>{$name}</CardName>
        <CardDesc>
         {$Description}
        </CardDesc>
      </CardInfo>
    </Card>
  );
};

export default TemplateCards;