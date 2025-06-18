const express = require("express");
const rootRouter = require("./routes/index");
const cors = require("cors");
const { default: mongoose } = require("mongoose");

const app = express();

app.use(cors());
app.use(express.json());
const mongoURl = `mongodb://localhost:27017/paytm`;

mongoose
  .connect(mongoURl)
  .then(() => console.log(" MongoDB connected successfully"))
  .catch((err) => console.error(" MongoDB connection error:", err));

app.use("api/v1", rootRouter);
const port = 3000;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
