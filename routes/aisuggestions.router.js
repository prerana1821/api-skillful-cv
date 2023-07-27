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

  console.log({
    name,
    jobTitle,
    country,
    key,
    selectedText,
    selectedObject,
    selectedOption,
  });

  const promptFn = prompts[selectedOption]?.[key];
  if (!promptFn) {
    return res.status(400).json({
      success: false,
      error: "Invalid key provided.",
    });
  }

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
    console.log(chatCompletion.data.choices[0]);
    return res.status(200).json({
      success: true,
      data: chatCompletion.data.choices[0].message.content,
    });
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }
  }
});

module.exports = router;
