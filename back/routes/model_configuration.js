import express from 'express';
import { db } from '../db/database.js'; 

const router = express.Router();

router.post('/', (req, res) => {
    const { model_id, body_id, fuel_id, transmission_id, drive_id, cost, img } = req.body;

    if (!model_id || !body_id || !fuel_id || !transmission_id || !drive_id || !cost || !img) {
        return res.status(400).json({ error: 'All fields, including img, are required.' });
    }

    const checkModelQuery = 'SELECT COUNT(*) AS count FROM model WHERE id = ?';
    db.get(checkModelQuery, [model_id], (err, row) => {
        if (err) {
            return res.status(500).json({ error: 'Internal server error during model check.' });
        }
        if (row.count === 0) {
            return res.status(400).json({ error: 'Model not found.' });
        }

        const checkBodyQuery = 'SELECT COUNT(*) AS count FROM body WHERE id = ?';
        db.get(checkBodyQuery, [body_id], (err, row) => {
            if (err) {
                return res.status(500).json({ error: 'Internal server error during body check.' });
            }
            if (row.count === 0) {
                return res.status(400).json({ error: 'Body not found.' });
            }

            const checkFuelQuery = 'SELECT COUNT(*) AS count FROM fuel WHERE id = ?';
            db.get(checkFuelQuery, [fuel_id], (err, row) => {
                if (err) {
                    return res.status(500).json({ error: 'Internal server error during fuel check.' });
                }
                if (row.count === 0) {
                    return res.status(400).json({ error: 'Fuel not found.' });
                }

                const checkTransmissionQuery = 'SELECT COUNT(*) AS count FROM transmission WHERE id = ?';
                db.get(checkTransmissionQuery, [transmission_id], (err, row) => {
                    if (err) {
                        return res.status(500).json({ error: 'Internal server error during transmission check.' });
                    }
                    if (row.count === 0) {
                        return res.status(400).json({ error: 'Transmission not found.' });
                    }

                    const checkDriveQuery = 'SELECT COUNT(*) AS count FROM drive WHERE id = ?';
                    db.get(checkDriveQuery, [drive_id], (err, row) => {
                        if (err) {
                            return res.status(500).json({ error: 'Internal server error during drive check.' });
                        }
                        if (row.count === 0) {
                            return res.status(400).json({ error: 'Drive not found.' });
                        }

                        const query = 'INSERT INTO model_configuration (model_id, body_id, fuel_id, transmission_id, drive_id, cost, img) VALUES (?, ?, ?, ?, ?, ?, ?)';
                        db.run(query, [model_id, body_id, fuel_id, transmission_id, drive_id, cost, img], function (err) {
                            if (err) {
                                console.error('Error inserting data:', err.message);
                                res.status(500).json({ error: 'Internal server error.' });
                            } else {
                                res.status(201).json({
                                    id: this.lastID,
                                    model_id,
                                    body_id,
                                    fuel_id,
                                    transmission_id,
                                    drive_id,
                                    cost,
                                    img
                                });
                            }
                        });
                    });
                });
            });
        });
    });
});
;

router.get('/', (req, res) => {
    const query = `
        SELECT model_configuration.id AS configuration_id,
               model.name AS model_name,
               body.name AS body_name,
               fuel.name AS fuel_name,
               transmission.name AS transmission_name,
               drive.name AS drive_name,
               model_configuration.cost,
               model_configuration.img
        FROM model_configuration
        JOIN model ON model_configuration.model_id = model.id
        JOIN body ON model_configuration.body_id = body.id
        JOIN fuel ON model_configuration.fuel_id = fuel.id
        JOIN transmission ON model_configuration.transmission_id = transmission.id
        JOIN drive ON model_configuration.drive_id = drive.id
    `;
    
    db.all(query, [], (err, rows) => {
        if (err) {
            console.error('Error fetching data:', err.message);
            return res.status(500).json({ error: 'Internal server error.' });
        }
        res.json(rows);
    });
});


router.get('/:id', (req, res) => {
    const query = `
        SELECT model_configuration.id,
               model.name AS model_name,
               body.name AS body_name,
               fuel.name AS fuel_name,
               transmission.name AS transmission_name,
               drive.name AS drive_name,
               model_configuration.cost
        FROM model_configuration
        JOIN model ON model_configuration.model_id = model.id
        JOIN body ON model_configuration.body_id = body.id
        JOIN fuel ON model_configuration.fuel_id = fuel.id
        JOIN transmission ON model_configuration.transmission_id = transmission.id
        JOIN drive ON model_configuration.drive_id = drive.id
        WHERE model_configuration.id = ?
    `;
    db.get(query, [req.params.id], (err, row) => {
        if (err) {
            console.error('Error fetching data:', err.message);
            res.status(500).json({ error: 'Internal server error.' });
        } else if (!row) {
            res.status(404).json({ error: 'Item not found.' });
        } else {
            res.json(row);
        }
    });
});

router.put('/:id', (req, res) => {
    const { model_id, body_id, fuel_id, transmission_id, drive_id, cost, img } = req.body;
    if (!model_id || !body_id || !fuel_id || !transmission_id || !drive_id || !cost || !img) {
        return res.status(400).json({ error: 'All fields, including img, are required.' });
    }

    const query = 'UPDATE model_configuration SET model_id = ?, body_id = ?, fuel_id = ?, transmission_id = ?, drive_id = ?, cost = ?, img = ? WHERE id = ?';
    db.run(query, [model_id, body_id, fuel_id, transmission_id, drive_id, cost, img, req.params.id], function (err) {
        if (err) {
            console.error('Error updating data:', err.message);
            res.status(500).json({ error: 'Internal server error.' });
        } else if (this.changes === 0) {
            res.status(404).json({ error: 'Item not found.' });
        } else {
            res.json({ id: req.params.id, model_id, body_id, fuel_id, transmission_id, drive_id, cost, img });
        }
    });
});

router.delete('/:id', (req, res) => {
    const query = 'DELETE FROM model_configuration WHERE id = ?';
    db.run(query, [req.params.id], function (err) {
        if (err) {
            console.error('Error deleting data:', err.message);
            res.status(500).json({ error: 'Internal server error.' });
        } else if (this.changes === 0) {
            res.status(404).json({ error: 'Item not found.' });
        } else {
            res.json({ message: 'Item deleted successfully.' });
        }
    });
});


export default router;
