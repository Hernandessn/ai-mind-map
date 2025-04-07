// Uploader.jsx
import React, { useState } from 'react';
import Tesseract from 'tesseract.js';

export  function Uploader() {
  const [image, setImage] = useState(null);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
      extractText(file);
    }
  };

  const extractText = async (file) => {
    setLoading(true);
    try {
      const result = await Tesseract.recognize(file, 'por', {
        logger: (m) => console.log(m), // progresso
      });
      setText(result.data.text);
    } catch (error) {
      console.error('Erro ao extrair texto:', error);
      setText('Erro ao ler a imagem.');
    }
    setLoading(false);
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Enviar Imagem e Extrair Texto</h2>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      
      {image && (
        <>
          <h4>Pré-visualização:</h4>
          <img src={image} alt="Preview" style={{ maxWidth: '400px', marginTop: '10px' }} />
        </>
      )}

      {loading && <p>🔄 Extraindo texto da imagem...</p>}
      {text && (
        <>
          <h4>📝 Texto extraído:</h4>
          <pre>{text}</pre>
        </>
      )}
    </div>
  );
}
