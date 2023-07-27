const express = require("express");
const router = express.Router();
const { Configuration, OpenAIApi } = require("openai");
const { prompts } = require("../utils/ai-prompts");
require("dotenv").config();

const configuration = new Configuration({
  organization: "org-FZYYu4nQusFJI66HBpbyNPju",
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

router.post("/", async (req, res) => {
  const {
    name,
    jobTitle,
    country,
    key,
    selectedText,
    selectedObject,
    selectedOption,
  } = req.body;

  const promptFn = prompts[selectedOption]?.[key];
  if (!promptFn) {
    return res.status(400).json({
      success: false,
      error: "Invalid key provided.",
    });
  }

  let fullUrl = req.protocol + "://" + req.get("host") + req.originalUrl;

  const prompt = promptFn({
    name,
    jobTitle,
    country,
    key,
    selectedText,
    selectedObject,
  });

  try {
    const chatCompletion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });
    return res.status(200).json({
      success: true,
      data: chatCompletion.data.choices[0].message.content,
    });
  } catch (error) {
    if (error.response) {
      console.error(error.response.status);
      console.error(error.response.data);
    } else {
      console.error(error.message);
    }
  }
});

module.exports = router;
