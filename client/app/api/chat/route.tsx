const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function POST(req: Request) {
	const body = await req.json();

	return new Response(await model.generate(body.text), {
		headers: {
			"Content-Type": "application/json",
		},
	});
}
