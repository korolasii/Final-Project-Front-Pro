import express from 'express';
import { db } from '../db/database.js';

const router = express.Router();

router.post('/', (req, res) => {
    const { img, title, text } = req.body;
    if (!img || !title || !text) {
        return res.status(400).json({ error: 'All fields (img, title, text) are required.' });
    }
    const query = 'INSERT INTO items_carousel_model (img, title, text) VALUES (?, ?, ?)';
    db.run(query, [img, title, text], function (err) {
        if (err) {
            console.error('Error inserting data:', err.message);
            res.status(500).json({ error: 'Internal server error.' });
        } else {
            res.status(201).json({ id: this.lastID, img, title, text });
        }
    });
});

router.get('/', (req, res) => {
    const query = 'SELECT * FROM items_carousel_model';
    db.all(query, [], (err, rows) => {
        if (err) {
            console.error('Error fetching data:', err.message);
            res.status(500).json({ error: 'Internal server error.' });
        } else {
            console.log('Fetched rows:', rows); 
            res.json(rows);
        }
    });
});

router.get('/', (req, res) => {
    const query = 'SELECT * FROM items_carousel_model WHERE id = ?';
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

router.put('/', (req, res) => {
    const { img, title, text } = req.body;
    if (!img || !title || !text) {
        return res.status(400).json({ error: 'All fields (img, title, text) are required.' });
    }
    const query = 'UPDATE items_carousel_model SET img = ?, title = ?, text = ? WHERE id = ?';
    db.run(query, [img, title, text, req.params.id], function (err) {
        if (err) {
            console.error('Error updating data:', err.message);
            res.status(500).json({ error: 'Internal server error.' });
        } else if (this.changes === 0) {
            res.status(404).json({ error: 'Item not found.' });
        } else {
            res.json({ id: req.params.id, img, title, text });
        }
    });
});

router.delete('/', (req, res) => {
    const query = 'DELETE FROM items_carousel_model WHERE id = ?';
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
