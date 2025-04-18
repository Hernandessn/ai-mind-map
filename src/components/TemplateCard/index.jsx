import React, { useState, useEffect } from 'react';
import { Card, CardDesc, ImageCard, CardInfo, CardName } from "./styles";

// Componente individual de TemplateCard
export const TemplateCards = ({ isSelected, onClick, img, name, Description, dataTemplate }) => {
  return (
    <Card
      data-template={dataTemplate}
      className={isSelected ? 'selected' : ''}	
      onClick={onClick}
    >
      <ImageCard>
        <img src={img} alt={`Imagem do modelo ${name}`} />
      </ImageCard>
      <CardInfo>
        <CardName>{name}</CardName>
        <CardDesc>
          {Description}
        </CardDesc>
      </CardInfo>
    </Card>
  );
};
