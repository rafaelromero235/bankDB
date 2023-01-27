const User = require('../models/users.model');
const Transfers = require('../models/transfers.model');

const createUser = async (req, res) => {
  try {
    const { name, password } = req.body;

    numerox = parseInt(Math.random() * 1000000);
    accountNumber = numerox;
    amount = 1000;

    const userCreated = await User.create({
      name,
      accountNumber,
      password,
      amount,
    });

    res.status(201).json({
      status: 'completed',
      message: 'user created successfully',
      userCreated,
    });
  } catch (error) {
    res.status(500).json({
      status: 'fail ',
      message: 'error internal server create',
    });
  }
};

const findUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      where: {
        status: true,
      },
    });
    res.status(200).json({
      status: 'sucesfully',
      messahe: 'users find it sucessfully',
      users,
    });
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      message: 'error internal server',
    });
  }
};

const findUserByAccount = async (req, res) => {
  try {
    const { accountNumber, password } = req.body;

    const user = await User.findOne({
      where: {
        accountNumber: accountNumber,
        status: true,
      },
    });
    if (user === null) {
      return res.status(404).json({
        status: 'error',
        message: 'bad credentials',
      });
    }
    if (user.password === password) {
      return res.status(200).json({
        status: 'suscessfully',
        message: 'user logged',
      });
    } else {
      return res.status(404).json({
        status: 'error',
        message: 'bad creedentials',
      });
    }
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      message: 'error internal server ',
    });
  }
};

const findUserHistory = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({
      where: {
        id: id,
        status: true,
      },
    });

    if (user === null) {
      return res.status(404).json({
        status: 'error',
        message: 'user not find it',
      });
    }

    const transfers = await Transfers.findAll({
      where: {
        senderUserId: user.id,
      },
    });
    return res.status(200).json({
      status: 'sucess',
      message: 'transfers find it sucessfully',
      transfers,
    });
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      message: 'error internal server ',
    });
  }
};

module.exports = { createUser, findUsers, findUserByAccount, findUserHistory };
