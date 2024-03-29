const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 4000;
const DB_NAME = "academia";

// routes
var testAPIRouter = require("./routes/testAPI");
var EventRouter = require("./routes/event");
var UserRouter = require("./routes/user");
var BadminRouter = require("./routes/badmin");
var MiscRouter = require("./routes/misc");
var FoodRouter = require("./routes/food");
var OrderRouter = require("./routes/order");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// app.all("*", (req,res) => {
//     res.status(404).send("<h1>404:Page Not Found</h1>");
// })
// Connection to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/' + DB_NAME, { useNewUrlParser: true, useCreateIndex: true });
const connection = mongoose.connection;
connection.once('open', function() {
    console.log("MongoDB database connection established successfully !");
})

// setup API endpoints
app.use("/testAPI", testAPIRouter );
app.use("/event", EventRouter );
app.use("/misc", MiscRouter);
app.use("/user", UserRouter );
app.use("/badmin", BadminRouter );
app.use("/food", FoodRouter );
app.use("/order", OrderRouter );

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});
