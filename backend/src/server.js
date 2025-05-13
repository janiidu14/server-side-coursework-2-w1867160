const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const apiKeyRoutes = require("./routes/apiKeyRoutes");
const countryRoutes = require("./routes/countryRoutes");
const blogRoutes = require("./routes/blogRoutes");
const reactionRoutes = require("./routes/reactionRoutes");
const interactionRoutes = require("./routes/userInteractionRoutes");

const { initializeDB } = require("./models/schema");

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/api/users", authRoutes);
app.use("/api/api-keys", apiKeyRoutes);
app.use("/api/countries", countryRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/reactions", reactionRoutes);
app.use("/api/interactions", interactionRoutes);

initializeDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
