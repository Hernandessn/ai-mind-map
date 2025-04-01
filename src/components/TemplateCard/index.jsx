import { Card, Desc, Image, Info, Name } from "./styles";

// Componente principal de TemplateCards
export const TemplateCards = ({ isSelected, onClick, $img, $name, $Description}) => {
  return (
    <Card
      data-template="radial" 
      className={isSelected ? 'selected' : ''}
      onClick={onClick}
    >
      <Image>
        <img src={$img} alt="Imagem" />
      </Image>
      <Info>
        <Name>{$name}</Name>
        <Desc>
         {$Description}
        </Desc>
      </Info>
    </Card>
  );
};

export default TemplateCards;