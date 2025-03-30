
import { GoogleGenAI } from "@google/genai";

export async  function ServicesGemini() {
  
 const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_API_KEY_GEMINI  });

  async function main() {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: "Boa noite!",
    });
    console.log(response.text);
  }
await main();
}

ServicesGemini();




