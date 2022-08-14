const TransactionOp = require("../models/transaction_model");
const UserOp = require("../models/user_model");
const HistoryOp = require("../models/history_model");


class Transaction {
  constructor(){
    
  }

  static async do_transaction(amount, sender_email, receiver_email, transaction_type) {
    const attempt = await TransactionOp.save_transaction(amount, sender_email, receiver_email, transaction_type);
    if (!attempt.OK) {
      // console.log("attempt");
      return attempt;
    }

    const sender = await UserOp.modify_balance(sender_email, -amount);
    if (!sender.OK) {
      // console.log("sender");
      return sender;
    }
    
    const receiver = await UserOp.modify_balance(receiver_email, amount);
    if (!receiver.OK) {
      // console.log("receiver");
      return receiver;
    }
    
    const history = await HistoryOp.save_history(attempt.transaction._id, sender_email);
    if (!history.OK) {
      // console.log("history");
      return history;
    }

    return { OK: true, msg: "Transaction successful", transaction: attempt };
  }
}

module.exports = Transaction;