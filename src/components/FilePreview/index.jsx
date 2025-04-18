import { PreviewBox, PreviewImage, PreviewsContainer, PreviewTitle, RemoveButton } from "./styles";

export function FilePreview({ fileData, onRemove }) {
  if (!fileData) return null;
  
  return (
    <PreviewsContainer>
      <PreviewBox>
        <PreviewTitle>
          {fileData.type === 'pdf' ? 'PDF (Página 1)' : 'Imagem'}
        </PreviewTitle>
        <PreviewImage 
          src={fileData.preview} 
          alt={fileData.type === 'pdf' ? 'PDF Preview' : 'Imagem Selecionada'} 
        />
        <RemoveButton onClick={onRemove}>
          Remover Arquivo
        </RemoveButton>
      </PreviewBox>
    </PreviewsContainer>
  );
}
