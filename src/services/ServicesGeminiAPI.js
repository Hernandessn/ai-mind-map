import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_API_KEY_GEMINI);

export async function ServicesGemini(prompt) {
  try {
    const currentCount = parseInt(localStorage.getItem('geminiRequestCount') || '0', 10);
    localStorage.setItem('geminiRequestCount', (currentCount + 1).toString());

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return text;
  } catch (error) {
    const errorMessage = error?.message?.toLowerCase() || "";

    if (errorMessage.includes("quota") || errorMessage.includes("429")) {
      return "⚠️ Limite gratuito da API atingido. Tente novamente no próximo mês.";
    }

    return "❌ Erro ao gerar mapa mental.";
  }
}
