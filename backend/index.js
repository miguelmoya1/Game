const express = require("express");
const fetch = require("node-fetch");
var cors = require('cors')
const app = express()
app.use(cors())
const port = 8080;
app.use(express.json());

// This key works! But is very much not your API key.
// We'd recommend using an environment variable instead.
const API_KEY = "k6ZIUsMJjyNjjCyjjTRrw";
app.post("/api/roomservice", async (req, res) => {
  const body = req.body;
  // Check if this is a valid user
  const userID = '1';
  const resources = [
    {
      object: "room",
      room: body.room,
      permission: "join",
    },
  ];
  const r = await fetch("https://super.roomservice.dev/provision", {
    method: "POST",
    headers: {
      Authorization: `Bearer: ${API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user: userID,
      resources: resources,
    }),
  });

  const response = await r.json();
  return res.json(response);
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});