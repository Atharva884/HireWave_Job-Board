const User = require("../models/User");
const Company = require("../models/Company");
const path = require("path");

// exports.setImages = async (req, res) => {
//   try {
//     if (req.files.companyLogo) {
//       console.log("hello companyLogo");
//       let file = req.files.companyLogo;
//       const fileName = new Date().getTime().toString() + "-" + file.name;
//       const savePath = path.join(
//         __dirname,
//         "../public/",
//         "companyLogos",
//         fileName
//       );
//       await file.mv(savePath);
//       req.body.companyLogo = fileName;
//     }

//     let multiFileNames = [];
//     if (Array.isArray(req.files.companyImages)) {
//       let files = req.files.companyImages;
//       // console.log(files);
//       const promises = files.map((file) => {
//         const fileName = new Date().getTime().toString() + "-" + file.name;
//         const savePath = path.join(
//           __dirname,
//           "../public/",
//           "companyImages",
//           fileName
//         );
//         multiFileNames.push(fileName);
//         return file.mv(savePath);
//       });
//       await Promise.all(promises);
//       req.body.companyImages = multiFileNames;
//     }

//     console.log(req.body);
//     let company = new Company(req.body);
//     let data = await company.setCompanyProfile();

//     res.send("Done");
//   } catch (error) {}
// };

// SetUp Profile (Update the user collection)
exports.setUpProfile = async (req, res) => {
  try {
    // They should also give me email address or _id from session
    console.log(req.body);
    let user = new User();

    console.log(req.files.profileImage);
    console.log(req.files.certificateImage);

    if (req.files.profileImage) {
      console.log("hello profile");
      let file = req.files.profileImage;
      const fileName = new Date().getTime().toString() + "-" + file.name;
      const savePath = path.join(
        __dirname,
        "../public/",
        "profileImages",
        fileName
      );
      await file.mv(savePath);
      req.body.profileImage = fileName;
    }

    if (req.files.certificateImage) {
      console.log("hello certificates");
      let file = req.files.certificateImage;
      const fileName = new Date().getTime().toString() + "-" + file.name;
      const savePath = path.join(
        __dirname,
        "../public/",
        "certificates",
        fileName
      );
      await file.mv(savePath);
      req.body.certificateImage = fileName;
    }

    let data = await user.setUpProfile(req.body);

    return res.status(200).json({ message: data });
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};

exports.getUserByEmail = async (req, res) => {
  try {
    let user = new User();
    let data = await user.getUserByEmail(req.body.accountEmail);

    if (data != null) {
      return res.status(200).json({ data });
    } else {
      return res.status(400).json({ message: data });
    }
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};
