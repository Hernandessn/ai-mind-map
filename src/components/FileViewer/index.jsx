import { useState, useRef } from "react";
import * as pdfjsLib from "pdfjs-dist";
import workerUrl from "pdfjs-dist/build/pdf.worker.min?url";
import Tesseract from 'tesseract.js';
import {
  ButtonGroup,
  CombinedButton,
  Divider,
  DropdownItem,
  DropdownMenu,
  HiddenInput,
  ProgressBar,
  ProgressContainer,
  ProgressText
} from "./styles";
import { FilePdf, Image } from "@phosphor-icons/react";

// Configura o worker do pdfjs
pdfjsLib.GlobalWorkerOptions.workerSrc = workerUrl;

export function FileViewer({ onFileSelect }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStatus, setProcessingStatus] = useState("");
  const [ocrProgress, setOcrProgress] = useState(0);

  const pdfInputRef = useRef(null);
  const imageInputRef = useRef(null);

  const isPdfBasedOnImage = async (pdf) => {
    try {
      // Extraia texto da primeira página
      const page = await pdf.getPage(1);
      const textContent = await page.getTextContent();
      const pageText = textContent.items.map(item => item.str).join('');
      
      // Verifique se há operadores de imagem na página
      const operatorList = await page.getOperatorList();
      const hasImageOperators = operatorList.fnArray.some(op => 
        op === pdfjsLib.OPS.paintImageXObject || 
        op === pdfjsLib.OPS.paintJpegXObject
      );
      
      console.log(`Verificação de PDF baseado em imagem:
        - Texto encontrado: ${pageText.length} caracteres
        - Operadores de imagem encontrados: ${hasImageOperators}
      `);
      
      // Se tiver pouco ou nenhum texto E tiver operadores de imagem, provavelmente é baseado em imagem
      return pageText.length < 50 && hasImageOperators;
    } catch (error) {
      console.error("Erro ao verificar se o PDF é baseado em imagem:", error);
      return false;
    }
  };

  const extractTextFromPDF = async (pdf) => {
    const totalPages = pdf.numPages;
    console.log(`Extraindo texto de ${totalPages} páginas`);
    
    let fullText = "";

    for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
      try {
        setProcessingStatus(`Extraindo texto da página ${pageNum}/${totalPages}`);
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
        setProcessingStatus(`Tentando método alternativo: página ${pageNum}/${pdf.numPages}`);
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

  const applyOCRtoPDF = async (pdf) => {
    setProcessingStatus("Iniciando OCR nas páginas do PDF...");
    let fullOcrText = "";
    
    // Verificação se Tesseract está disponível
    if (!Tesseract) {
      console.error("Tesseract não está disponível!");
      setProcessingStatus("Erro: biblioteca OCR não encontrada");
      return "";
    }
    
    console.log("Tesseract disponível, iniciando OCR...");
    
    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      try {
        setProcessingStatus(`Aplicando OCR na página ${pageNum}/${pdf.numPages}`);
        const page = await pdf.getPage(pageNum);
        const viewport = page.getViewport({ scale: 2.0 }); // Escala maior para melhor qualidade OCR
        
        // Renderiza a página em um canvas
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        
        await page.render({ 
          canvasContext: context, 
          viewport,
          // Otimizações para melhorar a qualidade da imagem para OCR
          intent: 'print',
          renderInteractiveForms: false,
        }).promise;
        
        const dataUrl = canvas.toDataURL("image/png", 1.0);
        console.log(`Página ${pageNum} renderizada em canvas com dimensões ${canvas.width}x${canvas.height}`);
        
        // Converte dataURL para blob
        const response = await fetch(dataUrl);
        const blob = await response.blob();
        console.log(`Blob criado com tamanho ${blob.size} bytes`);
        
        // Aplica OCR na imagem gerada com configurações otimizadas
        console.log(`Iniciando OCR para página ${pageNum}...`);
        const result = await Tesseract.recognize(blob, 'por', {
          logger: m => {
            console.log(`OCR progresso:`, m);
            if (m.status === 'recognizing text' && m.progress) {
              setOcrProgress(Math.round(m.progress * 100));
            }
          },
          // Configurações otimizadas para melhorar a detecção
          tessedit_char_whitelist: '',  // Sem restrição de caracteres
          tessedit_pageseg_mode: '1',   // Modo de segmentação automática
        });
        
        const pageOcrText = result.data.text;
        console.log(`OCR concluído para página ${pageNum}: ${pageOcrText.length} caracteres extraídos`);
        console.log(`Amostra do texto: ${pageOcrText.substring(0, 50)}...`);
        
        fullOcrText += `\n----- PÁGINA ${pageNum} (OCR) -----\n\n${pageOcrText}\n\n`;
        
      } catch (error) {
        console.error(`Erro ao aplicar OCR na página ${pageNum}:`, error);
        setProcessingStatus(`Erro no OCR da página ${pageNum}: ${error.message}`);
      }
    }
    
    console.log(`OCR completo: ${fullOcrText.length} caracteres extraídos no total`);
    return fullOcrText;
  };

  const handlePdfChange = async (e) => {
    const file = e.target.files[0];
    if (!file || file.type !== "application/pdf") return;

    try {
      setIsProcessing(true);
      setOcrProgress(0);
      setProcessingStatus("Iniciando processamento do PDF...");
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

      // Verifica se o PDF é baseado em imagem
      const isImageBased = await isPdfBasedOnImage(pdf);
      console.log(`PDF é baseado em imagem? ${isImageBased ? 'SIM' : 'NÃO'}`);

      // Extrai TODO o texto do PDF
      setProcessingStatus("Extraindo texto de todas as páginas...");
      console.log("Iniciando extração de texto de todas as páginas...");
      let extractedText = await extractTextFromPDF(pdf);
      console.log(`Extração de texto concluída. Total: ${extractedText.length} caracteres`);

      // Se o texto extraído for muito pequeno ou o PDF for baseado em imagem, tente novamente com outro método
      if (extractedText.length < 100 || isImageBased) {
        console.warn("Texto extraído é muito pequeno ou PDF baseado em imagem. Tentando método alternativo...");
        const alternativeText = await extractTextAlternative(pdf);
        
        if (alternativeText.length > extractedText.length) {
          console.log(`Método alternativo obteve mais texto: ${alternativeText.length} caracteres`);
          extractedText = alternativeText;
        }
        
        // Se ainda assim o texto for muito pequeno, ou se for confirmado que é baseado em imagem, aplique OCR
        if (extractedText.length < 100 || isImageBased) {
          console.warn("PDF parece ser baseado em imagem. Aplicando OCR...");
          setProcessingStatus("PDF baseado em imagem detectado. Aplicando OCR...");
          
          try {
            const ocrText = await applyOCRtoPDF(pdf);
            
            if (ocrText && ocrText.length > 0) {
              console.log(`OCR obteve texto: ${ocrText.length} caracteres`);
              // Se o OCR encontrou texto, substitua o texto extraído
              extractedText = ocrText;
            } else {
              console.warn("OCR não retornou texto");
            }
          } catch (ocrError) {
            console.error("Erro durante o OCR:", ocrError);
          }
        }
      }

      if (onFileSelect) {
        const fileObject = {
          type: "pdf",
          preview: dataUrl,
          file,
          text: extractedText, // Texto completo de todas as páginas
          pageCount: pdf.numPages,
          isImageBased: isImageBased
        };
        
        onFileSelect(fileObject);
      }
    } catch (error) {
      console.error("Erro ao processar PDF:", error);
      alert("Houve um erro ao processar o PDF. Por favor, tente novamente.");
    } finally {
      setIsProcessing(false);
      setProcessingStatus("");
      setOcrProgress(0);
      setIsDropdownOpen(false);
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith("image/")) return;
    
    try {
      setIsProcessing(true);
      setProcessingStatus("Carregando imagem...");
      const url = URL.createObjectURL(file);
      
      // Aplica OCR na imagem
      setProcessingStatus("Aplicando OCR na imagem...");
      console.log("Iniciando OCR na imagem:", file.name);
      
      const { data: { text } } = await Tesseract.recognize(file, 'por', {
        logger: m => {
          console.log(m);
          if (m.status === 'recognizing text' && m.progress) {
            setOcrProgress(Math.round(m.progress * 100));
          }
        }
      });
      
      console.log(`OCR concluído. Total: ${text.length} caracteres`);
      
      if (onFileSelect) {
        onFileSelect({
          type: "image",
          preview: url,
          file,
          text: text // Texto extraído pelo OCR
        });
      }
    } catch (error) {
      console.error("Erro ao processar imagem:", error);
      alert("Houve um erro ao processar a imagem. Por favor, tente novamente.");
    } finally {
      setIsProcessing(false);
      setProcessingStatus("");
      setOcrProgress(0);
      setIsDropdownOpen(false);
    }
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

      {isProcessing && (
        <ProgressContainer>
          <ProgressText>{processingStatus}</ProgressText>
          {ocrProgress > 0 && (
            <>
              <ProgressBar value={ocrProgress} max="100" />
              <ProgressText>{ocrProgress}%</ProgressText>
            </>
          )}
        </ProgressContainer>
      )}

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