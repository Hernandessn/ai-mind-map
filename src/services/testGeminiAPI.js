import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_API_KEY_GEMINI);

export async function ServicesGemini(prompt) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

    const result = await model.generateContent(prompt);

    const response = await result.response;
    const text = response.text();

    return text;
  } catch (error) {
    console.error("Erro ao chamar a IA:", error);
    return "Erro ao gerar mapa mental.";
  }
}
