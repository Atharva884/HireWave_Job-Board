let Recruiter = require("../models/Recruiter");
const path = require("path");

exports.uploadIdentity = async (req, res) => {
  try {
    console.log("yee");
    const { recruiterId, identity } = req.body;
    // let identity;

    // if (req.files.identity) {
    //   console.log("hello identity");
    //   let file = req.files.identity;
    //   const fileName = new Date().getTime().toString() + "-" + file.name;
    //   const savePath = path.join(__dirname, "../public/", "identity", fileName);
    //   await file.mv(savePath);
    //   identity = fileName;
    // }

    let recruiter = new Recruiter();
    console.log("log");
    console.log(req.body.indentity);
    console.log(recruiterId, identity);
    let data = await recruiter.uploadIdentity(recruiterId, identity);

    return res.status(200).json({ message: data });
  } catch (error) {
    return res.status(400).json({ message: error });
  }
};
