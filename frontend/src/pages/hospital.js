import React, { useState, useEffect } from 'react';
import hospitalHelper from '../helpers/hospital'; // Adjust the path as needed
import '../css/hospital.css';
const HospitalSection = () => {
    const [hospitalData, setHospitalData] = useState([]);
    const [selectedHospital, setSelectedHospital] = useState('');
    const [acceptPatient, setAcceptPatient] = useState('1');
    const [recordUpdated, setRecordUpdated] = useState('');

    useEffect(() => {
        fetchHospitalData();
    }, []);

    const fetchHospitalData = async () => {
        const data = await hospitalHelper.fetchHospitalData();
        setHospitalData(data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await hospitalHelper.submitHospitalData(selectedHospital, acceptPatient);
            if (response) {
                setRecordUpdated('Record updated successfully');
                fetchHospitalData();
            } else {
                setRecordUpdated('Error updating record');
            }
        } catch (error) {
            setRecordUpdated('Error updating record');
            console.error(error);
        }
    };

    return (
        <div>
            <header>
                <h1>Hospital Page</h1>
            </header>
            <div className="container">
                <form onSubmit={handleSubmit}>
                    <select 
                        name="hospital_name_hp" 
                        value={selectedHospital}
                        onChange={(e) => setSelectedHospital(e.target.value)}
                    >
                        {hospitalData.map((hospital, index) => (
                            <option key={index} value={hospital.hospital_name}>
                                {hospital.hospital_name}
                            </option>
                        ))}
                    </select>
                    <select 
                        name="accept_patient"
                        value={acceptPatient}
                        onChange={(e) => setAcceptPatient(e.target.value)}
                    >
                        <option value="1">Yes</option>
                        <option value="0">No</option>
                    </select>
                    <button type="submit">Submit</button>
                </form>
                <div className="record-update-message">
                    {recordUpdated}
                </div>
                <div className="hospital-details">
                    <table>
                        <thead>
                            <tr>
                                <th>Hospital Name</th>
                                <th>Accept Patient</th>
                            </tr>
                        </thead>
                        <tbody>
                            {hospitalData.map((hospital, index) => (
                                <tr key={index}>
                                    <td>{hospital.hospital_name}</td>
                                    <td>{hospital.accept_patient}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default HospitalSection;