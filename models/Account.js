const accountsCollection = require("../db").db().collection("accounts");
const ObjectID = require("mongodb").ObjectID;
const bcrypt = require("bcrypt");
const { ObjectId } = require("mongodb");

let Account = function (data) {
  this.data = data;
  this.errors = [];
};

Account.prototype.cleanUp = function () {
  this.data = {
    accountFirstName: this.data.accountFirstName,
    accountLastName: this.data.accountLastName,
    accountEmail: this.data.accountEmail,
    accountPassword: this.data.accountPassword,
    accountContactNo: this.data.accountContactNo,
    role: this.data.role,
    createdDate: new Date(),
  };
};

Account.prototype.registerAccount = async function () {
  this.cleanUp();
  if (!this.errors.length) {
    let salt = bcrypt.genSaltSync(10);
    this.data.accountPassword = bcrypt.hashSync(
      this.data.accountPassword,
      salt
    );

    let isEmailExist = await accountsCollection.findOne({
      accountEmail: this.data.accountEmail,
    });
    console.log(isEmailExist);

    if (!isEmailExist) {
      let data = await accountsCollection.insertOne(this.data);

      let account = await accountsCollection.findOne({
        _id: new ObjectId(data.insertedId),
      });

      return account;
    } else {
      return "Sorry! Email already exist";
    }
  }
};

Account.prototype.loginAccount = async function (accountData) {
  console.log("Model");
  console.log(accountData);
  const { accountEmail, accountPassword } = accountData;

  let isEmailExist = await accountsCollection.findOne({
    accountEmail,
  });

  if (!isEmailExist) {
    return "Invalid Credentials";
  }

  let originalPassword = await bcrypt.compareSync(
    accountPassword,
    isEmailExist.accountPassword
  );

  if (!originalPassword) {
    return "Invalid Credentials";
  }

  return isEmailExist;
};


































Account.prototype.deleteAccountByEmail = async  function (email) {
  try{ 
    //delete Account
    const result = await accountsCollection.deleteOne({ accountEmail: email });
    if(result.acknowledged){
      return "ok"
    }
    else {
      return "Error"
    }
  }
  catch(err) {
    console.error(err);
  }
}

module.exports = Account;
