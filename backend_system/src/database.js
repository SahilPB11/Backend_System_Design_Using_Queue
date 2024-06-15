import pg from "pg";

const { Pool } = pg;

export const pool = new Pool({
  connectionString: "postgres://user:password@postgres/mydb",
});

export const initializeDatabase = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL
      )
    `);
    console.log("Database initialized successfully");
  } catch (error) {
    console.error("Error initializing database:", error);
    // Retry after a delay (e.g., 5 seconds)
    await new Promise((resolve) => setTimeout(resolve, 5000));
    await initializeDatabase(); // Recursive call to retry initialization
  }
};
