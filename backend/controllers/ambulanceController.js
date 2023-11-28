
//ambulanceController.js

const db = require('../connection');
const axios = require('axios');
//const discordWebhookUrl1 = process.env.DISCORD_WEBHOOK_URL_1;
//const discordWebhookUrl2 = process.env.DISCORD_WEBHOOK_URL_2;

const getAmbulancedrive = async (req, res) => {
    db.query('SELECT f_rom, t_o FROM trafficsignal', (err, results) => {
        if (err) {
            res.status(500).send('Error fetching route list');
            return;
        }
        res.status(200).json(results);
    });
};

const postAmbulancedrive = async (req, res) => {
    const { routeFrom, routeTo } = req.body;

    db.beginTransaction(err => {
        if (err) {
            res.status(500).send('Error starting transaction');
            return;
        }

        const sqlTrafficSignal = 'SELECT location, name, s_s_status FROM trafficsignal WHERE f_rom = ? AND t_o = ?';
        const sqlHospital = 'SELECT hospital_name, accept_patient FROM hospital WHERE location = ?';

        db.query(sqlTrafficSignal, [routeFrom, routeTo], (err, signalDetails) => {
            if (err) {
                db.rollback(() => {
                    res.status(500).send('Error querying traffic signals');
                });
                return;
            } 

            db.query(sqlHospital, [routeTo], (err, hospitalDetails) => {
                if (err) {
                    db.rollback(() => {
                        res.status(500).send('Error querying hospitals');
                    });
                    return; 
                }

                //let textHospitalNames = hospitalDetails.map(h => h.hospital_name).join(', ');
                // axios.post(discordWebhookUrl2, {
                //     content: `Alert: A patient is headed to ${routeTo}. Hospitals ${textHospitalNames} cover this location. Prepare accordingly.`
                // });

                // signalDetails.forEach(signal => {
                //     let discordNotification = `Alert: Ambulance is en route to ${signal.location}, ${signal.name}. Please ensure the road from ${routeFrom} to ${routeTo} is clear.`;
                //     axios.post(discordWebhookUrl1, { content: discordNotification });
                // });

                db.commit(() => {
                    res.status(200).json({ signalDetails, hospitalDetails });
                });
            });
        });
    });
};

module.exports = { getAmbulancedrive, postAmbulancedrive };