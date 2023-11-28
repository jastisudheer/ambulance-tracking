import React, { useState, useEffect } from 'react';
import trafficHelper from '../helpers/traffic'; // Adjust the path as needed
import '../css/traffic.css'; // Adjust the path to your CSS file

const Traffic = () => {
    const [trafficList, setTrafficList] = useState([]);
    const [selectedSignal, setSelectedSignal] = useState('');
    const [signalStatus, setSignalStatus] = useState('');
    const [recordUpdated, setRecordUpdated] = useState('');

    useEffect(() => {
        fetchTrafficData();
    }, []);

    const fetchTrafficData = async () => {
        const data = await trafficHelper.fetchTrafficData();
        if (data && Array.isArray(data)) {
            setTrafficList(data.map(item => ({
                location: item[0],
                status: item[1]
            })));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedSignal || !signalStatus) {
            setRecordUpdated('Please select a traffic signal and status.');
            return;
        }

        try {
            const statusValue = signalStatus === 'Free' ? 1 : 0;
            const response = await trafficHelper.submitTrafficData(selectedSignal, statusValue);
            if (response && response.record_updated) {
                setRecordUpdated(response.record_updated);
                fetchTrafficData();
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
                <h1>Traffic Signal Management</h1>
            </header>
            <div className="container">
                <form onSubmit={handleSubmit}>
                    <select 
                        name="signal_name" 
                        value={selectedSignal}
                        onChange={(e) => setSelectedSignal(e.target.value)}
                    >
                        <option value="">Select Signal</option>
                        {trafficList.map((signal, index) => (
                            <option key={index} value={signal.location}>
                                {signal.location}
                            </option>
                        ))}
                    </select>
                    <select 
                        name="signal_status"
                        value={signalStatus}
                        onChange={(e) => setSignalStatus(e.target.value)}
                    >
                        <option value="">Select Status</option>
                        <option value="Free">Free</option>
                        <option value="Busy">Busy</option>
                    </select>
                    <button type="submit">Update Status</button>
                </form>
                <div className="record-update-message">
                    {recordUpdated}
                </div>
                <div className="traffic-details">
                    <table>
                        <thead>
                            <tr>
                                <th>Signal Location</th>
                                <th>Signal Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {trafficList.map((signal, index) => (
                                <tr key={index}>
                                    <td>{signal.location}</td>
                                    <td>{signal.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Traffic;