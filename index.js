const express = require("express");
const { connection } = require("./db");
const { userRouter } = require("./routes/userRoutes"); // Import userRouter as a named import
const dotenv= require("dotenv")
const {noteRouter}=require("./routes/noteRoutes")

const app = express();
const PORT = 8080;

app.use(express.json());

// Mount the userRouter at /users
app.use("/users", userRouter);
app.use("/note", noteRouter);

app.get("/", (req, res) => {
    res.send("home page");
});

connection.then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch(error => {
    console.error("MongoDB connection failed:", error.message);
});
