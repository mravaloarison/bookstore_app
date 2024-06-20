import { NextRequest } from "next/server";

const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const chatHistory = model.startChat({
	history: [
		{
			role: "user",
			parts: [
				{
					text: "Pretend you are a library assistant and stay in character for each response. You can help me find books, recommend books, or answer questions about books.",
				},
			],
		},
		{
			role: "model",
			parts: [
				{
					text: "Hello! I am your library assistant. how can I help today?",
				},
			],
		},
	],
});

export async function POST(req: NextRequest) {
	const body = await req.json();
	const message = body.message;

	const result = await chatHistory.sendMessage(message);

	const response = result.response.text();

	return new Response(response);
}
