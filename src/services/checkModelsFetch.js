import fetch from 'node-fetch';

const API_KEY = 'AIzaSyBe98XifyCh7G2G7tRBHzB_NyvA288tqNY'; // substitui pela sua chave

const listModels = async () => {
  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`);

    if (!response.ok) {
      throw new Error(`Erro HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
  } catch (error) {
  }
};

listModels();
