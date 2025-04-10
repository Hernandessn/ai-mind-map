import { useState, useRef } from "react";
import * as pdfjsLib from "pdfjs-dist";
import workerUrl from "pdfjs-dist/build/pdf.worker.min?url";
import {
  ButtonGroup,
  CombinedButton,
  Divider,
  DropdownItem,
  DropdownMenu,
  HiddenInput,
} from "./styles";
import { FilePdf, Image } from "@phosphor-icons/react";

// Configura o worker do pdfjs
pdfjsLib.GlobalWorkerOptions.workerSrc = workerUrl;

export function FileViewer({ onFileSelect }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const pdfInputRef = useRef(null);
  const imageInputRef = useRef(null);

  const extractTextFromPDF = async (pdf) => {
    const totalPages = pdf.numPages;
    console.log(`Extraindo texto de ${totalPages} páginas`);
    
    let fullText = "";

    for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
      try {
        const page = await pdf.getPage(pageNum);
        const textContent = await page.getTextContent();
        
        // Maneira mais eficaz: Usar o SDK getTextContent e preservar estrutura
        let lastY, pageText = '';
        
        for (let item of textContent.items) {
          if (lastY == item.transform[5] || !lastY) {
            pageText += item.str + ' ';
          } else {
            pageText += '\n' + item.str + ' ';
          }
          lastY = item.transform[5]; // Coordenada Y do texto
        }
        
        // Adiciona separadores claros de página
        fullText += `\n----- PÁGINA ${pageNum} -----\n\n${pageText}\n\n`;
        
        console.log(`Página ${pageNum}/${totalPages} processada (${pageText.length} caracteres)`);
        console.log(`Amostra: ${pageText.substring(0, 50)}...`);
        
        if (pageText.length < 10) {
          console.warn(`Atenção: Pouco texto extraído da página ${pageNum}. Pode ser uma imagem ou conteúdo não extraível.`);
        }
      } catch (error) {
        console.error(`Erro ao extrair texto da página ${pageNum}:`, error);
      }
    }

    // Log final com estatísticas
    console.log(`Extração completa: ${fullText.length} caracteres no total`);
    if (fullText.length < 50) {
      console.warn("ATENÇÃO: O texto total extraído é muito pequeno. O PDF pode conter principalmente imagens ou texto não selecionável.");
    }
    
    return fullText;
  };

  const extractTextAlternative = async (pdf) => {
    let altText = "";
    
    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      try {
        const page = await pdf.getPage(pageNum);
        const textContent = await page.getTextContent();
        
        // Método simples: concatenar todos os itens
        const pageText = textContent.items
          .map(item => item.str)
          .join(' ');
          
        altText += `\n----- PÁGINA ${pageNum} -----\n\n${pageText}\n\n`;
      } catch (err) {
        console.error(`Erro no método alternativo, página ${pageNum}:`, err);
      }
    }
    
    return altText;
  };

  const handlePdfChange = async (e) => {
    const file = e.target.files[0];
    if (!file || file.type !== "application/pdf") return;

    try {
      setIsProcessing(true);
      console.log("Iniciando processamento do PDF:", file.name);

      const arrayBuffer = await file.arrayBuffer();
      const typedArray = new Uint8Array(arrayBuffer);
      
      // Configuração para garantir que o PDF seja processado corretamente
      const loadingTask = pdfjsLib.getDocument({
        data: typedArray,
        cMapUrl: 'https://unpkg.com/pdfjs-dist@3.4.120/cmaps/',
        cMapPacked: true,
        standardFontDataUrl: 'https://unpkg.com/pdfjs-dist@3.4.120/standard_fonts/'
      });
      
      const pdf = await loadingTask.promise;
      console.log(`PDF carregado com ${pdf.numPages} páginas`);

      // Gera preview da primeira página
      const firstPage = await pdf.getPage(1);
      const viewport = firstPage.getViewport({ scale: 1 });
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      await firstPage.render({ canvasContext: context, viewport }).promise;
      const dataUrl = canvas.toDataURL();

      // Extrai TODO o texto do PDF
      console.log("Iniciando extração de texto de todas as páginas...");
      let extractedText = await extractTextFromPDF(pdf);
      console.log(`Extração de texto concluída. Total: ${extractedText.length} caracteres`);

      // Se o texto extraído for muito pequeno, tente novamente com outro método
      if (extractedText.length < 100 && pdf.numPages > 1) {
        console.warn("Texto extraído é muito pequeno. Tentando método alternativo...");
        const alternativeText = await extractTextAlternative(pdf);
        
        if (alternativeText.length > extractedText.length) {
          console.log(`Método alternativo obteve mais texto: ${alternativeText.length} caracteres`);
          extractedText = alternativeText;
        }
      }

      if (onFileSelect) {
        const fileObject = {
          type: "pdf",
          preview: dataUrl,
          file,
          text: extractedText, // Texto completo de todas as páginas
          pageCount: pdf.numPages
        };
        
        onFileSelect(fileObject);
      }
    } catch (error) {
      console.error("Erro ao processar PDF:", error);
      alert("Houve um erro ao processar o PDF. Por favor, tente novamente.");
    } finally {
      setIsProcessing(false);
      setIsDropdownOpen(false);
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith("image/")) return;

    const url = URL.createObjectURL(file);

    if (onFileSelect) {
      onFileSelect({
        type: "image",
        preview: url,
        file,
      });
    }

    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    if (!isProcessing) {
      setIsDropdownOpen(!isDropdownOpen);
    }
  };

  return (
    <ButtonGroup>
      <CombinedButton onClick={toggleDropdown} disabled={isProcessing}>
        <FilePdf size={24} />
        <span>{isProcessing ? "Processando..." : "Selecionar Arquivo"}</span>
        <Image size={24} />
      </CombinedButton>

      <DropdownMenu $isOpen={isDropdownOpen}>
        <DropdownItem
          onClick={() => pdfInputRef.current.click()}
          $color="#e74c3c"
        >
          <FilePdf size={20} weight="fill" />
          Selecionar PDF
        </DropdownItem>

        <Divider />

        <DropdownItem
          onClick={() => imageInputRef.current.click()}
          $color="#3498db"
        >
          <Image size={20} weight="fill" />
          Selecionar Imagem
        </DropdownItem>
      </DropdownMenu>

      <HiddenInput
        type="file"
        accept="application/pdf"
        ref={pdfInputRef}
        onChange={handlePdfChange}
      />

      <HiddenInput
        type="file"
        accept="image/*"
        ref={imageInputRef}
        onChange={handleImageChange}
      />
    </ButtonGroup>
  );
}