const Account = require("../models/Account");
const User = require("../models/User");
const Recruiter = require("../models/Recruiter");
const Admin = require("../models/Admin");

// Account authentication
exports.registerAccount = async (req, res) => {
  try {
    console.log(req.body);
    let account = new Account(req.body);

    if (req.body.role == "user") {
      try {
        console.log("User if");
        let isSuccess = await account.registerAccount();

        if (isSuccess != null) {
          console.log("1222222");
          let user = new User(req.body);
          let data = await user.registerUser();

          console.log("dataaaaaaaaaaaaaaaaaa");
          console.log(data);

          if (data !== null) {
            console.log("Data received 11111122222222");
            console.log(data._id);
            return res.status(200).json({ data: isSuccess, id: data._id });
          } else {
            return res.status(400).json({ message: data });
          }
        } else {
          return res.status(400).json({ message: isSuccess });
        }
      } catch (error) {
        return res.status(400).json({ message: error });
      }
    } else if (req.body.role == "recruiter") {
      try {
        console.log("Recruiter if");
        let isSuccess = await account.registerAccount();
        console.log("mmmmmmmmm");
        console.log(isSuccess);

        if (isSuccess != null) {
          let recruiter = new Recruiter(req.body);
          let data = await recruiter.registerRecruiter();
          console.log("hmmmmm");
          console.log(data);

          if (data != null) {
            return res.status(200).json({ data: isSuccess, id: data._id });
          } else {
            return res.status(400).json({ message: data });
          }
        } else {
          return res.status(400).json({ message: isSuccess });
        }
      } catch (error) {
        return res.status(400).json({ message: error });
      }
    } else {
      return res.status(400).json({ message: "Please select the role" });
    }
  } catch (e) {
    res.status(400).json({ message: e });
    console.log(e);
  }
};

exports.loginAccount = async (req, res) => {
  try {
    console.log("Controller");
    console.log(req.body);
    let account = new Account();
    let data = await account.loginAccount(req.body);

    if (data == "Invalid Credentials") {
      return res.status(400).json({ message: data });
    } else {
      console.log(data);
      console.log("data.accountEmail");
      console.log(data.accountEmail);
      if (data.role == "user") {
        let user = new User();
        let userProfile = await user.getUserByEmail(data.accountEmail);

        return res.status(200).json({ data: data, id: userProfile._id });
      } else {
        let recruiter = new Recruiter();
        let recruiterProfile = await recruiter.getRecruiterByEmail(
          data.accountEmail
        );

        console.log("recruiterProfile");
        console.log(recruiterProfile._id);

        return res.status(200).json({ data: data, id: recruiterProfile._id });
      }
    }
  } catch (error) {
    res.status(400).json({ message: error });
    console.log(error);
  }
};
