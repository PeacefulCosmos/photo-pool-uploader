import { useState, useRef } from "react";
import { Box, Button } from "@chakra-ui/react";

function Camera() {
  const [stream, setStream] = useState(null);
  const [photo, setPhoto] = useState(null);
  const videoRef = useRef(null);

  const handleStartClick = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setStream(stream);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  const handleStopClick = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  };

  const handlePhotoClick = () => {
    const video = videoRef.current;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);
    const photo = canvas.toDataURL("image/jpeg");
    setPhoto(photo);
    handleStopClick();
  };

  return (
    <Box>
      {photo ? (
        <Box>
          <img src={photo} alt="photo" />
          <Box mt={2}>
            <Button onClick={() => setPhoto(null)}>Take another photo</Button>
          </Box>
        </Box>
      ) : (
        <Box>
          <video ref={videoRef} autoPlay playsInline />
          <Box mt={2}>
            {stream ? (
              <Button onClick={handlePhotoClick}>Take photo</Button>
            ) : (
              <Button onClick={handleStartClick}>Start camera</Button>
            )}
            {stream && (
              <Button onClick={handleStopClick} ml={2}>
                Stop camera
              </Button>
            )}
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default Camera;
