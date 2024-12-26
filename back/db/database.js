import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('./mydb.sqlite', (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to SQLite database.');
        db.run(`
            CREATE TABLE IF NOT EXISTS items_carousel (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                img TEXT NOT NULL,
                title TEXT NOT NULL,
                text TEXT NOT NULL,
                active BOOLEAN
            );
        `);
        db.run(`
            CREATE TABLE IF NOT EXISTS items_model_row (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                img TEXT NOT NULL,
                model TEXT NOT NULL,
                srcPage TEXT NOT NULL
            );
        `);
        db.run(`
            CREATE TABLE IF NOT EXISTS items_carouse_model (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                img TEXT NOT NULL,
                model TEXT NOT NULL,
                srcPage TEXT NOT NULL,
                active BOOLEAN
            );
        `);

        db.run(`
            CREATE TABLE IF NOT EXISTS items_porsche_world (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                img TEXT NOT NULL,
                text TEXT NOT NULL,
                srcPage TEXT NOT NULL,
                active BOOLEAN
            );
        `);
        db.run(`
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                firstName TEXT NOT NULL UNIQUE,
                lastName TEXT NOT NULL,
                password TEXT NOT NULL,
                email TEXT,
                phone TEXT,
                goat TEXT CHECK(json_valid(goat)),
                like TEXT CHECK(json_valid(like))
            );
        `,);
        db.run(`
            CREATE TABLE IF NOT EXISTS model (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT
            );
        `,);
        db.run(`
            CREATE TABLE IF NOT EXISTS body (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT
            );
        `,);
        db.run(`
            CREATE TABLE IF NOT EXISTS fuel (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT
            );
        `,);
        db.run(`
            CREATE TABLE IF NOT EXISTS transmission (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT
            );
        `,);
        db.run(`
            CREATE TABLE IF NOT EXISTS drive (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT
            );
        `,);
        db.run(`
            CREATE TABLE IF NOT EXISTS model_configuration (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                model_id INTEGER,
                body_id TEXT,
                fuel_id TEXT,
                transmission_id TEXT,
                drive_id TEXT,
                cost INTEGER,
                img TEXT,
                FOREIGN KEY (model_id) REFERENCES model(id) ON DELETE CASCADE
            );
        `);
        db.run(`
            CREATE TABLE IF NOT EXISTS card (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                model_id INTEGER,
                body_id INTEGER,
                fuel_id INTEGER,
                transmission_id INTEGER,
                drive_id INTEGER,
                cost INTEGER,
                power INTEGER,
                FOREIGN KEY (model_id) REFERENCES model(id) ON DELETE CASCADE
            );
        `);
        db.run(`
            CREATE TABLE IF NOT EXISTS menu_search (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                model TEXT,
                url TEXT
            );
        `);
    }
});

export { db };
