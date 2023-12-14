const companiesCollection = require("../db").db().collection("companies");
const ObjectID = require("mongodb").ObjectID;
const bcrypt = require("bcrypt");
// const { ObjectID } = require("mongodb");

let Company = function (data) {
  this.data = data;
  this.errors = [];
};

Company.prototype.cleanUp = function () {
  this.data = {
    // To identify the recruiter of the company
    recruiterId: new ObjectID(this.data.recruiterId),
    recruiterPost: this.data.recruiterPost, // Recruiter designation

    // Company Profile
    companyName: this.data.companyName,
    companyLogo: this.data.companyLogo, // Not necessary
    companyIndustry: this.data.companyIndustry, // Dropdown
    companyAddress: this.data.companyAddress, // Text
    noOfEmployees: this.data.noOfEmployees, // Dropdown shown in naukri app
    companyDescription: this.data.companyDescription,
    media: {
      // Not necessary
      videoLink: this.data.videoLink, // Youtube Link
      companyImages: this.data.companyImages, // Image
    },
    website: this.data.website, // Not necessary
    companyEmail: this.data.companyEmail,
    contactNo: this.data.contactNo,
    socialLinks: [this.data.socialLinks], // Not necessary
    createdDate: new Date(),
  };
};

Company.prototype.setCompanyProfile = async function () {
  this.cleanUp();
  let data = await companiesCollection.insertOne(this.data);

  return data;
};

Company.prototype.getCompanyProfileById = async function (companyId) {
  let data = await companiesCollection.findOne({
    _id: new ObjectID(companyId),
  });

  return data;
};

Company.prototype.getCompanyIdByRecruiterId = async function (recruiterId) {
  let data = await companiesCollection.findOne({
    recruiterId: new ObjectID(recruiterId),
  });

  if (data != null) {
    return data._id;
  } else {
    return null;
  }
};

Company.prototype.getCompanyCount = async function () {
  let companyCount = await companiesCollection.countDocuments();
  return companyCount;
};
module.exports = Company;
