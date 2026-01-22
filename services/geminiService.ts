import { GoogleGenAI } from "@google/genai";

// Always use the process.env.API_KEY directly for initialization
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getDailyPrompt = async (): Promise<string> => {
  try {
    // Basic text task uses gemini-3-flash-preview
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: "Generate a deep, intimate, but playful daily question for a long-distance couple to answer together. Keep it under 20 words.",
      config: {
        temperature: 0.9,
        topP: 0.95,
      }
    });
    // Directly access .text property
    return response.text || "What's one small thing that made you smile today?";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "What's something you're looking forward to telling me?";
  }
};

export const generateRelationshipNote = async (entries: string[]): Promise<string> => {
  if (entries.length === 0) return "Our story is just beginning.";
  try {
    const context = entries.join("\n");
    // Basic text task uses gemini-3-flash-preview
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Based on these relationship updates, write a short, sweet encouragement (one sentence) for this couple: \n${context}`,
      config: {
        temperature: 0.7,
      }
    });
    // Directly access .text property
    return response.text || "You two are building something beautiful.";
  } catch (error) {
    return "Distance is just a test to see how far love can travel.";
  }
};
