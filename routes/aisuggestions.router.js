const express = require("express");
const router = express.Router();
const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();

const configuration = new Configuration({
  organization: "org-FZYYu4nQusFJI66HBpbyNPju",
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const keywordSuggestionsPrompts = {
  "profile-summary": ({ name, jobTitle, country, key, selectedText }) => {
    return `${name} is a ${jobTitle} based in ${country}. As they seek new opportunities, their ${key} currently states: ${selectedText}. Please rephrase the ${key} while incorporating relevant keyword suggestions to further optimize the resume for potential positions in the ${jobTitle} industry. The ${key} should be between 200-250 characters only.`;
  },
  education: ({ name, jobTitle, country, key, selectedText }) => {
    return `${name} is a ${jobTitle} based in ${country}. Please rephrase the ${key} section of their resume to better highlight their academic achievements and experiences. Ensure to include relevant keyword suggestions that showcase their comprehensive knowledge and hands-on experience. The current description states: ${selectedText}. The goal is to present their educational background in a compelling way that aligns with potential positions in the ${jobTitle} industry. It should be between 450-400 characters only.`;
  },
  "professional-experience": ({
    name,
    jobTitle,
    country,
    key,
    selectedText,
    selectedObject,
  }) => {
    return `${name} is a ${jobTitle} based in ${country}. As they seek new opportunities, their ${key} includes the following role: ${selectedObject}. One of the descriptions of their contributions at company reads: ${selectedText}. Please rephrase the profile summary while incorporating relevant keyword suggestions to further optimize the resume for potential positions  in the ${jobTitle} industry. It should be between 120-160 characters only.`;
  },
};

const continueWritingPrompts = {
  "profile-summary": ({ name, jobTitle, country, key, selectedText }) => {
    return `${name} is a ${jobTitle} based in ${country}. As they seek new opportunities, their ${key} currently states: ${selectedText}. Please continue writing the ${key} to provide a comprehensive overview of their technical skills, notable accomplishments, and dedication in the ${jobTitle} field.  Aim for a concise and compelling description within 200-250 characters only.`;
  },
  education: ({ name, jobTitle, country, key, selectedText }) => {
    return `${name} is a ${jobTitle} based in ${country}. Please continue writing the ${key} section of their resume to better highlight their academic achievements and experiences. The current description states: ${selectedText}. Aim for a concise and compelling description within 400-450 characters only. The goal is to present this section in a way that captivates potential employers and aligns with ${jobTitle} industry requirements.`;
  },
  "professional-experience": ({
    name,
    jobTitle,
    country,
    key,
    selectedText,
    selectedObject,
  }) => {
    return `${name} is a ${jobTitle} based in ${country}. As they seek new opportunities, their ${key} includes the following role: ${selectedObject}. One of the descriptions of their contributions at company reads: ${selectedText}. Please continue writing this specific description to further highlight the skills and accomplishments. The goal is to present this accomplishment in a compelling way that aligns with potential positions in the ${jobTitle} industry. Aim for a concise and engaging expansion within 120-160 characters only.`;
  },
};

const promptGenerators = {
  "keyword-suggestions": {
    "profile-summary": ({ name, jobTitle, country, key, selectedText }) => {
      return `${name} is a ${jobTitle} based in ${country}. As they seek new opportunities, their ${key} currently states: ${selectedText}. Please rephrase the ${key} while incorporating relevant keyword suggestions to further optimize the resume for potential positions in the ${jobTitle} industry. The ${key} should be between 200-250 characters only.`;
    },
    education: ({ name, jobTitle, country, key, selectedText }) => {
      return `${name} is a ${jobTitle} based in ${country}. Please rephrase the ${key} section of their resume to better highlight their academic achievements and experiences. Ensure to include relevant keyword suggestions that showcase their comprehensive knowledge and hands-on experience. The current description states: ${selectedText}. The goal is to present their educational background in a compelling way that aligns with potential positions in the ${jobTitle} industry. It should be between 450-400 characters only.`;
    },
    "professional-experience": ({
      name,
      jobTitle,
      country,
      key,
      selectedText,
      selectedObject,
    }) => {
      return `${name} is a ${jobTitle} based in ${country}. As they seek new opportunities, their ${key} includes the following role: ${selectedObject}. One of the descriptions of their contributions at company reads: ${selectedText}. Please rephrase the profile summary while incorporating relevant keyword suggestions to further optimize the resume for potential positions  in the ${jobTitle} industry. It should be between 120-160 characters only.`;
    },
  },
  "continue-writing": {
    "profile-summary": ({ name, jobTitle, country, key, selectedText }) => {
      return `${name} is a ${jobTitle} based in ${country}. As they seek new opportunities, their ${key} currently states: ${selectedText}. Please continue writing the ${key} to provide a comprehensive overview of their technical skills, notable accomplishments, and dedication in the ${jobTitle} field.  Aim for a concise and compelling description within 200-250 characters only.`;
    },
    education: ({ name, jobTitle, country, key, selectedText }) => {
      return `${name} is a ${jobTitle} based in ${country}. Please continue writing the ${key} section of their resume to better highlight their academic achievements and experiences. The current description states: ${selectedText}. Aim for a concise and compelling description within 400-450 characters only. The goal is to present this section in a way that captivates potential employers and aligns with ${jobTitle} industry requirements.`;
    },
    "professional-experience": ({
      name,
      jobTitle,
      country,
      key,
      selectedText,
      selectedObject,
    }) => {
      return `${name} is a ${jobTitle} based in ${country}. As they seek new opportunities, their ${key} includes the following role: ${selectedObject}. One of the descriptions of their contributions at company reads: ${selectedText}. Please continue writing this specific description to further highlight the skills and accomplishments. The goal is to present this accomplishment in a compelling way that aligns with potential positions in the ${jobTitle} industry. Aim for a concise and engaging expansion within 120-160 characters only.`;
    },
  },
};

router.post("/combined-api", async (req, res) => {
  const {
    name,
    jobTitle,
    country,
    key,
    selectedText,
    selectedObject,
    selectedOption,
  } = req.body;

  console.log({ name, jobTitle, country, key, selectedText, selectedObject });

  const promptFn = promptGenerators[selectedOption]?.[key];
  if (!promptFn) {
    return res.status(400).json({
      success: false,
      error: "Invalid key or selectedOption provided.",
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

  const promptFn = promptGenerators[selectedOption]?.[key];
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

router.post("/keyword-suggestions", async (req, res) => {
  const { name, jobTitle, country, key, selectedText, selectedObject } =
    req.body;

  console.log({ name, jobTitle, country, key, selectedText, selectedObject });

  const promptFn = keywordSuggestionsPrompts[key];
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

router.post("/continue-writing", async (req, res) => {
  const { name, jobTitle, country, key, selectedText, selectedObject } =
    req.body;

  console.log({ name, jobTitle, country, key, selectedText, selectedObject });

  const promptFn = continueWritingPrompts[key];
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

// // const prompt = `Prerana Nawar is a Software Engineer based in India. As they seek new opportunities, their profile summary currently states: "Experienced Software Developer adept in bringing forth expertise in design, installation, testing, and maintenance of software systems. Proficient in various platforms, languages, and embedded systems." Please rephrase the profile summary while incorporating relevant keyword suggestions to further optimize the resume for potential positions in the software engineer industry. `

// const prompt = `${name} is a ${jobTitle} based in ${country}. Please rephrase the ${key} section of their resume to better highlight their academic achievements and experiences. Ensure to include relevant keyword suggestions that showcase their comprehensive knowledge and hands-on experience. The current description states: ${selectedText}. The goal is to present their educational background in a compelling way that aligns with potential positions in the ${jobTitle} industry. It should be between 450-500 characters only.`;

// const prompt2 = `${name} is a ${jobTitle} based in ${country}. As they seek new opportunities, their ${key} includes the following role:
// ${selectedObject}
// One of the descriptions of their contributions at ABC COMPANY reads: ${selectedText} Please rephrase the profile summary while incorporating relevant keyword suggestions to further optimize the resume for potential positions  in the ${jobTitle} industry.
// `;
// const content = `${name} is a ${jobTitle} based in ${country}. As they seek new opportunities, their ${key} currently states: ${selectedText}. Please rephrase the ${key} while incorporating relevant keyword suggestions to further optimize the resume for potential positions in the ${jobTitle} industry. The ${key} should be between 200-250 characters only.`;

// Prerana Nawar is a Software Engineer based in India. As they seek new opportunities, their profile summary currently states: "Experienced Software Developer adept in bringing forth expertise in design, installation, testing, and maintenance of software systems. Proficient in various platforms, languages, and embedded systems." Please continue writing the profile summary to provide a more detailed overview of their technical skills, accomplishments, and their passion for driving innovation in the software engineer industry. Aim for a concise and compelling description within 200-250 characters.

// Prerana Nawar is a Software Engineer based in India. As they seek new opportunities, their profile summary currently states: "Experienced Software Developer adept in bringing forth expertise in design, installation, testing, and maintenance of software systems. Proficient in various platforms, languages, and embedded systems." Please continue writing the profile summary to provide additional details about their technical skills, notable accomplishments, and dedication to driving innovation in the industry. Aim for a concise and compelling description within 200-250 characters.
