/*
PostgreSQL is a relational (tabular) database.
Node.js connects to PostgreSQL using the `pg` driver.
*/

// Step-1 : Import pg package (ES Module)
import pkg from "pg";

// Step-2 : Extract Pool from pg
const { Pool } = pkg;

// Step-3 : Create a Pool instance
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "testdb",
  password: "your_password",
  port: 5432,
  max: 20, // maximum number of concurrent connections
});

/*
What is Pool?

Pool is a connection manager that reuses PostgreSQL connections
instead of creating a new connection for every query.

- Pool does NOT create all connections at startup.
- Connections are created on demand.
- Each query borrows a connection and releases it automatically.

pool.query():
- Automatically acquires a connection
- Executes the query
- Releases the connection
- Each query runs in auto-commit mode

pool.connect():
- Gives a dedicated connection (client) from the pool
- Used when multiple queries must run on the same connection
- Commonly used for transactions
*/

// Simple query (auto-commit)

const result = await pool.query("SELECT * FROM test");
console.log(result.rows);

// Transaction management

const client = await pool.connect();

try {
  // Start transaction
  await client.query("BEGIN");

  // Execute multiple dependent queries
  await client.query("INSERT INTO test(name) VALUES('example')");
  await client.query("INSERT INTO test(name) VALUES('example2')");

  // Commit transaction
  await client.query("COMMIT");
} catch (error) {
  // Rollback if any query fails
  await client.query("ROLLBACK");
  console.error("Transaction failed:", error);
} finally {
  // ALWAYS release the client back to the pool
  client.release();
}
