import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

type GeminiApiError = {
    status?: number;
    statusText?: string;
    message?: string;
};

export async function POST(req: Request) {
    try {
        const { question, context } = await req.json();
        const apiKey = process.env.GEMINI_API_KEY ?? process.env.GOOGLE_API_KEY;

        if (!question || !context) {
            return NextResponse.json({ error: "Missing question or context" }, { status: 400 });
        }

        if (!apiKey) {
            return NextResponse.json(
                { error: "Missing API key. Set GEMINI_API_KEY (or GOOGLE_API_KEY) in .env.local" },
                { status: 500 }
            );
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        const prompt = `              
                        You are a Research Assistant. Answer the question based ONLY on the context below.
                        If the answer isn't there, say "I don't know."

                        CONTEXT:
                        ${context}

                        QUESTION:
                        ${question}
                        `;

        const result = await model.generateContent(prompt);
        return NextResponse.json({ answer: result.response.text() });
    } catch (error) {
        console.error("/api/chat error:", error);

        const apiError = error as GeminiApiError;

        if (apiError?.status === 429) {
            return NextResponse.json(
                { error: "Rate limit reached. Please wait a moment and try again." },
                { status: 429 }
            );
        }

        if (apiError?.status && apiError.status >= 400 && apiError.status < 600) {
            return NextResponse.json(
                { error: apiError.statusText || apiError.message || "Upstream model request failed" },
                { status: apiError.status }
            );
        }

        return NextResponse.json({ error: "Chat failed" }, { status: 500 });
    }
}