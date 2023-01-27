const User = require('../models/users.model');
const Transfers = require('../models/transfers.model');

const createTransfer = async (req, res) => {
  try {
    const { senderUserId, receiverUserId, amount } = req.body;
    const receiver = await User.findOne({
      where: {
        id: receiverUserId,
        status: true,
      },
    });

    if (receiver === null) {
      return res.status(404).json({
        status: 'error',
        message: 'receiver not find it',
      });
    }
    const sender = await User.findOne({
      where: {
        id: senderUserId,
        status: true,
      },
    });
    if (sender === null) {
      return res.status(404).json({
        status: 'error',
        message: 'sender not found',
      });
    }
    if (amount > sender.amount) {
      return res.status(400).json({
        status: 'error',
        message: 'insufficient balance',
      });
    }
    const newAmountReceiver = parseFloat(receiver.amount) + parseFloat(amount);
    console.log(receiver.amount);
    console.log(amount);
    console.log(newAmountReceiver);

    const receiverUpdated = await receiver.update({
      amount: newAmountReceiver,
    });
    const newAmountSender = parseFloat(sender.amount) - parseFloat(amount);
    const senderUpdated = await sender.update({
      amount: newAmountSender,
    });

    const transferCreated = await Transfers.create({
      amount,
      senderUserId,
      receiverUserId,
    });
    return res.status(200).json({
      status: 'sucess',
      message: 'successful transfer',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'fail ',
      message: 'error internal server',
    });
  }
};

module.exports = { createTransfer };
