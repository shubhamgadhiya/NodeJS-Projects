const express = require("express");
require("dotenv").config();
const db = require("./Db/database");
const app = express();
const cors = require("cors");
const multer = require('multer');

const user = require("./Routes/api/user");
const auth = require("./Routes/api/auth");
multer({dest: "uploads/"});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
// app.use(
//     cors({
//       origin: [
//         "http://localhost:3000",
//       ],
//     })
//   );

const port = process.env.PORT || 3000

app.get("/", (req,res) => {
    res.send("This api is working")
})

app.use("/api",user);
app.use("/api/auth",auth);


app.listen(port, ()=> {
    console.log(`server in running on ${port}`);
    db()
});
