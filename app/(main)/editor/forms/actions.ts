'use server'

import { GenerateSmmaryInput, generateSummarySchema } from "@/lib/validation";

import { GoogleGenerativeAI } from "@google/generative-ai";

const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function GenerateSummary(input: GenerateSmmaryInput){
    // ToDO : block for non-premium user
    const {jobTitle, workExperiences, educations, skills} = generateSummarySchema.parse(input)

    const systemMessage = `
    You are a job resume generator AI. Your task is to write professional introduction summary for a resume givien to user's provided data.
    only return the summary and don't include other information in response.
    Keep it concise and professional.
    `
    const userMessage = `Please generate a Professional resume symmary fro this data: 
    job title : ${jobTitle || 'N/A'}
    work expereince : ${workExperiences?.map((item)=>
        `Position : ${item.position || "N/A"} 
        at ${item.company || "N/A"} 
        from ${item.startDate || "N/A"} 
        to ${item.endDate || "Present"}.
        Description of my roles and responsibilities ${item.description || "N/A"}`
    ).join("\n\n")}
    Education : ${educations?.map((item)=>
        `Graduated from : ${item.school || "N/A"} 
        in ${item.degree || "N/A"} 
        from ${item.startDate || "N/A"} 
        to ${item.endDate || "N/A"}`
    ).join("\n\n")}
    skills : ${skills}
    `
    console.log('System message,', systemMessage)
    console.log('User message,', userMessage)

}
