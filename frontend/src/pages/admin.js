import React, { useState } from "react";
import TrafficSection from "./admin/trafficSection";
import HospitalSection from "./admin/hospitalSection";
import Adminlogin from "../helpers/admin";

//import AmbulanceSection from "./admin/AmbulanceSection";
const AdminPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profession, setProfession] = useState("");
  const [hospital, setHospital] = useState("");
  const [d_name_d, setD_name_d] = useState("");
  const [hospitallocation, setHospitallocation] = useState("");
  const [location, setLocation] = useState("");
  const [d_name, setD_name] = useState("");
  const [from1, setFrom1] = useState("");
  const [to1, setTo1] = useState("");
  const [from2, setFrom2] = useState("");
  const [to2, setTo2] = useState("");

  const { data_entry } = Adminlogin();

  const onDataHtp = (data) => {
    console.log(data);
    setHospital(data.hospital);
    setD_name_d(data.d_name_d);
    setHospitallocation(data.hospitallocation);
  };

  const onDataTrp = (data) => {
    console.log(data);
    setLocation(data.location);
    setD_name(data.d_name);
    setFrom1(data.from1);
    setTo1(data.to1);
    setFrom2(data.from2);
    setTo2(data.to2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await data_entry(
      name,
      email,
      password,
      profession,
      hospital,
      d_name_d,
      hospitallocation,
      location,
      d_name,
      from1,
      to1,
      from2,
      to2
    );
  };

  return (
    <div>
      <header>
        <h1 className="hello1">Admin Page of Ambulance Alerting System</h1>
      </header>
      <div className="container" id="container">
        <div className="form-container">
          <form>
            <label>
              <p>Name</p>
              <input
                type="text"
                name="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>

            <label>
              <p>Email ID</p>
              <input
                type="email"
                name="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>

            <label>
              <p>Profession</p>
              <select
                name="profession"
                id="profession"
                onChange={(e) => setProfession(e.target.value)}
                required
              >
                <option>--select an option--</option>
                <option value="hpt">Hospital</option>
                <option value="trp">Traffic Police</option>
                <option value="amd">Ambulance driver</option>
              </select>
            </label>

            <label>
              <p>Password</p>
              <input
                type="password"
                name="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>

            {profession === "trp" ? (
              <TrafficSection onData={onDataTrp} />
            ) : profession === "hpt" ? (
              <HospitalSection onData={onDataHtp} />
            ) : (
              <></>
            )}

            <button onClick={(e) => handleSubmit(e)}>Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
