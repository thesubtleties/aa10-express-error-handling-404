const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("GET / This is the root URL");
});
app.get("*", (req, res, next) => {
  const e = new Error("Sorry, the requested resource couldn't be found");
  res.status(404);
  next(e);
});

app.use((err, req, res, next) => {
  if (res.statusCode === 200) {
    res.status(404);
  }
  res.json({
    message: err.message,
    statusCode: res.statusCode,
  });
});

const port = 5000;
app.listen(port, () => console.log("Server is listening on port", port));
