const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const apiKeyRoutes = require("./routes/apiKeyRoutes");
const countryRoutes = require("./routes/countryRoutes");
const { initializeDB } = require("./configs/db");

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cookieParser());

app.use(express.json());

app.use(
  cors({
    origin: process.env.CORS_ORIGIN_URL || "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", authRoutes);
app.use("/api/api-keys", apiKeyRoutes);
app.use("/api/countries", countryRoutes);

initializeDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
