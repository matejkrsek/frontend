const express = require("express");
const cors = require("cors");
const listsRouter = require("./routes/lists");

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.use("/api/lists", listsRouter);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
