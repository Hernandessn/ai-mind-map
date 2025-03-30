import { ServicesGemini } from "../../services/testGeminiAPI";


export function Home() {
  const {text: response} = ServicesGemini()

  console.log(response);
  // const response = Gemini("Boa noite!");
  
  return (
    <h1>Amanhã eu faço kkkk</h1>
  );
}