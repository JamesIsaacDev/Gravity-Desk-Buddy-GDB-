const express = require("express");
const app = express();
const port = 3000;
app.get("/health", function (request, response) {
    response.send("GDB backend is healthy");
});
app.listen(port, () => {
  console.log(`GDB backend is listening at http://localhost:${port}`);
});