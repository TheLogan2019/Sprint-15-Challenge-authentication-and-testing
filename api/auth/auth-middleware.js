const authCom = require("./auth-model");

const checkForExistingUser = async (req, res, next) => {
  const [user] = await authCom.findByUsername(req.body.username);
  console.log(user);
  try {
    if (user) {
      next({ status: 422, message: "Username taken" });
    } else {
      req.user = user;
      next();
    }
  } catch (err) {
    next(err);
  }
};

const validateUsername = async (req, res, next) => {
  const [user] = await authCom.findByUsername(req.body.username);
  console.log(user);
  try {
    if (user) {
      req.user = user;
      next();
    } else {
      next({ status: 401, message: "Invalid credentials" });
    }
  } catch (err) {
    next(err);
  }
};

const validateCredentials = (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(401).json({
      message: "username and password required",
    });
  }
  next();
};

module.exports = {
  checkForExistingUser,
  validateUsername,
  validateCredentials,
};
