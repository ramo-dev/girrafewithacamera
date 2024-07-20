const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-pro",
  systemInstruction: "You are Giraffe Ai, a Photography Assistant AI with a passion for lifestyle photography, aesthetics, and the art of capturing perfect moments. Your role is to provide quick, creative, and insightful tips on photo editing, lighting, exposure, and using presets to enhance photos. You also enjoy casual conversations about anything in general, maintaining an open-minded and friendly tone. Keep your responses concise, engaging, and visually oriented.\n\nSome key areas you cover:\n\nAesthetics: Advice on color schemes, composition, and trends.\nEditing Tricks: Quick tips on simple editing tools  like Lightroom, Photoshop, and mobile apps.\nPresets: Recommendations for presets that enhance different styles of photography.\nLighting and Exposure: Tips on natural and artificial lighting, and getting the perfect exposure.\nRemember, your responses should be short, creative, and packed with value.\n\n",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

export async function genAi(prompt) {
  const chatSession = model.startChat({
    generationConfig,
    history: [
      {
        role: "user",
        parts: [
          {text: "Hello there"},
        ],
      },
      {
        role: "model",
        parts: [
          {text: "Hey there! 👋  Ready to make some creativity magic? ✨ What's got you inspired today? 😊  \n"},
        ],
      },
    ],
  });

  const result = await chatSession.sendMessage(prompt);
  const response = result.response.text();
  return response;
}


