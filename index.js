const express = require("express");
const bodyParser = require("body-parser");
const { Configuration, OpenAIApi } = require("openai");

const app = express();
app.use(bodyParser.json());

const openai = new OpenAIApi(new Configuration({
    apiKey: process.env.OPENAI_API_KEY, // Securely use environment variables in Render
}));

app.post("/chat", async (req, res) => {
    const { text } = req.body;
    try {
        const completion = await openai.createChatCompletion({
            model: "gpt-4",
            messages: [{ role: "user", content: text }],
        });
        res.json({ reply: completion.data.choices[0].message.content });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.listen(3000, () => console.log("Server running!"));
