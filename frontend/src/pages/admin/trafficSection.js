import React, { useEffect, useState } from "react";

const TrafficSection = ({ onData }) => {
  const [location, setLocation] = useState("");
  const [d_name, setD_name] = useState("");
  const [from1, setFrom1] = useState("");
  const [to1, setTo1] = useState("");
  const [from2, setFrom2] = useState("");
  const [to2, setTo2] = useState("");

  useEffect(() => {
    onData({ location, d_name, from1, to1, from2, to2 });
  }, [location, d_name, from1, to1, from2, to2]);

  return (
    <>
      <div className="Traffic-Police-container">
        <label>
          <p>Location</p>
          <input
            type="text"
            className="location"
            name="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </label>
        <label>
          <p>Discord user name:</p>
          <input
            type="text"
            className="d_name"
            name="d_name"
            value={d_name}
            onChange={(e) => setD_name(e.target.value)}
          />
        </label>
        <label>
          <p>From 1:</p>
          <input
            type="text"
            className="from1"
            name="from1"
            value={from1}
            onChange={(e) => setFrom1(e.target.value)}
          />
        </label>
        <label>
          <p>To 1:</p>
          <input
            type="text"
            className="to1"
            name="to1"
            value={to1}
            onChange={(e) => setTo1(e.target.value)}
          />
        </label>
        <label>
          <p>From 2:</p>
          <input
            type="text"
            className="from1"
            name="from2"
            value={from2}
            onChange={(e) => setFrom2(e.target.value)}
          />
        </label>
        <label>
          <p>To 2:</p>
          <input
            type="text"
            className="to1"
            name="to2"
            value={to2}
            onChange={(e) => setTo2(e.target.value)}
          />
        </label>
      </div>
    </>
  );
};

export default TrafficSection;
