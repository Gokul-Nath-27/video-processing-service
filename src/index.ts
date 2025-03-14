import express from "express";
import ffmpeg from "fluent-ffmpeg";
import { existsSync } from "fs";

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/process-video", (req, res) => {
  const inputFilePath = req.body.inputFilePath;
  const outputFilePath = req.body.outputFilePath;
  if (!inputFilePath || !outputFilePath) {  
    res.status(400).send("Missing input or output file path");
  }

  try {
    if (existsSync(inputFilePath)) {
      ffmpeg(inputFilePath)
        .outputOptions("-vf", "scale=-1:360")
        .on("end", () => {
          res.status(200).send("Video processed successfully");
        })
        .on("error", (error) => {
          console.error(`Error processing video: ${error.message}`);
          res.status(500).send("Internal Server Error");
        })
        .save(outputFilePath);
    } else {
      res.status(404).send("Input file does not exist");
    }
  } catch (error) {
    console.error("Error processing video:", error);
    res.status(500).send("Error processing video");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
