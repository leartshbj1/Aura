import { GoogleGenAI, Type } from "@google/genai";
import { Transaction, TransactionCategory } from '../types';

const apiKey = process.env.API_KEY || ''; // Handle safely

// Initialize Gemini
let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({ apiKey });
}

export const categorizeTransactionsAI = async (transactions: Transaction[]): Promise<Transaction[]> => {
  if (!ai) {
    console.warn("Gemini API Key not found");
    return transactions;
  }

  const uncategorized = transactions.filter(t => t.category === TransactionCategory.UNCATEGORIZED);
  
  if (uncategorized.length === 0) return transactions;

  // Prepare prompt
  const txStrings = uncategorized.map(t => `${t.id}: ${t.description} (${t.amount} ${t.currency})`).join('\n');
  
  const prompt = `
    You are an expert financial assistant for both personal wealth and corporate treasury. 
    Categorize the following transactions into one of these categories: 
    'Sales' (or Income), 'Service', 'TVA' (Tax), 'Salaries', 'Software' (Subscriptions), 'Travel', 'Office', 'Investments', 'Lifestyle'.
    
    If you are unsure, use 'Uncategorized'.

    Transactions:
    ${txStrings}
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              category: { type: Type.STRING }
            }
          }
        }
      }
    });

    let result = [];
    try {
        const text = response.text || '[]';
        // Sanitization: Remove markdown code blocks if present (Gemini sometimes adds them even with mimeType)
        const jsonString = text.replace(/```json/g, '').replace(/```/g, '').trim();
        result = JSON.parse(jsonString);
    } catch (parseError) {
        console.error("JSON Parse Error:", parseError);
        return transactions;
    }
    
    // Merge results back
    const newTransactions = [...transactions];
    if (Array.isArray(result)) {
        result.forEach((item: {id: string, category: string}) => {
        const idx = newTransactions.findIndex(t => t.id === item.id);
        if (idx !== -1) {
            newTransactions[idx].category = item.category;
        }
        });
    }

    return newTransactions;

  } catch (error) {
    console.error("Failed to categorize with Gemini", error);
    return transactions;
  }
};

export const generateFinancialInsight = async (transactions: Transaction[]): Promise<string> => {
  if (!ai) return "Analyse de votre patrimoine en cours...";

  const summary = transactions.slice(0, 15).map(t => `${t.date}: ${t.amount} ${t.currency} (${t.category})`).join('\n');

  try {
     const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Analyze these transactions and give a 2-sentence strategic advice for the user (who could be an individual investor or a business owner). 
      Focus on Net Worth optimization, savings rate, or liquidity. 
      Tone: Professional Swiss Private Banker, concise, encouraging. 
      
      Transactions: \n ${summary}`,
    });
    return response.text || "Pas d'analyse disponible.";
  } catch (e) {
    return "Analyse indisponible.";
  }
}