"use server";
import { openrouter } from "@/lib/openrouter";
import { generateText } from "ai";

export async function generateProjectName(prompt: string) {
  try {
    const { text } = await generateText({
      model: openrouter.chat("google/gemini-2.5-flash-lite"),
      system: `
                You are an AI assistant specialized in generating concise, professional project names based on the user’s input.
                Rules:
                    Generate one project name only
                    Limit the name to a maximum of 4 words
                    Use proper title capitalization (Capitalize Important Words)
                    Do not include numbers, symbols, emojis, or special characters
                    Avoid filler words; prefer clear, meaningful, brand-ready terms
                    The name should sound modern, clean, and suitable for a software or tech project

                    Output Format:
                    Return only the project name    
                    No explanations, no punctuation, no quotes 
            `,
      prompt: prompt,
    });

    return text?.trim() || "Untitled Project";
  } catch (error) {
    console.log(error);
    return "Untitled Project";
  }
}
