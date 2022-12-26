const User = require("../models/user.model");

exports.addUser = async (req, res) => {
  try {
    const userObj = {
      name: req.body.name,
      userId: req.body.userId,
      img: req.body.img,
      mobileNo: req.body.mobileNo,
    };

    const user = await User.create(userObj);
    res.status(201).send(user);
  } catch (err) {
    console.log("Error While Adding new user opreation", err.message);
    res.status(500).send({
      message: "Some Internal server error",
    });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send(users);
  } catch (err) {
    console.log("Error While getting all users opreation", err.message);
    res.status(500).send({
      message: "Some Internal server error",
    });
  }
};

exports.findByUserId = async (req, res) => {
  try {
    const user = req.userInParams;

    res.status(200).send(user);
  } catch (err) {
    console.log("#### Error while searching for the user #### ", err.message);
    res.status(500).send({
      message: "Internal server error while fetching data",
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = req.userInParams;

    user.name = req.body.name ? req.body.name : user.name;
    user.img = req.body.img ? req.body.img : user.img;
    user.mobileNo = req.body.mobileNo ? req.body.mobileNo : user.mobileNo;

    const updatedUser = await user.save();

    console.log(`#### ${updatedUser.name} data updated ####`);
    res.status(200).send(objectConverter.singleUserResponse(updatedUser));
  } catch (err) {
    console.log("#### Error while updating user data #### ", err.message);
    res.status(500).send({
      message: "Internal server error while updating user data",
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = req.userInParams;

    await movie.remove();

    console.log(`#### User deleted ####`);
    res.status(200).send({ message: "User deleted" });
  } catch (err) {
    console.log("#### Error while deleting user #### ", err.message);
    res.status(500).send({
      message: "Internal server error while deleting user",
    });
  }
};
