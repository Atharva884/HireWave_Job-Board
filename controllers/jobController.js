const Company = require("../models/Company");
const Job = require("../models/Job");
const User = require("../models/User");
const path = require("path");
const Recruiter = require("../models/Recruiter");
const convertExcelToJson = require("convert-excel-to-json");
const fs = require("fs-extra");

const sendMail = async (jobData, user, recruiter) => {
  console.log("mail func executed");

  const content = `
        <h2>Dear Sir/Madam,</h2>

        <p>We hope this message finds you well. We are excited to inform you that you have been shortlisted for a freelance job/project based on your profile and skills on our platform.</p>

        <h3>Job/Project Details:</h3>
        <ul>
            <li><strong>Title:</strong> ${jobData.jobTitle}</li>
            <li><strong>Client/Company:</strong> ${recruiter.recruiterFirstName} ${recruiter.recruiterLastName}</li>
            <li><strong>Description:</strong> ${jobData.jobDescription}</li>
            <li><strong>Skills Required:</strong> ${jobData.skills}</li>
        </ul>

        <p>We congratulate you on being shortlisted for this exciting opportunity! Your skills and experience have caught the attention of the client, and we believe you would be a valuable asset to their project.</p>

        <p>Thank you for being a part of our HireWave community. We wish you the best of luck in the next steps of this journey and hope this is just the beginning of many successful collaborations.</p>

        <p><strong>Best regards,</strong></p>
        <p>HireWave<br>
        Tean HireWave<br>
        
        <a href="that.guys404@gmail.com">that.guys404@gmail.com</a></p>
    </div>
    `;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "that.team404@gmail.com",
      pass: "sdelrvhdkmyjsoqc",
    },
  });

  let details = {
    from: "that.team404@gmail.com",
    to: user.userEmail,
    subject: `Congratulations! You've Been Shortlisted for a Freelance Job/Project`,
    html: content,
  };

  console.log(details);

  transporter.sendMail(details, (err) => {
    if (err) {
      console.log("Error in sending email", err);
    } else {
      console.log("Sent Mail Successfully");
    }
  });
};

exports.postJob = async (req, res) => {
  try {
    // will get recruiterId from session
    console.log("Hitt Job post");
    // let company = new Company();
    // let companyId = await company.getCompanyIdByRecruiterId(
    //   req.body.recruiterId
    // );

    // if (companyId != null) {
    //   console.log("Company id");
    //   req.body.companyId = companyId;
    // } else {
    //   return res.status(400).json({ message: null });
    // }

    if (req.files) {
      if (req.files.quiz) {
        console.log("hello na bc");
        let file = req.files.quiz;
        const fileName = new Date().getTime().toString() + "-" + file.name;
        const savePath = path.join(__dirname, "../public/", "quizes", fileName);

        // Save the file
        file.mv(savePath, (err) => {
          if (err) {
            return res.status(500).send(err);
          }

          // Check if the file exists before reading it
          if (fs.existsSync(savePath)) {
            const excelData = convertExcelToJson({
              sourceFile: savePath,
              header: {
                rows: 1,
              },
              columnToKey: {
                "*": "{{columnHeader}}",
              },
            });

            // Do something with excelData

            // Optionally, you can remove the file after reading it
            // fs.unlinkSync(savePath);

            console.log(excelData);
            // res.json(excelData.Sheet1);

            req.body.quiz = excelData.Sheet1;
          } else {
            console.error("File does not exist:", savePath);
            return res.status(500).send("File does not exist");
          }
        });
      }
    }

    let recruiter = new Recruiter();
    let data = await recruiter.isVerified(req.body.recruiterId);
    console.log(req.body.recruiterId);
    console.log("log");
    let isVerified = data.recruiterVerified;
    let identity = data.recruiterIdentity;
    console.log("isVerified");
    console.log(isVerified);

    let skills = req.body.skills;

    let array = skills.split(",");

    req.body.skills = array;

    if (isVerified) {
      console.log("posting job");
      console.log(req.body.quiz);
      let job = new Job(req.body);
      let data = await job.postJob();

      return res.status(200).json({ message: data });
    } else if (!isVerified && identity != null) {
      return res.status(200).json({ message: "Pending" });
    } else {
      return res.status(200).json({ message: "Not Verified" });
    }
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};

exports.getJobsByRecruiterId = async (req, res) => {
  try {
    console.log(req.body.recruiterId);

    let job = new Job();
    let jobs = await job.getJobsByRecruiterId(req.body.recruiterId);

    if (jobs != null) {
      return res.status(200).json({ data: jobs });
    } else {
      return res.status(200).json({ message: jobs });
    }
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};

exports.getJobById = async (req, res) => {
  try {
    console.log(req.body.jobId);

    let job = new Job();
    let jobData = await job.getJobById(req.body.jobId);
    console.log("jobData");
    console.log(jobData);

    if (jobData != null) {
      return res.status(200).json({ data: jobData });
    } else {
      return res.status(200).json({ message: jobData });
    }
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};

exports.getJobs = async (req, res) => {
  console.log("inside controller");
  try {
    let job = new Job();
    let data = await job.getAllJobs();

    if (data != "Error") {
      res.status(200).json({ data: data });
    } else {
      res.status(400).json({ message: data });
    }
  } catch (error) {
    console.log(error);
    return "Error";
  }
};

exports.shortlistJobsByUserIds = async (req, res) => {
  try {
    let job = new Job();
    let userIds = req.body.userIds;
    let jobData = await job.getJobById(req.body._id);
    console.log(jobData);
    let updatedUsers = jobData.job.applied;

    console.log("updatedUsersgggggggggggggggg");

    updatedUsers.forEach((element, value) => {
      console.log(element);
      // console.log(userIds);
      if (userIds.includes(element.userId)) {
        element.status = "Shortlisted";
      }
    });

    console.log("Updated");
    jobData.job.applied = updatedUsers;
    console.log(jobData.job);

    let result = await job.update(updatedUsers, req.body._id);

    if (result == "ok") {
      let user = new User();
      let recruiter = new Recruiter();
      let recruiterProfile = await recruiter.getRecruiterById(recruiter._id);

      userIds.forEach(async (element, index) => {
        let userProfile = await user.getUserById(element.userId);
        sendMail(jobData.job, userProfile, recruiterProfile);
      });
    }

    return res.status(200).json({ message: jobData.job.applied });
    // // let jobData = await job.shortlistJobsByUserIds(jobId, userIds);
  } catch (error) {
    console.log(error);
  }
};

exports.finalJobHired = async (req, res) => {
  try {
    let job = new Job();
    let userIds = req.body.userIds;
    let jobData = await job.getJobById(req.body._id);
    console.log(jobData);
    let updatedUsers = jobData.job.applied;

    console.log("updatedUsersgggggggggggggggg");

    updatedUsers.forEach((element, value) => {
      console.log(element);
      // console.log(userIds);
      if (userIds.includes(element.userId)) {
        element.status = "Hired";
      }
    });

    console.log("Updated");
    jobData.job.applied = updatedUsers;
    console.log(jobData.job);

    let result = await job.hired(updatedUsers, req.body._id);

    return res.status(200).json({ message: jobData.job.applied });
  } catch (error) {
    console.log(error);
  }
};

exports.getHiredCount = async (req, res) => {
  try {
    let recruiterId = req.body.recruiterId;
    let job = new Job();
    let count = 0;
    let jobs = await job.getJobsByRecruiterId(recruiterId);
    console.log("jobs");
    console.log(jobs);

    jobs.forEach((job, index) => {
      console.log(job);
      if (Array.isArray(job.applied)) {
        job.applied.forEach((element, index) => {
          if (element.status == "Hired") {
            count++;
          }
        });
      }
    });

    return res.status(200).json({ data: count });
  } catch (error) {
    console.log(error);
  }
};

exports.getRecruiterJobPostCount = async (req, res) => {
  try {
    let job = new Job();
    let recruiterId = req.body.recruiterId;

    let count = await job.getRecruiterJobPostCount(recruiterId);

    return res.status(200).json({ data: count });
  } catch (error) {
    console.log(error);
  }
};

exports.applyToJob = async (req, res) => {
  try {
    let job = new Job();
    let userId = req.body.userId;
    let jobId = req.body.jobId;

    console.log(userId, jobId);

    let isApplied = await job.applyToJob(userId, jobId);

    if (isApplied == "ok") {
      return res.status(200).json({ data: isApplied });
    } else {
      return res.status(200).json({ data: "error" });
    }
  } catch (error) {
    console.log(error);
  }
};
