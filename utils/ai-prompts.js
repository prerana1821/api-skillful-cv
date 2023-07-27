const prompts = {
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
      return `${name} is a ${jobTitle} based in ${country}. As they seek new opportunities, their ${key} currently states: ${selectedText}. Please continue writing the ${key} to provide a comprehensive overview of their technical skills, notable accomplishments, and dedication in the ${jobTitle} field.  Aim for a concise and compelling description within 200-250 characters only. Please write with first-person perspective.`;
    },
    education: ({ name, jobTitle, country, key, selectedText }) => {
      return `${name} is a ${jobTitle} based in ${country}. Please continue writing the ${key} section of their resume to better highlight their academic achievements and experiences. The current description states: ${selectedText}. Aim for a concise and compelling description within 400-450 characters only. The goal is to present this section in a way that captivates potential employers and aligns with ${jobTitle} industry requirements. Please write with first-person perspective.`;
    },
    "professional-experience": ({
      name,
      jobTitle,
      country,
      key,
      selectedText,
      selectedObject,
    }) => {
      return `${name} is a ${jobTitle} based in ${country}. As they seek new opportunities, their ${key} includes the following role: ${selectedObject}. One of the descriptions of their contributions at company reads: ${selectedText}. Please continue writing this specific description to further highlight the skills and accomplishments. The goal is to present this accomplishment in a compelling way that aligns with potential positions in the ${jobTitle} industry. Aim for a concise and engaging expansion within 160-200 characters only. Please write with first-person perspective.`;
    },
  },
  "change-tone": {
    "profile-summary": ({ name, jobTitle, country, key, selectedText }) => {
      return `${name} is a ${jobTitle} based in ${country}. As they seek new opportunities, their ${key} currently states: ${selectedText}. Please change the tone to formal for the ${key} to provide a comprehensive overview of their technical skills, notable accomplishments, and dedication in the ${jobTitle} field.  Aim for a concise and compelling description within 200-250 characters only. Please write with first-person perspective.`;
    },
    education: ({ name, jobTitle, country, key, selectedText }) => {
      return `${name} is a ${jobTitle} based in ${country}. Please change the tone to formal of the ${key} section of their resume to better highlight their academic achievements and experiences. The current description states: ${selectedText}. Aim for a concise and compelling description within 400-450 characters only. The goal is to present this section in a way that captivates potential employers and aligns with ${jobTitle} industry requirements. Please write with first-person perspective.`;
    },
    "professional-experience": ({
      name,
      jobTitle,
      country,
      key,
      selectedText,
      selectedObject,
    }) => {
      return `${name} is a ${jobTitle} based in ${country}. As they seek new opportunities, their ${key} includes the following role: ${selectedObject}. One of the descriptions of their contributions at company reads: ${selectedText}. Please change the tone to formal of this specific description to further highlight the skills and accomplishments. The goal is to present this accomplishment in a compelling way that aligns with potential positions in the ${jobTitle} industry. Aim for a concise and engaging expansion within 160-200 characters only. Please write with first-person perspective.`;
    },
  },
  rephrase: {
    "profile-summary": ({ name, jobTitle, country, key, selectedText }) => {
      return `${name} is a ${jobTitle} based in ${country}. As they seek new opportunities, their ${key} currently states: ${selectedText}. Please rephrase the ${key} to provide a comprehensive overview of their technical skills, notable accomplishments, and dedication in the ${jobTitle} field.  Aim for a concise and compelling description within 200-250 characters only. Please write with first-person perspective.`;
    },
    education: ({ name, jobTitle, country, key, selectedText }) => {
      return `${name} is a ${jobTitle} based in ${country}. Please rephrase the ${key} section of their resume to better highlight their academic achievements and experiences. The current description states: ${selectedText}. Aim for a concise and compelling description within 400-450 characters only. The goal is to present this section in a way that captivates potential employers and aligns with ${jobTitle} industry requirements. Please write with first-person perspective.`;
    },
    "professional-experience": ({
      name,
      jobTitle,
      country,
      key,
      selectedText,
      selectedObject,
    }) => {
      return `${name} is a ${jobTitle} based in ${country}. As they seek new opportunities, their ${key} includes the following role: ${selectedObject}. One of the descriptions of their contributions at company reads: ${selectedText}. Please rephrase this specific description to further highlight the skills and accomplishments. The goal is to present this accomplishment in a compelling way that aligns with potential positions in the ${jobTitle} industry. Aim for a concise and engaging expansion within 160-200 characters only. Please write with first-person perspective.`;
    },
  },
  "language-enhancement": {
    "profile-summary": ({ name, jobTitle, country, key, selectedText }) => {
      return `${name} is a ${jobTitle} based in ${country}. As they seek new opportunities, their ${key} currently states: ${selectedText}. Please enhance the language of the ${key} to make it better for a resume to provide a comprehensive overview of their technical skills, notable accomplishments, and dedication in the ${jobTitle} field.  Aim for a concise and compelling description within 200-250 characters only. Please write with first-person perspective.`;
    },
    education: ({ name, jobTitle, country, key, selectedText }) => {
      return `${name} is a ${jobTitle} based in ${country}. Please enhance the language of the ${key} section of their resume to better highlight their academic achievements and experiences. The current description states: ${selectedText}. Aim for a concise and compelling description within 400-450 characters only. The goal is to present this section in a way that captivates potential employers and aligns with ${jobTitle} industry requirements. Please write with first-person perspective.`;
    },
    "professional-experience": ({
      name,
      jobTitle,
      country,
      key,
      selectedText,
      selectedObject,
    }) => {
      return `${name} is a ${jobTitle} based in ${country}. As they seek new opportunities, their ${key} includes the following role: ${selectedObject}. One of the descriptions of their contributions at company reads: ${selectedText}. Please enhance the language of this specific description to further highlight the skills and accomplishments. The goal is to present this accomplishment in a compelling way that aligns with potential positions in the ${jobTitle} industry. Aim for a concise and engaging expansion within 160-200 characters only. Please write with first-person perspective.`;
    },
  },
};

module.exports = { prompts };
