const userController = require("../controllers/user.controller");
const {
  validateIdInParams,
  validateUserRequestBodies,
} = require("../middlewares");

module.exports = (app) => {
  app.post(
    "/&quote/api/v1/users",
    [validateUserRequestBodies.UserAddBody],
    movieController.createNewMovie
  );
  app.get("/&quote/api/v1/users", userController.findAll);
  app.get(
    "/&quote/api/v1/users/:id",
    [validateIdInParams.userInParams],
    userController.findByUserId
  );
  app.put(
    "/&quote/api/v1/users/:id",
    [validateIdInParams.userInParams, validateUserRequestBodies.UserUpdateBody],
    userController.updateUser
  );
  app.delete(
    "/&quote/api/v1/users/:id",
    [validateIdInParams.userInParams],
    userController.deleteUser
  );
};
