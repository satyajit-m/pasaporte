const router = require("express").Router();

const pool = require("../db");
router.post("/", async (req, res) => {
  try {
    //req.user has the payload

    //destructure the application body
    const {
      name,
      dob,
      gender,
      fname,
      mname,
      address,
      dist,
      state,
      pin,
      mobile,
      user_id,
    } = req.body;

    //insert values into table
    const newApplication = await pool.query(
      "INSERT INTO applications (name, dob, gender, father_name, mother_name, address, district, state, pincode, mobile, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *",
      [
        name,
        dob,
        gender,
        fname,
        mname,
        address,
        dist,
        state,
        pin,
        mobile,
        user_id,
      ]
    );
    //console.log(newApplication);
    //const newVerification = await pool.query("INSERT INTO ")
    const appl_id = newApplication.rows[0]["appl_id"];
    if (appl_id) {
      const newVerification = await pool.query(
        "INSERT INTO verifications (appl_id) VALUES($1) RETURNING *",
        [appl_id]
      );
      res.status(200).json(newVerification.rows[0]);
    }
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});

router.post("/check", async (req, res) => {
  try {
    const { userId } = req.body;

    const applied = await pool.query(
      "SELECT *FROM applications WHERE user_id = $1",
      [userId]
    );
    if (applied.rows.length != 0) {
      return res.json({ applied: true });
    } else {
      return res.json({ applied: false });
    }
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});
module.exports = router;
