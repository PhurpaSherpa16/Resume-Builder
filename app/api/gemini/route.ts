// import { NextResponse } from "next/server"
// import { generateAIResponse } from "@/lib/Gemini"

// export async function POST(req: Request) {
//   const { prompt } = await req.json()
//   const text = await generateAIResponse(prompt)
//   return NextResponse.json({ text })
// }
import { NextResponse } from "next/server"
import { generateAIResponse } from "@/lib/Gemini"

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json()
    
    // Validate prompt
    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json(
        { error: "Invalid prompt" },
        { status: 400 }
      )
    }

    const text = await generateAIResponse(prompt)
    
    return NextResponse.json({ text })
  } catch (error) {
    console.error("API Route error:", error)
    
    // Return a proper error response
    return NextResponse.json(
      { 
        error: "Failed to generate AI response",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    )
  }
}