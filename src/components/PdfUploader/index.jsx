import React, { useState } from "react";
import * as pdfjsLib from "pdfjs-dist";

pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

export function PdfUploader({ onTextExtracted }) {
  const [text, setText] = useState("");

  const handleFileChange = async (event) => {
    const file = event.target.files[0];

    if (!file || file.type !== "application/pdf") {
      alert("Por favor, envie um arquivo PDF válido.");
      return;
    }

    const reader = new FileReader();

    reader.onload = async function () {
      const typedarray = new Uint8Array(this.result);

      try {
        const pdf = await pdfjsLib.getDocument({ data: typedarray }).promise;

        let fullText = "";
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const content = await page.getTextContent();
          const pageText = content.items.map((item) => item.str).join(" ");
          fullText += pageText + "\n\n";
        }

        setText(fullText);
        if (onTextExtracted) onTextExtracted(fullText);
      } catch (error) {
        console.error("Erro ao processar o PDF:", error);
        alert("Erro ao ler o PDF.");
      }
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <div style={{ marginTop: "16px" }}>
      <input
        type="file"
        accept="application/pdf"
        onChange={handleFileChange}
        style={{ marginBottom: "8px" }}
      />
      <textarea
        value={text}
        readOnly
        rows={10}
        style={{
          width: "100%",
          background: "#1e1e2f",
          color: "#fff",
          border: "none",
          padding: "12px",
          borderRadius: "8px",
          resize: "vertical",
        }}
      />
    </div>
  );
}
