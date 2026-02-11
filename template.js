/*
What is Express?
- Express is a framework of Node.js used to create servers and APIs.
- We can create a server using the built-in http module of Node.js,
  but the code becomes lengthy and messy.
- Express is a wrapper around the http module. It simplifies server creation
  by internally handling most of the low-level http logic.
- Express is used for creating routes, middleware, JSON parsing,
  request handling, and error handling.

How Express Works:
- Express is built on top of Node's http module.
- Internally it uses http.createServer().
- When a request comes:
    1. It checks the URL.
    2. It checks the HTTP method (GET, POST, etc.).
    3. Matches it with defined routes.
    4. Executes middleware chain.
    5. Sends back the response.

What is CORS?
CORS = Cross-Origin Resource Sharing.
- It is a browser security mechanism.
- ORIGIN = Protocol + Domain + Port
- If frontend and backend run on different origins,
  the browser blocks the request for security reasons.
- Browser sends a preflight (OPTIONS) request first.
- Server must respond with proper headers:
    Access-Control-Allow-Origin
    Access-Control-Allow-Methods
    Access-Control-Allow-Headers
- If headers are present → browser allows request.
- If not present → browser blocks it.

What is Axios?
- Axios is a JavaScript HTTP client library.
- Used to send HTTP requests, call APIs, send and receive JSON.
- Internally creates an XMLHttpRequest (browser)
  or uses http module (Node.js).
- Returns a Promise and resolves with the response.
*/

// Import modules
import express from "express";
import cors from "cors";
import axios from "axios";

// Create Express app
const app = express();

// Middleware
app.use(express.json()); // Parse JSON body

// Enable CORS (Allow only specific origin)
app.use(
  cors({
    origin: "http://localhost:3000", // Only specified url is allowed
  })
);

// Routes
app.get("/", (req, res) => {
  res.send("Server is running successfully ");
});

app.get("/api/data", (req, res) => {
  res.json({
    message: "Data fetched successfully",
    name: "Ohm",
    branch: "IT",
  });
});

app.post("/api/data", (req, res) => {
  const receivedData = req.body;

  res.json({
    message: "Data received successfully",
    data: receivedData,
  });
});

// Start server
app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});

/*
Axios Examples
These are example requests to demonstrate Axios usage.
They can be used in frontend or Node.js environment.
*/

axios
  .get("http://localhost:3000/api/data")
  .then((response) => {
    console.log("GET Response:", response.data);
  })
  .catch((error) => {
    console.error("GET Error:", error.message);
  });

axios
  .post("http://localhost:3000/api/data", {
    // data
  })
  .then((response) => {
    console.log("POST Response:", response.data);
  })
  .catch((error) => {
    console.error("POST Error:", error.message);
  });
