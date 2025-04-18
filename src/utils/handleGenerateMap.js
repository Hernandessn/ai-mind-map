// Importa o serviço de comunicação com a API do Gemini (IA responsável por gerar o mapa mental)
import { ServicesGemini } from '../services/ServicesGeminiAPI';

// Função auxiliar que tenta extrair um objeto JSON válido de uma string que pode ter conteúdo extra
const extractJsonFromString = (str) => {
  try {
    // Tenta converter diretamente para JSON
    return JSON.parse(str);
  } catch (e) {
    // Caso falhe, tenta identificar um bloco JSON formatado com markdown
    const jsonPattern = /```(?:json)?\s*(\{[\s\S]*?\}|\[[\s\S]*?\])\s*```/;
    const match = str.match(jsonPattern);

    if (match && match[1]) {
      try {
        return JSON.parse(match[1]);
      } catch (e) {}
    }

    // Tenta identificar qualquer objeto ou array JSON usando regex
    const objectPattern = /(\{[\s\S]*\})/;
    const arrayPattern = /(\[[\s\S]*\])/;

    const objMatch = str.match(objectPattern);
    const arrMatch = str.match(arrayPattern);

    if (objMatch && objMatch[1]) {
      try {
        return JSON.parse(objMatch[1]);
      } catch (e) {}
    }

    if (arrMatch && arrMatch[1]) {
      try {
        return JSON.parse(arrMatch[1]);
      } catch (e) {}
    }
  }

  // Se nenhuma tentativa funcionar, retorna null
  return null;
};

/**
 * Função principal para gerar o mapa mental usando a IA (Gemini)
 * @param {Object} params - Parâmetros da função
 * @param {string} params.prompt - Texto base para a geração do mapa (tema digitado ou texto extraído)
 * @param {string} params.selectedTemplate - Tipo de modelo escolhido ("radial", "hierarquico" ou "linear")
 * @param {Function} params.navigate - Função para navegação (React Router)
 * @returns {Object} - Retorna o JSON interpretado e também a resposta original da IA (caso precise debug)
 */
export async function generateMindMap({
  prompt,
  selectedTemplate,
  navigate
}) {
  // Define o limite máximo de caracteres permitido para envio à API
  const maxLength = 100000;

  // Garante que o prompt não ultrapasse o tamanho limite
  const trimmedPrompt = prompt.length > maxLength
    ? prompt.substring(0, maxLength) + "..."
    : prompt;

  // Cria um prompt detalhado para orientar a IA a gerar um mapa mental no formato desejado
  const enhancedPrompt = `
 Você é uma inteligência artificial especialista em geração de mapas mentais. 
 Com base no conteúdo fornecido abaixo, gere um mapa mental no formato JSON conforme o modelo de estrutura selecionado. 
 Retorne **somente o JSON**, sem explicações adicionais e sem comentários fora da estrutura.
 
 ---
 🧠 Modelo selecionado: ${selectedTemplate}
 
 📄 Conteúdo base para geração do mapa:
 """
 ${trimmedPrompt}
 """
 
 📌 Instruções por modelo:
 
 🔵 Radial:
 {
   "title": "Título Central",
   "nodes": [
     {
       "title": "Categoria 1",
       "subtopics": ["Subtopico A", "Subtopico B"]
     }
   ]
 }
 
 🔶 Hierárquico:
 {
   "title": "Tema principal",
   "type": "raiz",
   "children": [
     {
       "title": "Nó 1",
       "type": "categoria",
       "children": [
         {
           "title": "Subcategoria A",
           "type": "sub",
           "children": [
             { "title": "Item 1", "type": "detalhe" }
           ]
         }
       ]
     }
   ]
 }
 
 🟢 Linear:
 [
   {
     "title": "Etapa 1",
     "description": "Descrição da etapa 1"
   }
 ]
 
 ⚠️ Retorne apenas o JSON **válido e bem formatado** conforme o modelo escolhido.
 `;

  // Chama a API do Gemini passando o prompt completo
  const response = await ServicesGemini(enhancedPrompt);

  // Tenta extrair e interpretar o JSON da resposta da IA
  const jsonData = extractJsonFromString(response);

  // Retorna o JSON (caso válido) e também a resposta bruta para casos de erro ou debug
  return {
    jsonData,
    response
  };
}
