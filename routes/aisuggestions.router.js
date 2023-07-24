const express = require("express");
const router = express.Router();
const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();

const configuration = new Configuration({
  organization: "org-FZYYu4nQusFJI66HBpbyNPju",
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const prompts = {
  "profile-summary": ({ name, jobTitle, country, key, selectedText }) => {
    return `${name} is a ${jobTitle} based in ${country}. As they seek new opportunities, their ${key} currently states: ${selectedText}. Please rephrase the ${key} while incorporating relevant keyword suggestions to further optimize the resume for potential positions in the ${jobTitle} industry. The ${key} should be between 200-250 characters only.`;
  },
  education: ({ name, jobTitle, country, key, selectedText }) => {
    return `${name} is a ${jobTitle} based in ${country}. Please rephrase the ${key} section of their resume to better highlight their academic achievements and experiences. Ensure to include relevant keyword suggestions that showcase their comprehensive knowledge and hands-on experience. The current description states: ${selectedText}. The goal is to present their educational background in a compelling way that aligns with potential positions in the ${jobTitle} industry. It should be between 450-500 characters only.`;
  },
  "professional-experience": ({
    name,
    jobTitle,
    country,
    key,
    selectedText,
    selectedObject,
  }) => {
    return `${name} is a ${jobTitle} based in ${country}. As they seek new opportunities, their ${key} includes the following role: ${selectedObject}. One of the descriptions of their contributions at ABC COMPANY reads: ${selectedText} Please rephrase the profile summary while incorporating relevant keyword suggestions to further optimize the resume for potential positions  in the ${jobTitle} industry. It should be between 120-160 characters only.`;
  },
};

router.post("/keyword-suggestions", async (req, res) => {
  const { name, jobTitle, country, key, selectedText, selectedObject } =
    req.body;

  console.log({ name, jobTitle, country, key, selectedText, selectedObject });

  const promptFn = prompts[key];
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
    console.log(chatCompletion.data.choices);
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

// // const prompt = `Prerana Nawar is a Software Engineer based in India. As they seek new opportunities, their profile summary currently states: "Experienced Software Developer adept in bringing forth expertise in design, installation, testing, and maintenance of software systems. Proficient in various platforms, languages, and embedded systems." Please rephrase the profile summary while incorporating relevant keyword suggestions to further optimize the resume for potential positions in the software engineer industry. `

// const prompt = `${name} is a ${jobTitle} based in ${country}. Please rephrase the ${key} section of their resume to better highlight their academic achievements and experiences. Ensure to include relevant keyword suggestions that showcase their comprehensive knowledge and hands-on experience. The current description states: ${selectedText}. The goal is to present their educational background in a compelling way that aligns with potential positions in the ${jobTitle} industry. It should be between 450-500 characters only.`;

// const prompt2 = `${name} is a ${jobTitle} based in ${country}. As they seek new opportunities, their ${key} includes the following role:
// ${selectedObject}
// One of the descriptions of their contributions at ABC COMPANY reads: ${selectedText} Please rephrase the profile summary while incorporating relevant keyword suggestions to further optimize the resume for potential positions  in the ${jobTitle} industry.
// `;
// const content = `${name} is a ${jobTitle} based in ${country}. As they seek new opportunities, their ${key} currently states: ${selectedText}. Please rephrase the ${key} while incorporating relevant keyword suggestions to further optimize the resume for potential positions in the ${jobTitle} industry. The ${key} should be between 200-250 characters only.`;
