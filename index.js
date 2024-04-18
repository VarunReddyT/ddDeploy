const express = require("express");
const path = require("path");
const serveStatic = require("serve-static");
// const finalHandler = require('finalhandler');

const app = express();
const port = process.env.PORT || 5000;

// Serve static files from the 'public' directory
const staticRouter1 = serveStatic(path.join(__dirname, "ExportGame"), {
  setHeaders: (res, path) => {
    res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
    res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
  },
});

app.use("/", staticRouter1);
// app.use(finalHandler());

// Set headers to enable Cross-Origin Isolation and SharedArrayBuffer
app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Isolation", "require-corp");

  // Set Cross-Origin Resource Sharing (CORS) headers to allow requests from different origins
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  // Set SharedArrayBuffer support
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
  res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
  next();
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});
app.get("/game1", (req, res) => {
  res.sendFile(path.join(__dirname, "ExportGame", "DragDrop8.html"));
});
// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});