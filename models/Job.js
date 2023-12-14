const { ObjectId } = require("mongodb");
const User = require("./User");

const jobsCollection = require("../db").db().collection("jobs");
const usersCollection = require("../db").db().collection("users");
const ObjectID = require("mongodb").ObjectID;

let Job = function (data) {
  this.data = data;
  this.errors = [];
};

Job.prototype.cleanUp = function () {
  this.data = {
    // They will give only recruiterId from session
    recruiterId: new ObjectID(this.data.recruiterId),

    companyId: new ObjectID(this.data.companyId),
    jobTitle: this.data.jobTitle,
    jobDescription: this.data.jobDescription,
    noOfCredits: Number(10), // need to be done
    jobType: this.data.jobType, // Dropdown (fulltime, parttime,contract,temporary,or permanent)
    experienceLevel: this.data.experienceLevel, // Dropdown (entry, intermediate, expert)
    educationLevel: this.data.educationLevel, // Dropdown
    skills: this.data.skills, // Skills API
    salary: this.data.salary,
    endDate: new Date(this.data.endDate),
    requirement: Number(this.data.requirement), // Company's requirement
    // noOfProposal: 0, // Job seeker apply for job
    hires: 0, // Recruiter hires the user based on various conditions
    jobStatus: "ongoing",
    location: this.data.location, // ongoing -> createdDate < endDate, cancelled -> createdDate > endDate || recruiter can cancel the job, completed -> hires == requirement. When recruiter cancels the job post, credits should be refunded to the user
    quiz: this.data.quiz,
    headerImage: this.data.headerImage,
    applied: [
      {
        userId: this.data.userId, // id
        status: this.data.applied, // applied
      },
    ],
    createdDate: new Date(),
  };
};

Job.prototype.postJob = async function () {
  this.cleanUp();
  console.log(this.data);
  let data = await jobsCollection.insertOne(this.data);

  return "ok";
};

Job.prototype.getJobCount = async function () {
  let jobCount = await jobsCollection.countDocuments();
  return jobCount;
};

Job.prototype.getJobsByRecruiterId = async function (recruiterId) {
  let jobs = await jobsCollection
    .find({
      recruiterId: new ObjectID(recruiterId),
    })
    .toArray();

  return jobs;
};

Job.prototype.getJobById = async function (jobId) {
  let job = await jobsCollection.findOne({ _id: new ObjectID(jobId) });

  console.log(job);

  // Array of objects
  let users = [];

  // Using Promise.all to wait for all asynchronous operations to complete
  await Promise.all(
    job.applied.map(async (value) => {
      let user = new User();
      let userId = value.userId;

      let userProfile = await user.getUserById(userId);
      console.log("userProfile");
      console.log(userProfile.userFirstName);

      users.push({
        userId: userProfile._id,
        userName: userProfile.userFirstName + " " + userProfile.userLastName,
        userImage: userProfile.profileImage,
        status: value.status,
      });
    })
  );

  console.log("userssss");
  console.log(users);

  return {
    users,
    job,
  };
};

Job.prototype.getAllJobs = async function () {
  try {
    let allJobs = await jobsCollection.find({}).toArray();
    return allJobs;
  } catch (err) {
    console.log(err);
    return "Error";
  }
};

Job.prototype.update = async function (updatedUser, jobId) {
  let result = await jobsCollection.findOneAndUpdate(
    {
      _id: new ObjectID(jobId),
    },

    {
      $set: {
        applied: updatedUser,
      },
    }
  );

  if (result.ok) {
    return "ok";
  } else {
    return "error";
  }
};

Job.prototype.hired = async function (updatedUsers, jobId) {
  let resukt = await jobsCollection.findOneAndUpdate(
    {
      _id: new ObjectID(jobId),
    },

    {
      $set: {
        applied: updatedUsers,
      },
    }
  );
};

Job.prototype.getRecruiterJobPostCount = async function (recruiterId) {
  let result = await jobsCollection
    .find({ recruiterId: new ObjectID(recruiterId) })
    .count();

  return result;
};

Job.prototype.applyToJob = async function (userId, jobId) {
  let user = new User();
  let userProfile = await user.getUserById(userId);
  console.log("userProfile");
  console.log(userProfile);
  if (userProfile !== null) {
    console.log("Ja na");
    let isCredits = userProfile.credits;
    if (isCredits == 0) {
      return "No enough credits";
    }
  }

  let job = await jobsCollection.findOneAndUpdate(
    { _id: new ObjectID(jobId) },
    {
      $push: {
        applied: {
          status: "applied",
          userId: userId,
        },
      },
    }
  );

  if (job.ok) {
    console.log(job);
    userProfile.credits = userProfile.credits - job.noOfCredits;
    console.log(userProfile.credits);
    console.log(job.noOfCredits);

    return "ok";
  }
};

module.exports = Job;
