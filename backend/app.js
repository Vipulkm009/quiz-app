require('dotenv').config()

const mongoose = require('mongoose');
const express = require("express")
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const authRoutes = require("./routes/auth");

// DB Connection
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("DB CONNECTED");
}).catch((reason) => {
    console.log("SOME ERROR");
    console.log(`${reason}`)
});

//Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

// My Routes
app.use("/api", authRoutes);

//PORT
const port = process.env.PORT || 8080;

//Starting Server
app.listen(port, () => {
    console.log(`App is running at ${port}`);
})