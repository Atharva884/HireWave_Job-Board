// admin.js
const adminCollection = require("../db").db().collection("admin");
const ObjectID = require("mongodb").ObjectID;
const bcrypt = require("bcrypt");
const userCollection = require("../db").db().collection("users");
const companyCollection = require("../db").db().collection("companies");
const recruiterCollection = require("../db").db().collection("recruiters");



let Admin = function (data) {
  this.data = data;
  this.errors = [];
};

Admin.prototype.cleanUp = function () {
  this.data = {
    adminEmail: this.data.adminEmail,
    adminUsername: this.data.adminUsername,
    adminPassword: this.data.adminPassword,
    createdDate: new Date(),
  };
};


Admin.prototype.loginAccount = async function (accountData) {
  console.log("Admin");
  console.log(accountData);
  const { adminUsername, adminPassword } = accountData;

  let isUsernameExist = await adminCollection.findOne({
    adminUsername,
  });

  if (!isUsernameExist) {
    return "Invalid Credentials";
  }

  let originalPassword = await bcrypt.compareSync(
    adminPassword,
    isUsernameExist.adminPassword
  );

  if (!originalPassword) {
    return "Invalid Credentials";
  }

  return isUsernameExist;
};


//Users
Admin.prototype.getAllUsers = async function(){

  try{
    let allUsers = await userCollection.find({}).toArray();
    return allUsers
  }
  catch (err) {
    console.log(err);
    return "Error"
  }
  
}

Admin.prototype.getUser = async function(id){
  try{
    let userId = new ObjectID(id); 
    let data = await userCollection.findOne({_id :userId})
    console.log(data)

    return data;
  }
  catch (err) {
    console.log(err)
    return "Error";
  }
}

Admin.prototype.getAdminById = async function(id) {
  try{
    let adminId = new ObjectID(id); 
    let data = await adminCollection.findOne({_id :adminId})
    console.log(data)

    return data;
  }
  catch (err) {
    console.log(err)
    return "Error";
  }
}


// Admin.prototype.confirmPassword = async function(username,password){
//   try{
    
//  //get username with session
//     let adminDoc = await adminCollection.findOne({adminUsername : username})
//     let adminPassword = adminDoc.adminPassword;
//     let originalPassword = await bcrypt.compareSync( //error here!
//       password,
//       adminPassword,
//     );

//     if(!originalPassword) {
//       return "Error";
//     }
//     else{
//       return "ok"
//     }
//   }
//   catch (err) {
//     console.log(err)
//     return "Error";
//   }
// }
Admin.prototype.deleteUser = async function(id){
  try{
    let userId = new ObjectID(id); 
    const userEmail = await userCollection.findOne({_id: userId})
    //delete the user
    const result = await userCollection.deleteOne({ _id: userId });

    if(result.acknowledged == true){
      return {
        email: userEmail.userEmail,
        isDeleted: true,
      } 




    }
    else {
      return "Error";
    }
  }
  catch (err) {
  console.log(err)
  return "Error";
  }

}


//Companies
Admin.prototype.getAllCompanies = async function(){
  try{
    let allCompanies = await companyCollection.find({}).toArray();
    return allCompanies
  }
  catch (err) {
    console.log(err);
    return "Error"
  }
}

Admin.prototype.getCompany = async function(id){
  try{
    let userId = new ObjectID(id); 
    let data = await companyCollection.findOne({_id :userId})
    console.log(data)

    return data;
  }
  catch (err) {
    console.log(err)
    return "Error";
  }
}

Admin.prototype.deleteCompany = async function(id){
  try{
    let companyId = new ObjectID(id); 
    const companyEmail = await companyCollection.findOne({_id: companyId})
    //delete the user
    const result = await companyCollection.deleteOne({ _id: companyId });

    if(result.acknowledged == true){
      return {
        email: companyEmail.companyEmail,
        isDeleted: true,
      } 

    }
    else {
      return "Error";
    }
  }
  catch (err) {
  console.log(err)
  return "Error";
  }

}

//client(recruiter)
Admin.prototype.getAllClient = async function(){

  try{
    let allClients = await recruiterCollection.find({}).toArray();
    return allClients
  }
  catch (err) {
    console.log(err);
    return "Error"
  }
  
}

Admin.prototype.getClient = async function(id){
  try{
    let clientId = new ObjectID(id); 
    let data = await recruiterCollection.findOne({_id :clientId})
    console.log(data)

    return data;
  }
  catch (err) {
    console.log(err)
    return "Error";
  }
}

Admin.prototype.deleteClient = async function(id){
  try{
    let clientId = new ObjectID(id); 
    const recruiterEmail = await recruiterCollection.findOne({_id: clientId})
    //delete the user
    const result = await recruiterCollection.deleteOne({ _id: clientId });

    if(result.acknowledged == true){
      return {
        email: recruiterEmail.recruiterEmail,
        isDeleted: true,
      } 




    }
    else {
      return "Error";
    }
  }
  catch (err) {
  console.log(err)
  return "Error";
  }

}

//verify client
Admin.prototype.verifyClient = async function(id) {
  // let result = recruiterCollection.update({'title':'MongoDB Overview'},{$set:{'title':'New MongoDB Tutorial'}})
  try{

    let data = await recruiterCollection.updateOne({_id: ObjectID(id)},{ $set: { recruiterVerified: true}})
    console.log(data)
    if (data.acknowledged) {
      return "ok"
    }else{
      return "Error"
    }
  }
  catch(err) {
    console.log(err)
  }
}

module.exports = Admin;
