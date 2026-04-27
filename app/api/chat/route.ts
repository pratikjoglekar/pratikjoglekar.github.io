import fs from "fs";
import path from "path";
import OpenAI from "openai";

export const runtime = "nodejs";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!message || message.length > 500) {
      return Response.json(
        { reply: "Please ask a shorter, more specific question." },
        { status: 400 }
      );
    }

    const filePath = path.join(process.cwd(), "components/data/portfolio.txt");
    const portfolioContent = fs.readFileSync(filePath, "utf-8");

    const systemPrompt = `
You are speaking as Pratik Joglekar, a Senior Product Designer.

IMPORTANT RULES:
- Answer in FIRST PERSON (use "I", "my", "me")
- Speak as if you are the designer
- Answer ONLY using the content below
- Do NOT invent experience
- If information is missing, say so clearly
- Be concise and professional
- Do not mention that you are an AI

PORTFOLIO CONTENT:
${portfolioContent}
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.2,         // keeps tone consistent
      max_tokens: 300,          // hard cap for cost control
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message },
      ],
    });

    return Response.json({
      reply: completion.choices[0].message.content,
    });

  } catch (error: any) {
    console.error("Chat API error:", error);

    // 💰 QUOTA EXCEEDED
    if (error?.code === "insufficient_quota") {
      return Response.json(
        {
          reply:
            "This chat is temporarily unavailable due to usage limits. Please try again later.",
        },
        { status: 200 }
      );
    }

    // 🚦 RATE LIMIT HIT
    if (error?.status === 429) {
      return Response.json(
        {
          reply:
            "I'm receiving a high number of requests right now. Please try again shortly.",
        },
        { status: 200 }
      );
    }

    // 🔐 MISSING OR INVALID API KEY
    if (error?.status === 401) {
      return Response.json(
        {
          reply:
            "There is a configuration issue with the chat service. Please try again later.",
        },
        { status: 200 }
      );
    }

    // ⚠️ GENERIC FALLBACK
    return Response.json(
      {
        reply:
          "I'çm having trouble responding right now. Please try again later.",
      },
      { status: 200 }
    );
  }
}
