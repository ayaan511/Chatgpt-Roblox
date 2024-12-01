const express = require("express");
const bodyParser = require("body-parser");
const { Configuration, OpenAIApi } = require("openai");

const app = express();
app.use(bodyParser.json());

app.post("/chat", async (req, res) => {
    const { text, apiKey } = req.body;

    if (!apiKey) {
        return res.status(400).send("API key is required.");
    }

    const openai = new OpenAIApi(new Configuration({ apiKey }));

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

// Use Render's dynamic port, or fallback to 3000 for local testing
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
