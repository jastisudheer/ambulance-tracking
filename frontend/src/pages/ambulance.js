import React, { useState, useEffect } from "react";
import { getRoutes, updateRoute } from "../helpers/ambulance"; // Ensure this path is correct

// Import Leaflet and React-Leaflet
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker } from "react-leaflet";

// LeafletMapComponent using React-Leaflet
const LeafletMapComponent = ({ lat, lng }) => {
  return (
    <MapContainer
      center={[lat, lng]}
      zoom={14}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      <Marker position={[lat, lng]} />
    </MapContainer>
  );
};

const AmbulanceSection = () => {
  const [routes, setRoutes] = useState([]);
  const [selectedRouteFrom, setSelectedRouteFrom] = useState("");
  const [selectedRouteTo, setSelectedRouteTo] = useState("");
  const [currentLocation, setCurrentLocation] = useState({ lat: 0, lng: 0 });
  const [submitStatus, setSubmitStatus] = useState("");

  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const data = await getRoutes()
        setRoutes(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchRoutes();

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        setCurrentLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (err) => console.error(err),
      { enableHighAccuracy: true }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateRoute(selectedRouteFrom, selectedRouteTo);
      setSubmitStatus("Route updated successfully.");
    } catch (error) {
      setSubmitStatus("Failed to update route.");
      console.error(error);
    }
  };

  return (
    <div>
      <header>
        <h1>Ambulance Tracking System</h1>
      </header>
      <div className="ambulance-form">
        <form onSubmit={handleSubmit}>
          <label>
            From:
            <select
              value={selectedRouteFrom}
              onChange={(e) => setSelectedRouteFrom(e.target.value)}
            >
              {routes.map((route, index) => (
                <option key={index} value={route.f_rom}>
                  {route.f_rom}
                </option>
              ))}
            </select>
          </label>
          <label>
            To:
            <select
              value={selectedRouteTo}
              onChange={(e) => setSelectedRouteTo(e.target.value)}
            >
              {routes.map((route, index) => (
                <option key={index} value={route.t_o}>
                  {route.t_o}
                </option>
              ))}
            </select>
          </label>
          <button type="submit">Update Route</button>
        </form>
        {submitStatus && <p>{submitStatus}</p>}
      </div>
      <div className="map-container">
        {currentLocation.lat && currentLocation.lng && (
          <LeafletMapComponent
            lat={currentLocation.lat}
            lng={currentLocation.lng}
          />
        )}
      </div>
    </div>
  );
};

export default AmbulanceSection;
