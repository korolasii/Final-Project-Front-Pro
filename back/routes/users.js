import express from 'express';
import { db } from '../db/database.js';

const router = express.Router();

router.post('/', (req, res) => {
    const { firstName, lastName, password, email, phone, goat, like } = req.body;

    if (!firstName || !lastName || !password) {
        return res.status(400).json({ error: 'Fields firstName, lastName, and password are required.' });
    }

    const query = `INSERT INTO users (firstName, lastName, password, email, phone, goat, like) VALUES (?, ?, ?, ?, ?, ?, ?)`;

    db.run(query, [firstName, lastName, password, email, phone, goat || 0, like || 0], function (err) {
        if (err) {
            console.error('Error inserting user:', err.message);
            res.status(500).json({ error: 'Internal server error.' });
        } else {
            res.status(201).json({
                id: this.lastID,
                firstName,
                lastName,
                email,
                phone,
                goat: goat || 0,
                like: like || 0,
                message: 'User created successfully.'
            });
        }
    });
});

router.post('/login', (req, res) => {
    const { firstName, password } = req.body;

    if (!firstName || !password) {
        return res.status(400).json({ error: 'firstName and password are required.' });
    }

    const query = `SELECT * FROM users WHERE firstName = ? AND password = ?`;
    db.get(query, [firstName, password], (err, user) => {
        if (err) {
            console.error('Error querying user:', err.message);
            return res.status(500).json({ error: 'Internal server error.' });
        }

        if (!user) {
            return res.status(401).json({ error: 'Invalid firstName or password.' });
        }

        let goat = [];
        let like = [];

        try {
            goat = user.goat ? JSON.parse(user.goat) : [];
            like = user.like ? JSON.parse(user.like) : [];
        } catch (error) {
            console.error('Error parsing goat or like data:', error.message);
        }

        res.status(200).json({
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phone: user.phone,
            goat: goat,
            like: like,
            message: 'Login successful.'
        });
    });
});

router.put('/:id', (req, res) => {
    const { firstName, lastName, email, phone, goat, like } = req.body;
    const { id } = req.params;

    if (!firstName || !lastName) {
        return res.status(400).json({ error: 'Fields firstName and lastName are required.' });
    }

    const query = `UPDATE users SET firstName = ?, lastName = ?, email = ?, phone = ?, goat = ?, like = ? WHERE id = ?`;
    db.run(query, [firstName, lastName, email, phone, goat, like, id], function (err) {
        if (err) {
            console.error('Error updating user:', err.message);
            res.status(500).json({ error: 'Internal server error.' });
        } else if (this.changes === 0) {
            res.status(404).json({ error: 'User not found.' });
        } else {
            res.json({
                id,
                firstName,
                lastName,
                email,
                phone,
                goat,
                like,
                message: 'User updated successfully.'
            });
        }
    });
});

router.put('/:id/like', (req, res) => {
    console.log('Request body:', req.body);
    const { like } = req.body;
    const { id } = req.params;

    if (like === undefined) {
        return res.status(400).json({ error: 'Like value is required.' });
    }

    const queryGetCurrent = "SELECT like FROM users WHERE id = ?";
    db.get(queryGetCurrent, [id], (err, row) => {
        if (err) {
            console.error('Error fetching user like:', err.message);
            return res.status(500).json({ error: 'Internal server error.' });
        }

        let currentLike = row ? JSON.parse(row.like) : [];

        if (Array.isArray(currentLike)) {
            currentLike.push(like);
        } else {
            currentLike = [like];
        }

        const queryUpdate = "UPDATE users SET like = ? WHERE id = ?";
        db.run(queryUpdate, [JSON.stringify(currentLike), id], function (err) {
            if (err) {
                console.error('Error updating like:', err.message);
                res.status(500).json({ error: 'Internal server error.' });
            } else if (this.changes === 0) {
                res.status(404).json({ error: 'User not found.' });
            } else {
                res.json({
                    id,
                    like: currentLike,
                    message: 'Like updated successfully.'
                });
            }
        });
    });
});

router.put('/:id/goat', (req, res) => {
    const { goat } = req.body;
    const { id } = req.params;


    if (goat === undefined) {
        return res.status(400).json({ error: 'Goat value is required.' });
    }

    const queryGetCurrent = "SELECT goat FROM users WHERE id = ?";
    db.get(queryGetCurrent, [id], (err, row) => {
        if (err) {
            console.error('Error fetching user goat:', err.message);
            return res.status(500).json({ error: 'Internal server error.' });
        }

        let currentGoat = row ? JSON.parse(row.goat) : [];
        console.log(row)

        if (Array.isArray(currentGoat)) {
            currentGoat.push(goat);
        } else {
            currentGoat = [goat];
        }

        const queryUpdate = "UPDATE users SET goat = ? WHERE id = ?";
        db.run(queryUpdate, [JSON.stringify(currentGoat), id], function (err) {
            if (err) {
                console.error('Error updating goat:', err.message);
                res.status(500).json({ error: 'Internal server error.' });
            } else if (this.changes === 0) {
                res.status(404).json({ error: 'User not found.' });
            } else {
                res.json({
                    id,
                    goat: currentGoat,
                    message: 'Goat updated successfully.'
                });
            }
        });
    });
});


router.delete('/delete-item/:id', (req, res) => {
    const { id, itemId, field } = req.body;

    if (field !== 'goat' && field !== 'like') {
        return res.status(400).json({ error: 'Invalid field. Use "goat" or "like".' });
    }


    const query = `SELECT goat, like FROM users WHERE id = ?`;
    db.get(query, [id], (err, user) => {
        if (err) {
            console.error('Error fetching user:', err.message);
            return res.status(500).json({ error: 'Internal server error.' });
        }

        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }

        let goat = user.goat ? JSON.parse(user.goat) : [];
        let like = user.like ? JSON.parse(user.like) : [];


        let updatedGoat = [...goat];
        let updatedLike = [...like];

        if (field === 'goat') {
            console.log('Before filtering Goat:', goat);
            updatedGoat = goat.filter(item => {
                const isMatching = String(item.configuration_id) !== String(itemId); 
                return isMatching;
            });
        } else if (field === 'like') {
            updatedLike = like.filter(item => {
                const isMatching = String(item.configuration_id) !== String(itemId); 
                return isMatching;
            });
        }

        const updateQuery = `
            UPDATE users 
            SET goat = ?, like = ? 
            WHERE id = ?`;
        db.run(updateQuery, [JSON.stringify(updatedGoat), JSON.stringify(updatedLike), id], function (err) {
            if (err) {
                console.error('Error updating user:', err.message);
                return res.status(500).json({ error: 'Internal server error.' });
            }

            if (this.changes === 0) {
                return res.status(404).json({ error: 'Item not found in goat or like.' });
            }

            res.status(200).json({ message: 'Item deleted successfully.' });
        });
    });
});






export default router;
