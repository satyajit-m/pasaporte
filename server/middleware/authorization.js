const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = async (req, res, next) => {
  try {
    const jwtToken = req.header("token");

    if (!jwtToken) {
      res.status(403).send("Not Authorized");
    }

    const payload = jwt.verify(jwtToken, process.env.jwtSecret, function (
      err,
      decoded
    ) {
      if (err) {
        res.status(403).json("Not Authorized");
      } else {
        req.user = decoded.user;

        next();
      }
    });
  } catch (err) {
    console.error(err.message);
    return res.status(403).send("Not Authorized");
  }
};
