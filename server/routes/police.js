const router = require("express").Router();

const pool = require("../db");
router.get("/verified", async (req, res) => {
  //Check if user is authenticated, user is police through middleware and token

  try {
    const getVerified = await pool.query(
      "SELECT *FROM applications A INNER JOIN verifications B ON A.appl_id=B.appl_id WHERE B.police_ver='accepted'"
    );

    res.status(200).json({
      status: "success",
      results: getVerified.rows.length,
      data: {
        verifiedRecords: getVerified.rows,
      },
    });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});

router.get("/unverified", async (req, res) => {
  try {
    const getVerified = await pool.query(
      "SELECT *FROM applications A INNER JOIN verifications B ON A.appl_id=B.appl_id WHERE B.police_ver='pending'"
    );

    res.status(200).json({
      status: "success",
      results: getVerified.rows.length,
      data: {
        verifiedRecords: getVerified.rows,
      },
    });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});
module.exports = router;
