const express = require("express");
require("dotenv").config();
const db = require("./Db/database");
const app = express();
const cors = require("cors");
const multer = require('multer');

const user = require("./Routes/api/user");
const room = require("./Routes/api/room");
const booking = require("./Routes/api/booking");
multer({dest: "uploads/"});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const port = process.env.PORT || 3000

app.get("/", (req,res) => {
    res.send("This api is working")
})

app.use("/api",user);
app.use("/api",room);
app.use("/api", booking);



app.listen(port, ()=> {
    console.log(`server in running on ${port}`);
    db()
});
