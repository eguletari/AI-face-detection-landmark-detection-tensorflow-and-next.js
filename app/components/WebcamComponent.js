import React, { useRef, useEffect } from "react";
import Webcam from "react-webcam"; // Camera dependency
import * as tf from "@tensorflow/tfjs";
import * as faceLandmarksDetection from "@tensorflow-models/face-landmarks-detection";
import { drawMesh } from "./utilities";

const WebcamComponent = () => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const loadModel = async () => {
    const model = await faceLandmarksDetection.createDetector(
      faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh,
      {
        runtime: "tfjs",
      }
    );
    setInterval(() => {
      detect(model);
    }, 100); // Run detection every 100ms
  };

  const detect = async (model) => {
    if (
      webcamRef.current &&
      webcamRef.current.video.readyState === 4 // Video is ready
    ) {
      const video = webcamRef.current.video;
      const videoWidth = video.videoWidth;
      const videoHeight = video.videoHeight;

      // Set webcam and canvas dimensions
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      // Perform detection
      const predictions = await model.estimateFaces(video);

      if (predictions.length > 0) {
        const ctx = canvasRef.current.getContext("2d");
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height); // Clear previous frame
        drawMesh(predictions, ctx); // Draw landmarks
      }
    }
  };

  useEffect(() => {
    tf.ready().then(() => loadModel());
  }, []);

  return (
    <div style={{ position: "relative", width: "640px", height: "480px" }}>
      <Webcam
        ref={webcamRef}
        audio={false}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          transform: "scaleX(-1)", // Flip horizontally
        }}
      />
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          transform: "scaleX(-1)", // Flip horizontally
        }}
      />
    </div>
  );
};
export default WebcamComponent;
