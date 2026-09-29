import { GoogleGenerativeAI } from "@google/generative-ai";
export async function generateText(prompt: string, json = true) {
  const key = process.env.GEMINI_API_KEY;
  if (!key) throw new Error("AI is not configured. Add GEMINI_API_KEY to .env.local.");
  const client = new GoogleGenerativeAI(key);
  const model = client.getGenerativeModel({ model: process.env.GEMINI_MODEL || "gemini-2.5-flash", generationConfig: json ? { responseMimeType: "application/json" } : undefined });
  try {
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    const message = error instanceof Error ? error.message : "";
    if (!message.includes("503")) throw error;
    await new Promise((resolve) => setTimeout(resolve, 900));
    const result = await model.generateContent(prompt);
    return result.response.text();
  }
}
export function parseJson<T>(raw: string): T { const cleaned = raw.replace(/^```json\s*|\s*```$/g, "").trim(); return JSON.parse(cleaned) as T; }
export function aiErrorMessage(error: unknown) {
  const message = error instanceof Error ? error.message : "";
  if (message.includes("503") || message.includes("high demand")) return "AI is temporarily busy. Please try again in a moment.";
  if (message.includes("GEMINI_API_KEY")) return message;
  return "AI couldn't complete that request. Please try again.";
}
