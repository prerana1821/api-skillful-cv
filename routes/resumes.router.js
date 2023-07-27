const express = require("express");
const router = express.Router();
const { Resume } = require("../models/resume.model");

router.get("/:resumeId", async (req, res) => {
  const { resumeId } = req.params;

  try {
    const resume = await Resume.findOne({ resumeId });

    if (!resume) {
      res.status(404).json({
        success: false,
        message: "Resume not found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Resume retrieved successfully",
        data: {
          email: resume.email,
          template: resume.template,
          resumeValue: resume.resumeValue,
        },
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while retrieving resume",
      errorMessage: error.message,
    });
  }
});

router.post("/", async (req, res) => {
  const { email, resumeValue, uniqueId, template } = req.body;

  try {
    let resume = await Resume.findOne({ email });

    if (resume) {
      // Email exists, update resumeValue
      resume.resumeValue = resumeValue;
      resume.template = template;
      await resume.save();
    } else {
      // Email doesn't exist, create a new resume document
      resume = new Resume({
        email,
        template,
        resumeId: uniqueId,
        resumeValue,
      });
      await resume.save();
    }

    res.status(200).json({
      success: true,
      message: "Resume data stored successfully",
      resumeId: resume.resumeId,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Error while storing resume data",
      errorMessage: error.message,
    });
  }
});

module.exports = router;
