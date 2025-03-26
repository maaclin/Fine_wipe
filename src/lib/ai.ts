import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export async function generateAppealLetter(ticketDetails: {
  extractedText: string;
  issuer: string;
  fullName: string;
  dateIssued: string;
  location: string;
  appealType: string;
  additionalDetails: string;
}): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    
    const prompt = `Generate a formal appeal letter for a parking ticket with the following details:
    Ticket Information: ${ticketDetails.extractedText}
    Issuer: ${ticketDetails.issuer}
    Full Name: ${ticketDetails.fullName}
    Date: ${ticketDetails.dateIssued}
    Location: ${ticketDetails.location}
    Appeal Type: ${ticketDetails.appealType}
    Additional Context: ${ticketDetails.additionalDetails}
    
    Please write a professional, well-structured appeal letter that addresses the specific circumstances. Use the provided full name in the letter's signature and header.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error generating appeal letter:', error);
    throw new Error('Failed to generate appeal letter');
  }
}