const OpenAI = require("openai");

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "No text provided." });
  }

  try {
    const prompt = `I am the 'What-if' machine.  I answer questions that you might have. It must be a what if question, otherwise the answer will be "not a what if".

Q: What if dogs ruled the world instead of humans?
A: This world would look a lot like ours, except that dogs would be in charge instead of humans.  Dogs would live in houses and go to work, and they would have their own language that humans would not be able to understand.  Dogs would walk and run on their hind legs, and they would have pet humans.

Q: What if I invented the finglonger?
A: In this world, the finglonger is a device that helps people to type faster and more accurately on their smartphones and other devices.  The invention has made you very rich, and people use your invention every day.

Q: What if superheroes exist, but are only 6 inches tall?
A: The world would look a lot like ours, but superheroes would only be 6 inches tall.  They would still have powers, but would be very small, making it difficult for them to fight crime.

Q: What is the square root of banana?
A: not a what if

Q: How many squigs are in a bonk?
A: not a what if

Q: ${text}?
A: `;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.82,
      max_tokens: 100,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    res.status(200).json({ result: completion.choices[0].message.content });
  } catch (error) {
    console.error("OpenAI error:", error.message);
    res.status(500).json({ error: "Something went wrong calling the AI." });
  }
};
