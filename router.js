const router = require("express").Router();
const userController = require("./controllers/userController");
const accountController = require("./controllers/accountController");
const companyController = require("./controllers/companyController");
const jobController = require("./controllers/jobController");
const recruiterController = require("./controllers/recruiterController");
const adminController = require("./controllers/adminController");
const path = require("path");
const convertExcelToJson = require("convert-excel-to-json");
const fs = require("fs-extra");

const {
  validateAccountSignUp,
  validateAccountSignIn,
  validateProfile,
  validateAdminLogin,
} = require("./middlewares/middleware");

// Test API
// router.get("/", (req, res) => {
//   res.render("form.ejs");
// });
// router.post("/user/setImage", userController.setImages);

// Account Controller (For both User & Recruiter)
router.post(
  "/account/registerAccount",
  validateAccountSignUp,
  accountController.registerAccount
);
router.post(
  "/account/loginAccount",
  validateAccountSignIn,
  accountController.loginAccount
);

// User Controller
router.post("/user/setUpProfile", validateProfile, userController.setUpProfile);
router.post("/user/getUserByEmail", userController.getUserByEmail);

// Recruiter Controller
router.post("/recruiter/uploadIdentity", recruiterController.uploadIdentity);

// // Can be done by admin
// router.post('/recruiter/verifyIdentity', recruiterController.verifyIdentity);

// Company Controller
router.post("/company/setCompanyProfile", companyController.setCompanyProfile);

// Job Controller
router.post("/job/postJob", jobController.postJob);
router.post("/job/getJobById", jobController.getJobById);
router.post("/job/getJobsByRecruiterId", jobController.getJobsByRecruiterId);
router.get("/job/getAllJobs", jobController.getJobs);
router.post(
  "/job/shortlistJobsByUserIds",
  jobController.shortlistJobsByUserIds
);
router.post("/job/finalJobHired", jobController.finalJobHired);
// get hires count
router.post("/job/getHiredCount", jobController.getHiredCount);
// get recruiter job post
router.post(
  "/job/getRecruiterJobPostCount",
  jobController.getRecruiterJobPostCount
);

// User apply to job, we need to store the user id in the applied object
router.post("/job/applyToJob", jobController.applyToJob);

// Admin Routes
router.get("/admin/signin", adminController.signin);
router.get("/admin/dashboard", adminController.dashboard);

//logout
router.post("/admin/logout", adminController.logout);
//login
router.post("/admin/login", validateAdminLogin, adminController.loginAccount);

//users
router.get("/admin/users", adminController.getUsers);

router.get("/admin/userProfile/:id", adminController.getUser);

router.post("/admin/deleteUser/:id", adminController.deleteUser);

//company
router.get("/admin/companies", adminController.getCompanies);

router.get("/admin/companyProfile/:id", adminController.getCompany);

router.post("/admin/deleteCompany/:id", adminController.deleteCompany);

//clients(recruiter)
router.get("/admin/clients", adminController.getClients);

router.post("/admin/deleteClient/:id", adminController.deleteClient);

//temporary

router.get("/admin/verifyClient/:id", adminController.accessClient);
router.post("/admin/verifyClient/:id", adminController.verifyClient);

// Test api
router.get("/abc", (req, res) => {
  res.json({ message: "Hello" });
});

router.post("/xyz", (req, res) => {
  console.log(req.body.name);
  res.json({ message: req.body.name });
});

router.get("/", (req, res) => {
  res.render("home");
});

router.post("/sendQuiz", (req, res) => {
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
        res.json(excelData);
      } else {
        console.error("File does not exist:", savePath);
        return res.status(500).send("File does not exist");
      }
    });
  }
});

module.exports = router;
