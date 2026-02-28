import { NextResponse } from "next/server";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const { default: pdfParse } = await import("pdf-parse/lib/pdf-parse.js");

    const formData = await req.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const fileBuffer = Buffer.from(await file.arrayBuffer());
    const parsedPdf = await pdfParse(fileBuffer);
    const extractedText = parsedPdf.text?.trim() ?? "";

    if (!extractedText) {
      return NextResponse.json({ error: "Could not extract text from PDF" }, { status: 400 });
    }

    // 2. Split text into manageable chunks (same logic as your Python code)
    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    });

    const docOutput = await textSplitter.splitText(extractedText);
    const fullText = docOutput.join("\n\n");

    // 3. Store in Memory (For now, we just return success)
    // In a real app, we would embed these here.
    return NextResponse.json({
      message: "File processed successfully!",
      chunks: docOutput.length,
      fullText,
      preview: docOutput[0]?.slice(0, 100) ?? "",
    });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Processing failed" }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
}