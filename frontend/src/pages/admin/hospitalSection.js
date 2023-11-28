import React, { useEffect, useState } from "react";

const HospitalSection = ({ onData }) => {
  const [hospital, setHospital] = useState("");
  const [d_name_d, setD_name_d] = useState("");
  const [hospitallocation, setHospitallocation] = useState("");

  useEffect(() => {
    onData({ hospital, d_name_d, hospitallocation });
  }, [hospital, d_name_d, hospitallocation]);

  return (
    <>
      <div className="hospital-container">
        <label>
          <p>Hospital Name:</p>
          <input
            type="text"
            className="hospital"
            name="hospital"
            value={hospital}
            onChange={(e) => setHospital(e.target.value)}
          />
        </label>
        <label>
          <p>Discord user name:</p>
          <input
            type="text"
            className="d_name-d"
            name="d_name-d"
            value={d_name_d}
            onChange={(e) => setD_name_d(e.target.value)}
          />
        </label>
        <label>
          <p>Hospital Location:</p>
          <input
            type="text"
            className="hospital-location"
            name="hospitallocation"
            value={hospitallocation}
            onChange={(e) => setHospitallocation(e.target.value)}
          />
        </label>
      </div>
    </>
  );
};

export default HospitalSection;
