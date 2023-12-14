const recruitersCollection = require("../db").db().collection("recruiters");
const accountsCollection = require("../db").db().collection("accounts");
const ObjectID = require("mongodb").ObjectID;
const bcrypt = require("bcrypt");

let Recruiter = function (data) {
  this.data = data;
  this.errors = [];
};

Recruiter.prototype.cleanUp = function () {
  this.data = {
    recruiterFirstName: this.data.accountFirstName,
    recruiterLastName: this.data.accountLastName,
    recruiterEmail: this.data.accountEmail,
    recruiterPassword: this.data.accountPassword,
    recruiterVerified: false, // To verify the identity of recruiter (Company proof).
    recruiterIdentity: this.data.recruiterIdentity,
    createdDate: new Date(),
  };
};

Recruiter.prototype.registerRecruiter = async function () {
  this.cleanUp();
  if (!this.errors.length) {
    let salt = bcrypt.genSaltSync(10);
    this.data.recruiterPassword = bcrypt.hashSync(
      this.data.recruiterPassword,
      salt
    );

    let isEmailExist = await recruitersCollection.findOne({
      recruiterEmail: this.data.recruiterEmail,
    });
    console.log(isEmailExist);

    if (!isEmailExist) {
      let data = await recruitersCollection.insertOne(this.data);
      let recruiterId = data.insertedId;

      let recruiterProfile = await recruitersCollection.findOne({
        _id: new ObjectID(recruiterId),
      });

      return recruiterProfile;
    } else {
      return "Sorry! Email already exist";
    }
  }
};

Recruiter.prototype.getRecruiterById = async function (recruiterId) {
  let data = await recruitersCollection.findOne({
    _id: new ObjectID(recruiterId),
  });

  return data;
};

Recruiter.prototype.isVerified = async function (recruiterId) {
  let data = await recruitersCollection.findOne({
    _id: new ObjectID(recruiterId),
  });

  console.log(data);
  return data;
};

Recruiter.prototype.uploadIdentity = async function (recruiterId, identity) {
  let data = await recruitersCollection.findOneAndUpdate(
    {
      _id: new ObjectID(recruiterId),
    },
    {
      $set: {
        recruiterIdentity: identity,
      },
    }
  );

  if (data.ok) {
    return "uploaded";
  }
};

Recruiter.prototype.getRecruiterByEmail = async function (recruiterEmail) {
  let data = await recruitersCollection.findOne({
    recruiterEmail: recruiterEmail,
  });

  return data;
};

module.exports = Recruiter;
