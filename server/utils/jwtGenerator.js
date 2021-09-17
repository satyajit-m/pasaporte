const jwt = require("jsonwebtoken");

require(`dotenv`).config();

function jwtGenerator(user_id,user_type) {
  const payload = {
    user: user_id,
    type: user_type
  };

  return jwt.sign(payload, process.env.jwtSecret, { expiresIn: "1hr" });
}

module.exports = jwtGenerator; 