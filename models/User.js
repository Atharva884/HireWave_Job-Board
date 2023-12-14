const usersCollection = require("../db").db().collection("users");
const accountsCollection = require("../db").db().collection("accounts");
const ObjectID = require("mongodb").ObjectID;
const bcrypt = require("bcrypt");

let User = function (data) {
  this.data = data;
  this.errors = [];
};

User.prototype.cleanUp = function () {
  this.data = {
    userFirstName: this.data.accountFirstName,
    userLastName: this.data.accountLastName,
    userEmail: this.data.accountEmail,
    userPassword: this.data.accountPassword,

    // Fetch from the body
    // Professional Information
    professionalRole: this.data.professionalRole,
    workExperience: [
      {
        title: this.data.title,
        company: this.data.company,
        location: this.data.location, // TextField
        workIndustry: this.data.workIndustry, // DropDown
        workCountry: this.data.workCountry, // Dropdown of various countries
        startDate: new Date(this.data.startDate),
        endDate: new Date(this.data.endDate),
        description: this.data.description,
      },
    ],
    education: [
      {
        school: this.data.school,
        degree: this.data.degree, // Drop Down
        field: this.data.field,
        educationStartDate: new Date(this.data.educationStartDate),
        educationEndDate: new Date(this.data.educationEndDate),
      },
    ],
    languages: [], // Dropdown
    skills: [], // API key se hoga kaam
    bio: this.data.bio,

    projects: [
      {
        projectName: this.data.projectName,
        projectDescription: this.data.projectDescription,
        associatedWith: this.data.associatedWith, // Dropdown mai work experience plus education. We need to store in state
        projectStartDate: new Date(this.data.projectStartDate),
        projectEndDate: new Date(this.data.projectStartDate),
      },
    ],
    certificates: [
      {
        certificateName: this.data.certificateName,
        certificateImage: this.data.certificateImage,
        certificateDescription: this.data.certificateDescription,
      },
    ],
    credits: Number(50),

    // Personal Information
    dateOfBirth: new Date(this.data.dateOfBirth), // By default, we need to select
    gender: this.data.gender,
    // Dropdown of various countries, states and cities
    country: this.data.country,
    city: this.data.city,
    state: this.data.state,
    address: this.data.address,
    pinCode: Number(this.data.pinCode),
    contactNumber: this.data.contactNumber,
    profileImage: this.data.profileImage,
    createdDate: new Date(),
  };
};

User.prototype.registerUser = async function () {
  this.cleanUp();
  if (!this.errors.length) {
    console.log("User model");
    console.log("this.data");
    console.log(this.data);
    let salt = bcrypt.genSaltSync(10);
    this.data.userPassword = bcrypt.hashSync(this.data.userPassword, salt);

    let isEmailExist = await usersCollection.findOne({
      userEmail: this.data.userEmail,
    });
    console.log(isEmailExist);

    if (!isEmailExist) {
      console.log("log");
      let user = await usersCollection.insertOne(this.data);

      console.log("user");
      console.log(user);
      let userId = user.insertedId;
      let userProfile = await usersCollection.findOne({
        _id: new ObjectID(userId),
      });

      return userProfile;
    } else {
      return "Sorry! Email already exist";
    }
  }
};

// Setting up a profile
User.prototype.setUpProfile = async function (userProfile) {
  let _id = userProfile._id;

  let data = await usersCollection.findOneAndUpdate(
    { _id: new ObjectID(_id) },
    {
      $set: {
        professionalRole: userProfile.professionalRole,
        workExperience: {
          title: userProfile.title,
          company: userProfile.company,
          location: userProfile.location, // TextField
          workCountry: userProfile.country, // Dropdown of various countries
          startDate: new Date(userProfile.startDate),
          endDate: new Date(userProfile.endDate),
          description: userProfile.description,
        },
        education: {
          school: userProfile.school,
          degree: userProfile.degree,
          field: userProfile.field,
          educationStartDate: new Date(userProfile.educationStartDate),
          educationEndDate: new Date(userProfile.educationEndDate),
        },
        languages: userProfile.languages, // Dropdown
        skills: userProfile.skills, // API key se hoga kaam
        bio: userProfile.bio,
        services: userProfile.services, // Dropdown of all services
        projects: {
          projectName: userProfile.projectName,
          projectDescription: userProfile.projectDescription,
          associatedWith: userProfile.associatedWith, // Dropdown mai work experience plus education
          projectStartDate: new Date(userProfile.projectStartDate),
          projectEndDate: new Date(userProfile.projectEndDate),
        },
        certificates: [
          {
            certificateName: userProfile.certificateName,
            certificateImage: userProfile.certificateImage,
            certificateDescription: userProfile.certificateDescription,
          },
        ],
        dateOfBirth: new Date(userProfile.dateOfBirth),
        gender: userProfile.gender,

        // Dropdown of various countries, states and cities
        country: userProfile.country,
        city: userProfile.city,
        state: userProfile.state,
        address: userProfile.address,
        pinCode: Number(userProfile.pinCode),
        contactNumber: userProfile.contactNumber,
        profileImage: userProfile.profileImage,
        createdDate: new Date(),
      },
    }
  );

  return "ok";
};

User.prototype.getUserByEmail = async function (accountEmail) {
  console.log("accountEmail");
  console.log(accountEmail);
  let data = await usersCollection.findOne({ userEmail: accountEmail });

  return data;
};

User.prototype.getUserCount = async function () {
  let userCount = await usersCollection.countDocuments();
  return userCount;
};

User.prototype.getUserById = async function (userId) {
  let user = await usersCollection.findOne({ _id: new ObjectID(userId) });

  return user;
};
module.exports = User;
