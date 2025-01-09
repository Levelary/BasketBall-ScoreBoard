const express = require('express');
const cors = require('cors');
const dbconnection = require("./db/db");
const userRouter = require("./routes/UserRouter");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/user", userRouter); // Routes

app.get("/", (req, res) => {
    res.send("Hello page");
});

app.listen(8000, () => {
    dbconnection;
    console.log("Server connection established");
})
