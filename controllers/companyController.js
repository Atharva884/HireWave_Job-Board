const Company = require("../models/Company");
const path = require("path");
const nodemailer = require("nodemailer");
const Recruiter = require("../models/Recruiter");

// We need to send a mail to the company that your company is registered by this recruiter in our platform
const sendMail = async (company, recruiter) => {
  console.log("mail func executed");

  const content = `
        <h1>Welcome to HireWave!</h1>

        <p>We are excited to inform you that one of your recruiters has recently accessed our platform and completed the creation of <strong>${company.companyName}'s</strong> profile on HireWave.</p>

        <p>Below, you'll find the details for your newly established company profile:</p>
        <ul>
            <li><strong>Company Name:</strong> ${company.companyName}</li>
            <li><strong>Recruiter's Name:</strong> ${recruiter.recruiterFirstName} ${recruiter.recruiterLastName}</li>
            <li><strong>Email Address:</strong> ${recruiter.recruiterEmail}</li>
        </ul>

        <p>Welcome aboard! We are thrilled to have <strong>${company.companyName}</strong> join our growing community on HireWave. Our platform offers an intuitive interface, robust features, and a suite of tools designed to elevate your recruitment processes.</p>

        <p>Should you have any inquiries, encounter challenges, or require assistance, our dedicated support team is readily available. Reach out to us at <a href="mailto:that.team404@gmail.com">that.team404@gmail.com</a> or <a href="tel:8356800661">8356800661</a>.</p>

        <p>Thank you for choosing HireWave for your recruitment endeavors. We eagerly anticipate supporting <strong>${company.companyName}</strong> in finding top-tier talent for your team.</p>

        <p>Best regards,<br>Team HireWave</p>
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
    to: company.companyEmail,
    subject: `Your ${company.companyName} has been registered in our platform by ${recruiter.recruiterFirstName} ${recruiter.recruiterLastName}`,
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

exports.setCompanyProfile = async (req, res) => {
  try {
    let multiFileNames = [];
    if (req.files.companyLogo) {
      console.log("hello companyLogo");
      let file = req.files.companyLogo;
      const fileName = new Date().getTime().toString() + "-" + file.name;
      const savePath = path.join(
        __dirname,
        "../public/",
        "companyLogos",
        fileName
      );
      await file.mv(savePath);
      req.body.companyLogo = fileName;
    }

    if (Array.isArray(req.files.companyImages)) {
      let files = req.files.companyImages;
      // console.log(files);
      const promises = files.map((file) => {
        const fileName = new Date().getTime().toString() + "-" + file.name;
        const savePath = path.join(__dirname, "../public/", fileName);
        multiFileNames.push(fileName);
        return file.mv(savePath);
      });
      await Promise.all(promises);
      req.body.companyImages = multiFileNames;
    }

    let company = new Company(req.body);
    let data = await company.setCompanyProfile();

    if (data.acknowledged) {
      let companyProfile = await company.getCompanyProfileById(data.insertedId);

      let recruiter = new Recruiter();
      let recruiterProfile = await recruiter.getRecruiterById(
        companyProfile.recruiterId
      );

      sendMail(companyProfile, recruiterProfile);
    }

    return res.status(200).json({ message: data });
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};
