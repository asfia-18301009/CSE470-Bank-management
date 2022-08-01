const UserOp = require("../models/user_model");

class User {
  constructor(){
    this.first_name = "";
    this.last_name = "";
    this.phone_no = "";
    this.email = "";
    this.password = "";
    this.nID = "";
    this.user_ID = "";
    this.username = "";
    this.balance = 0;
    this.is_agent = false;
  }

  static async login(email, password){
    const attempt = await UserOp.verify_user(email, password);
    if(attempt.OK){
      let temp = new User();
      temp.first_name = attempt.user.first_name;
      temp.last_name = attempt.user.last_name;
      temp.phone_no = attempt.user.phone_no;
      temp.email = attempt.user.email;
      temp.password = attempt.user.password;
      temp.nID = attempt.user.nID;
      temp.user_ID = attempt.user._id;
      temp.username = attempt.user.username;
      temp.balance = attempt.user.balance;
      temp.is_agent = attempt.user.is_agent;
      return { OK: true, user: temp };
    } else {
      return attempt;
    }
  }

  static async signup(first_name, last_name, phone_no, email, password, nID, username, balance, is_agent){
    const attempt = await UserOp.add_new_user(first_name, last_name, phone_no, email, password, nID, username, balance, is_agent);
    return true;
  }
}

module.exports = User;