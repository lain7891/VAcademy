const express = require("express");
const mongoose = require("mongoose");
const app = express();
const path = require("path");

const PORT = process.env.PORT || 3001;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("client/build"));

app.get("/api/config", (req, res) => {
    res.json({
      success: true,
    });
  });

  mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost/VAcademy",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    }
  );
  
  const connection = mongoose.connection;
  
  connection.on("connected", () => {
    console.log("Mongoose successfully connected!");
  });
  
  connection.on("error", (err) => {
    console.log("Mongoose connection error: ", err);
  });
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build/index.html"));
  });

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });

