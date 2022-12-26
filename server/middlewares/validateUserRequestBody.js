const User = require("../models/user.model");
const isValidMobileNo = (mobileNo) => {
  return mobileNo.match(/^\d{10}$/);
};

const UserAddBody = async (req, res, next) => {
  try {
    if (!req.body.name) {
      return res.status(400).send({
        message: "Failed! User name is not provided",
      });
    }

    if (!req.body.userId) {
      return res.status(400).send({
        message: "Failed! UserId is not provided",
      });
    }

    const user = await User.findOne({ userId: req.body.userId });

    if (user) {
      return res.status(400).send({
        message: "Failed! userId is already taken",
      });
    }

    if (!req.body.mobileNo) {
      return res.status(400).send({
        message: "Failed! mobileNo is not provided",
      });
    }

    if (!isValidMobileNo(req.body.mobileNo)) {
      return res.status(400).send({
        message:
          "Failed! Not a valid Mobile No. Mobile number  must be 10 to 25 characters ",
      });
    }

    next();
  } catch {
    console.log(
      "#### Error while velidating Add user request body ##### ",
      err.message
    );
    res.status(500).send({
      message: "Internal server error while Add User validation",
    });
  }
};

const UserUpdateBody = (req, res, next) => {
  if (req.body.mobileNo && !isValidMobileNo(req.body.mobileNo)) {
    return res.status(400).send({
      message: "Failed! Not a valid MobileNo ",
    });
  }

  next();
};

const validateUserRequestBodies = {
  UserAddBody,
  UserUpdateBody,
};

module.exports = validateUserRequestBodies;
