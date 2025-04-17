import { useState, useRef, useEffect } from "react";
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

export function FileViewer({ onFileSelect, resetTrigger }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStatus, setProcessingStatus] = useState("");
  const [ocrProgress, setOcrProgress] = useState(0);

  const pdfInputRef = useRef(null);
  const imageInputRef = useRef(null);

  // Reseta os inputs quando resetTrigger muda
  useEffect(() => {
    if (pdfInputRef.current) pdfInputRef.current.value = '';
    if (imageInputRef.current) imageInputRef.current.value = '';
  }, [resetTrigger]);

  const isPdfBasedOnImage = async (pdf) => {
    try {
      const page = await pdf.getPage(1);
      const textContent = await page.getTextContent();
      const pageText = textContent.items.map(item => item.str).join('');
      
      const operatorList = await page.getOperatorList();
      const hasImageOperators = operatorList.fnArray.some(op => 
        op === pdfjsLib.OPS.paintImageXObject || 
        op === pdfjsLib.OPS.paintJpegXObject
      );
      
      return pageText.length < 50 && hasImageOperators;
    } catch (error) {
      console.error("Erro ao verificar se o PDF é baseado em imagem:", error);
      return false;
    }
  };

  const extractTextFromPDF = async (pdf) => {
    const totalPages = pdf.numPages;
    let fullText = "";

    for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
      try {
        setProcessingStatus(`Extraindo texto da página ${pageNum}/${totalPages}`);
        const page = await pdf.getPage(pageNum);
        const textContent = await page.getTextContent();
        
        let lastY, pageText = '';
        
        for (let item of textContent.items) {
          if (lastY == item.transform[5] || !lastY) {
            pageText += item.str + ' ';
          } else {
            pageText += '\n' + item.str + ' ';
          }
          lastY = item.transform[5];
        }
        
        fullText += `\n----- PÁGINA ${pageNum} -----\n\n${pageText}\n\n`;
      } catch (error) {
        console.error(`Erro ao extrair texto da página ${pageNum}:`, error);
      }
    }

    return fullText;
  };

  const applyOCRtoPDF = async (pdf) => {
    setProcessingStatus("Iniciando OCR nas páginas do PDF...");
    let fullOcrText = "";
    
    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      try {
        setProcessingStatus(`Aplicando OCR na página ${pageNum}/${pdf.numPages}`);
        const page = await pdf.getPage(pageNum);
        const viewport = page.getViewport({ scale: 2.0 });
        
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        
        await page.render({ 
          canvasContext: context, 
          viewport,
          intent: 'print',
          renderInteractiveForms: false,
        }).promise;
        
        const dataUrl = canvas.toDataURL("image/png", 1.0);
        const response = await fetch(dataUrl);
        const blob = await response.blob();
        
        const result = await Tesseract.recognize(blob, 'por', {
          logger: m => {
            if (m.status === 'recognizing text' && m.progress) {
              setOcrProgress(Math.round(m.progress * 100));
            }
          },
          tessedit_pageseg_mode: '1',
        });
        
        fullOcrText += `\n----- PÁGINA ${pageNum} (OCR) -----\n\n${result.data.text}\n\n`;
      } catch (error) {
        console.error(`Erro ao aplicar OCR na página ${pageNum}:`, error);
        setProcessingStatus(`Erro no OCR da página ${pageNum}: ${error.message}`);
      }
    }
    
    return fullOcrText;
  };

  const handlePdfChange = async (e) => {
    const file = e.target.files[0];
    if (!file || file.type !== "application/pdf") return;

    try {
      setIsProcessing(true);
      setOcrProgress(0);
      setProcessingStatus("Iniciando processamento do PDF...");

      const arrayBuffer = await file.arrayBuffer();
      const typedArray = new Uint8Array(arrayBuffer);
      
      const loadingTask = pdfjsLib.getDocument({
        data: typedArray,
        cMapUrl: 'https://unpkg.com/pdfjs-dist@3.4.120/cmaps/',
        cMapPacked: true,
      });
      
      const pdf = await loadingTask.promise;

      // Gera preview da primeira página
      const firstPage = await pdf.getPage(1);
      const viewport = firstPage.getViewport({ scale: 1 });
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      await firstPage.render({ canvasContext: context, viewport }).promise;
      const dataUrl = canvas.toDataURL();

      const isImageBased = await isPdfBasedOnImage(pdf);
      let extractedText = await extractTextFromPDF(pdf);

      if (extractedText.length < 100 || isImageBased) {
        const ocrText = await applyOCRtoPDF(pdf);
        if (ocrText && ocrText.length > 0) {
          extractedText = ocrText;
        }
      }

      if (onFileSelect) {
        onFileSelect({
          type: "pdf",
          preview: dataUrl,
          file,
          text: extractedText,
          pageCount: pdf.numPages,
          isImageBased: isImageBased
        });
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
      
      setProcessingStatus("Aplicando OCR na imagem...");
      
      const { data: { text } } = await Tesseract.recognize(file, 'por', {
        logger: m => {
          if (m.status === 'recognizing text' && m.progress) {
            setOcrProgress(Math.round(m.progress * 100));
          }
        }
      });
      
      if (onFileSelect) {
        onFileSelect({
          type: "image",
          preview: url,
          file,
          text: text
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