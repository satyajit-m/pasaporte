const pool = require("../db");
const bcrypt = require("bcrypt");
const router = require("express").Router();
const jwtGenerator = require("../utils/jwtGenerator");
const validInfo = require("../middleware/validInfo");
const authorization = require("../middleware/authorization");

//registering

router.post("/register", validInfo, async (req, res) => {
  try {
    // 1.destructure the req.body (name, email, password)

    const { name, email, password, type } = req.body;

    //2. check if user exist (if exist throw error)

    const user = await pool.query("SELECT *FROM users WHERE user_email = $1", [
      email,
    ]);

    if (user.rows.length != 0) {
      return res.status(401).json(" User Already Exists ");
    }
    //3. Bcrypt user password

    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);

    const bcryptPassword = await bcrypt.hash(password, salt);

    //4. Enter the user inside db

    const newUser = await pool.query(
      "INSERT INTO users (user_name, user_email, user_password, user_type) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, email, bcryptPassword, type]
    );

    //5. Generate ouw JWT token

    const token = jwtGenerator(newUser.rows[0].user_id, newUser.rows[0].user_type);

    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).json(" Server Timeout ");
  }
});

//login route

router.post("/login", validInfo, async (req, res) => {
  try {
    //1. destructure the req.body

    const { email, password } = req.body;

    //2. check if user doesnt exist ( if not then we throw error)

    const user = await pool.query(" SELECT *FROM users WHERE user_email = $1", [
      email,
    ]);

    if (user.rows.length === 0) {
      return res.status(401).json("User Doesnt Exists");
    }

    //3. check if incoming password is the same as db password

    const validPassword = await bcrypt.compare(
      password,
      user.rows[0].user_password
    );

    if (!validPassword) {
      return res.status(401).json(" Password is Incorrect ");
    }

    //4. give them jwt token
    const token = jwtGenerator(user.rows[0].user_id, user.rows[0].user_type);
    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).json(" Server Timeout ");
  }
});

router.get("/is-verify", authorization, async (req, res) => {
  try {
    res.json(true);
  } catch (err) {
    console.error(err.message);
    res.status(500).json(" Server Timeout ");
  }
});

module.exports = router;
