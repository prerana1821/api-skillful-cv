const mongoose = require("mongoose");
const { Schema } = mongoose;

const ResumeSchema = new Schema({
  email: {
    type: String,
    required: [true, "Please enter your Email ID"],
    unique: "EmailID should be unique",
  },
  resumeId: {
    type: String,
    required: [true, "Please enter your resume ID"],
    unique: "ResumeID should be unique",
  },
  resumeValue: {
    type: String,
    required: [true, "Please enter your resume data"],
  },
});

const Resume = mongoose.model("Resume", ResumeSchema);

module.exports = { Resume };
