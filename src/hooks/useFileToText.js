// hooks/useFileToText.js

import { useState } from 'react';

export const useFileToText = () => {
  const [pdfText, setPdfText] = useState('');
  const [fileData, setFileData] = useState(null);
  const [resetTrigger, setResetTrigger] = useState(false);

  const handleFileSelect = async (file) => {
    if (!file) return;

    setPdfText('');
    setFileData(null);

    // Se o arquivo tiver texto já extraído, usa ele
    if (file.text) {
      setFileData(file);
      setPdfText(file.text);
    } else if (file.type === 'image' || file.type === 'pdf') {
      setFileData(file);
    }
  };

  const handleRemoveFile = () => {
    setFileData(null);
    setPdfText('');
    setResetTrigger(prev => !prev); // Reseta o componente FileViewer
  };

  return {
    pdfText,
    fileData,
    resetTrigger,
    handleFileSelect,
    handleRemoveFile,
  };
};
