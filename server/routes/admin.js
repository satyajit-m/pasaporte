const router = require("express").Router();

const pool = require("../db");
router.get("/verified", async (req, res) => {
  //Check if user is authenticated, user is admin through middleware and token

  try {
      const getVerified = await pool.query(
      "SELECT *FROM applications A INNER JOIN verifications B ON A.appl_id=B.appl_id WHERE B.police_ver=true AND B.admin_verified=true"
    );

    const response = getVerified.rows;
    if (response.length != 0) {
      res.json(response);
    } else {
      res.json("No Verified Records Found");
    }
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});

router.get("/unverified", async (req, res) => {
  try {
    const getVerified = await pool.query(
      "SELECT *FROM applications A INNER JOIN verifications B ON A.appl_id=B.appl_id WHERE B.police_ver=true AND B.admin_verified=false"
    );

    const response = getVerified.rows;
    if (response.length != 0) {
      res.json(response);
    } else {
      res.json("No UnVerified Records Found");
    }
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});
module.exports = router;
