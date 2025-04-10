import { useState, useRef } from "react";
import * as pdfjsLib from "pdfjs-dist";
import workerUrl from "pdfjs-dist/build/pdf.worker.min?url";
import Tesseract from "tesseract.js";

import {
  ButtonGroup,
  CombinedButton,
  Divider,
  DropdownItem,
  DropdownMenu,
  HiddenInput,
} from "./styles";
import { FilePdf, Image } from "@phosphor-icons/react";

pdfjsLib.GlobalWorkerOptions.workerSrc = workerUrl;

export function FileViewer({ onFileSelect }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const pdfInputRef = useRef(null);
  const imageInputRef = useRef(null);

  const handlePdfChange = async (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      const reader = new FileReader();
      reader.onload = async () => {
        const typedArray = new Uint8Array(reader.result);
        const pdf = await pdfjsLib.getDocument(typedArray).promise;

        const firstPage = await pdf.getPage(1);
        const viewport = firstPage.getViewport({ scale: 1 });
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        await firstPage.render({ canvasContext: context, viewport }).promise;
        const dataUrl = canvas.toDataURL();

        let fullText = "";
        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
          const page = await pdf.getPage(pageNum);
          const textContent = await page.getTextContent();
          const pageText = textContent.items.map((item) => item.str).join(" ");
          fullText += pageText + "\n\n";
        }

        if (onFileSelect) {
          onFileSelect({
            type: 'pdf',
            preview: dataUrl,
            file: file,
            text: fullText
          });
        }
      };
      reader.readAsArrayBuffer(file);
    }
    setIsDropdownOpen(false);
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const url = URL.createObjectURL(file);

      // Faz OCR com tesseract
      const { data: { text } } = await Tesseract.recognize(url, "eng", {
        logger: (m) => console.log(m), // Opcional: log do progresso
      });

      if (onFileSelect) {
        onFileSelect({
          type: 'image',
          preview: url,
          file: file,
          text: text // Texto extraído
        });
      }
    }
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <ButtonGroup>
      <CombinedButton onClick={toggleDropdown}>
        <FilePdf size={24} />
        <span>Selecionar Arquivo</span>
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
