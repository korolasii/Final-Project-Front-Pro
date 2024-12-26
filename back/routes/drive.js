import express from 'express';
import { db } from '../db/database.js';

const router = express.Router();

router.post('/', (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ error: 'Field "name" is required.' });
    }
    const query = 'INSERT INTO drive (name) VALUES (?)';
    db.run(query, [name], function (err) {
        if (err) {
            console.error('Error inserting data:', err.message);
            res.status(500).json({ error: 'Internal server error.' });
        } else {
            res.status(201).json({ id: this.lastID, name });
        }
    });
});

router.get('/', (req, res) => {
    const query = 'SELECT * FROM drive';
    db.all(query, [], (err, rows) => {
        if (err) {
            console.error('Error fetching data:', err.message);
            res.status(500).json({ error: 'Internal server error.' });
        } else {
            res.json(rows);
        }
    });
});

router.get('/:id', (req, res) => {
    const query = 'SELECT * FROM drive WHERE id = ?';
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
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ error: 'Field "name" is required.' });
    }
    const query = 'UPDATE drive SET name = ? WHERE id = ?';
    db.run(query, [name, req.params.id], function (err) {
        if (err) {
            console.error('Error updating data:', err.message);
            res.status(500).json({ error: 'Internal server error.' });
        } else if (this.changes === 0) {
            res.status(404).json({ error: 'Item not found.' });
        } else {
            res.json({ id: req.params.id, name });
        }
    });
});

router.delete('/:id', (req, res) => {
    const query = 'DELETE FROM drive WHERE id = ?';
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
