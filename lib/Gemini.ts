// import { GoogleGenerativeAI } from "@google/generative-ai"

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

// export async function generateAIResponse(prompt: string) {
//   try {
//     const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })
//     const result = await model.generateContent(prompt)
//     const text = result.response.text()
//     return text
//   } catch (error) {
//     console.error("Gemini AI error:", error)
//     throw error
//   }
// }
import { GoogleGenAI } from "@google/genai"

// Check if API key exists
if (!process.env.GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY is not set in environment variables")
}

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
})

export async function generateAIResponse(prompt: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-exp", // or "gemini-1.5-flash" if you prefer
      contents: prompt,
    })
    
    // Get the text from response
    const text = response.text
    
    // Validate text
    if (!text || text.trim().length === 0) {
      throw new Error("Empty response from Gemini API")
    }
    
    return text
  } catch (error) {
    console.error("Gemini AI error:", error)
    
    // Provide more specific error message
    if (error instanceof Error) {
      throw new Error(`Gemini API failed: ${error.message}`)
    }
    throw new Error("Unknown error in Gemini API")
  }
}