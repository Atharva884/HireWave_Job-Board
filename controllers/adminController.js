const Account = require("../models/Account");
const Admin = require("../models/Admin");
const Company = require("../models/Company");
const Job = require("../models/Job");
const User = require("../models/User");
const bcrypt = require("bcrypt");

exports.signin = (req, res) => {
  try {
    if (req.session.user == null) {
      res.render("admin/Authorization/signin");
    } else {
      res.redirect("/admin/dashboard");
    }
  } catch (error) {
    res.status(400).json({ message: error });
    console.log(error);
  }
};

exports.dashboard = async (req, res) => {
  try {
    if (req.session.user) {
      let company = new Company();
      let user = new User();
      let job = new Job();
      let companyCount = await company.getCompanyCount();
      let userCount = await user.getUserCount();
      let jobCount = await job.getJobCount();

      res.render("admin/adminDashboard", {
        companyCount: companyCount,
        usersCount: userCount,
        jobsCount: jobCount,
      });
    } else {
      res.redirect("/admin/signin");
    }
  } catch (error) {
    console.log(error);
  }
};

exports.loginAccount = async (req, res) => {
  try {
    console.log("Controller");
    console.log(req.body);
    let admin = new Admin();
    let data = await admin.loginAccount(req.body);

    console.log(data);
    if (data !== "Invalid Credentials") {
      console.log("inside");
      try {
        req.session.user = {
          _id: data._id.toString(),
          adminUsername: data.adminUsername,
          adminEmail: data.adminEmail,
          role: "admin",
        };
        req.session.save(() => {
          res.redirect("/admin/dashboard");
        });
      } catch (err) {
        console.log(err);
      }
    }

    // return res.status(200).json({ data });
  } catch (error) {
    res.status(400).json({ message: error });
    console.log(error);
  }
};

exports.logout = async (req, res) => {
  try {
    req.session.destroy(() => {
      res.redirect("/admin/signin");
    });
  } catch (error) {
    console.log(error);
  }
};

//manage Users
exports.getUsers = async (req, res) => {
  console.log("inside controller");
  try {
    let admin = new Admin();
    let data = await admin.getAllUsers();

    if (data != "Error") {
      if (req.session.user) {
        res.status(200).render("admin/viewUsers", { allUsers: data });
      } else {
        res.redirect("/admin/signin");
      }
    } else {
      res.status(400).send(data);
    }
  } catch (error) {
    console.log(error);
    return "Error";
  }
};

exports.getUser = async (req, res) => {
  console.log("inside controller");
  try {
    let id = req.params.id;
    let admin = new Admin();
    let data = await admin.getUser(id);
    console.log("back to controller");
    console.log(data);

    if (data != "Error") {
      if (req.session.user) {
        res.status(200).render("admin/userProfile", { user: data });
      } else {
        res.redirect("/admin/signin");
      }
    } else {
      res.status(400).send(data);
    }
  } catch (error) {
    console.log(error);
  }
};

exports.deleteUser = async (req, res) => {
  console.log("inside controller");
  try {
    let adminId = req.session.user._id;
    console.log("adminId");
    console.log(adminId);
    let password = req.body.adminPassword;
    console.log("password");
    console.log(password);
    let admin = new Admin();
    let adminProfile = await admin.getAdminById(adminId);
    // let verifyAdmin = await admin.confirmPassword(adminId, password);

    let adminPassword = adminProfile.adminPassword;
    let isVerified = await bcrypt.compareSync(password, adminPassword);

    if (isVerified) {
      try {
        let id = req.params.id;

        let result = await admin.deleteUser(id);

        if (result.isDeleted) {
          let account = new Account();
          let accountProfile = await account.deleteAccountByEmail(result.email);

          req.flash("success", "user has been deleted");
        } else {
          req.flash("errors", "failed to delete user!");
        }

        res.redirect("/admin/users");
      } catch (error) {
        console.log(error);
        req.flash("errors", "failed to delete user!");
      }
    } else {
      req.flash("errors", "Invalid Credentials!");
      res.redirect("/admin/users");
    }
  } catch (error) {
    console.log(error);
  }
};

//manage Compnay Profiles
exports.getCompanies = async (req, res) => {
  try {
    let admin = new Admin();
    let data = await admin.getAllCompanies();

    if (data != "Error") {
      if (req.session.user) {
        res.status(200).render("admin/viewCompanies", { allCompanies: data });
      } else {
        res.redirect("/admin/signin");
      }
    } else {
      res.status(400).send(data);
    }
  } catch (error) {
    console.log(error);
    return "Error";
  }
};

exports.getCompany = async (req, res) => {
  try {
    let id = req.params.id;
    let admin = new Admin();
    let data = await admin.getCompany(id);
    console.log("back to controller");
    console.log(data);

    if (data != "Error") {
      if (req.session.user) {
        res.status(200).render("admin/companyProfile", { company: data });
      } else {
        res.redirect("/admin/signin");
      }
    } else {
      res.status(400).send(data);
    }
  } catch (error) {
    console.log(error);
  }
};

exports.deleteCompany = async (req, res) => {
  console.log("inside controller");
  try {
    let adminId = req.session.user._id;
    console.log("adminId");
    console.log(adminId);
    let password = req.body.adminPassword;
    console.log("password");
    console.log(password);
    let admin = new Admin();
    let adminProfile = await admin.getAdminById(adminId);
    // let verifyAdmin = await admin.confirmPassword(adminId, password);

    let adminPassword = adminProfile.adminPassword;
    let isVerified = await bcrypt.compareSync(password, adminPassword);

    if (isVerified) {
      try {
        let id = req.params.id;

        let result = await admin.deleteCompany(id);

        if (result.isDeleted) {
          req.flash("success", "user has been deleted");
        } else {
          req.flash("errors", "failed to delete user!");
        }

        res.redirect("/admin/companies");
      } catch (error) {
        console.log(error);
        req.flash("errors", "failed to delete Company Profile!");
      }
    } else {
      req.flash("errors", "Invalid Credentials!");
      res.redirect("/admin/companies");
    }
  } catch (error) {
    console.log(error);
  }
};

//Clients(recruiter)
exports.getClients = async (req, res) => {
  console.log("inside controller");
  try {
    let admin = new Admin();
    let data = await admin.getAllClient();

    if (data != "Error") {
      if (req.session.user) {
        res.status(200).render("admin/viewClients", { allClient: data });
      } else {
        res.redirect("/admin/signin");
      }
    } else {
      res.status(400).send(data);
    }
  } catch (error) {
    console.log(error);
    return "Error";
  }
};

exports.deleteClient = async (req, res) => {
  console.log("inside controller");
  try {
    let adminId = req.session.user._id;
    console.log("adminId");
    console.log(adminId);
    let password = req.body.adminPassword;
    console.log("password");
    console.log(password);
    let admin = new Admin();
    let adminProfile = await admin.getAdminById(adminId);
    // let verifyAdmin = await admin.confirmPassword(adminId, password);

    let adminPassword = adminProfile.adminPassword;
    let isVerified = await bcrypt.compareSync(password, adminPassword);

    if (isVerified) {
      try {
        let id = req.params.id;

        let result = await admin.deleteClient(id);

        if (result.isDeleted) {
          let account = new Account();
          let accountProfile = await account.deleteAccountByEmail(result.email);

          req.flash("success", "user has been deleted");
        } else {
          req.flash("errors", "failed to delete user!");
        }

        res.redirect("/admin/clients");
      } catch (error) {
        console.log(error);
        req.flash("errors", "failed to delete client!");
      }
    } else {
      req.flash("errors", "Invalid Credentials!");
      res.redirect("/admin/clients");
    }
  } catch (error) {
    console.log(error);
  }
};

//Verify Client
exports.verifyClient = async (req, res) => {
  let clientId = req.params.id;
  console.log(clientId);
  let admin = new Admin();
  let result = await admin.verifyClient(clientId);
  try {
    if (result == "ok") {
      console.log(result);
      res.redirect("/admin/clients");
    } else {
      console.log("error");
      res.redirect("/admin/clients");
    }
  } catch (error) {
    console.log(error);
  }
};

//access client
exports.accessClient = async (req, res) => {
  console.log("inside access client");
  if (req.session.user) {
    let id = req.params.id;
    console.log(id);
    let admin = new Admin();
    let data = await admin.getClient(id);
    console.log("data");
    console.log(data);
    res.render("admin/verifyClient", { data: data });
  } else {
    res.redirect("admin/signin");
  }
};
