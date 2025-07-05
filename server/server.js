require("dotenv").config()
const express = require('express');
const cors = require('cors');
const connect = require('./config/db');
const app = express();
const taskRoutes = require('./routes/taskRoutes');
const authRoutes = require('./routes/authRoutes');


connect();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

const PORT = process.env.PORT  || 5000;
app.listen(PORT, () => console.log(`server is running on https://localhost:${PORT}`))
;