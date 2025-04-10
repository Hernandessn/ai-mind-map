
import { PreviewBox, PreviewImage, PreviewsContainer, PreviewTitle } from "../../components/FilePreview/styles";

export function FilePreview({ fileData }) {
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
      </PreviewBox>
    </PreviewsContainer>
  );
}
