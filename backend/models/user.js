const pool = require('./StockApp');

(async () => {
    const client = await pool.connect(); // Acquire a client from the pool
    try {
        const tableQuery = `
            CREATE TABLE IF NOT EXISTS person (
                id SERIAL PRIMARY KEY,
                email VARCHAR(100) UNIQUE NOT NULL,
                password TEXT NOT NULL,
                name VARCHAR(100) NOT NULL
            );
        `;

        const result = await client.query(tableQuery);
        console.log('User table created successfully');
    } catch (err) {
        console.error(err);
    } finally {
        client.release(); // Release the client back to the pool
    }
})();
