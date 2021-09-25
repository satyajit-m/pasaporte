import React, { Fragment, memo, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useUser, useUserId } from "../provider/AuthContext";
import ApplicationForm from "./ApplicationForm";
import AlreadyApplied from "./AlreadyApplied";

function Applicant() {
  const userId = useUserId();

  const [newApply, setNewApply] = useState(false);
  const [loading, setLoading] = useState(true);
  const [verifStatus, setVerifStatus] = useState({
    policeVer: "",
    adminVer: "",
  });

  async function isApplied() {
    try {
      if (userId != null) {
        const body = { userId };
        const response = await fetch("http://localhost:5000/apply/check", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });

        const parseRes = await response.json();
        setLoading(false);
        if (parseRes["applied"]) {
          setNewApply(false);
          setVerifStatus({
            ...verifStatus,
            policeVer: parseRes["verif"]["police_ver"],
            adminVer: parseRes["verif"]["admin_ver"],
          });
        } else {
          setNewApply(true);
        }
      }
    } catch (err) {
      console.error(err.message);
    }
  }
  useEffect(() => {
    isApplied();
  }, [userId]);
  return loading ? (
    <div>Loading</div>
  ) : !newApply ? (
    <AlreadyApplied verifStatus={verifStatus} />
  ) : (
    <Fragment>
      <div className="flex justify-center m-5 text-xl text-purple-700 font-bold">
        Apply For New Passport
      </div>
      <ApplicationForm />
    </Fragment>
  );
}

export default Applicant;
