import { useRef, useState, useContext, useEffect } from "react";
import ReactCrop from "react-image-crop";
import { Button, Image as ChakraImage } from "@chakra-ui/react";
import "react-image-crop/dist/ReactCrop.css";
import { canvasPreview } from "./canvasPreview";
import CropperStateContext from "../../context/CopperStateContext";

function Cropper({ imageSrc }) {
  useEffect(() => {}, []);

  const { cropCanvas, setCropCanvas } = useContext(CropperStateContext);
  const [crop, setCrop] = useState(null);
  const canvasRef = useRef(null);
  const imageRef = useRef(null);
  const [imageWidth, setImageWidth] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleCropChange = (newCrop) => {
    setCrop(newCrop);
  };

  const handleImageLoad = async (e) => {
    setImageWidth(imageRef.current.naturalWidth);
    const originalWidth = imageRef.current.width;
    const originalHeight = imageRef.current.height;
    const fr = originalWidth / 4;
    const initCrop = {
      unit: "px",
      x: originalWidth / 4,
      y: originalHeight / 4,
      width: originalWidth / 4 + fr,
      height: originalHeight / 4 + fr,
    };
    setCrop(initCrop);
    handleCropComplete(initCrop);
  };

  const handleCropComplete = async (croppedAreaPixels) => {
    try {
      setCrop(croppedAreaPixels);
      const canvas = canvasRef.current;
      const croppedCanvas = await canvasPreview(imageRef.current, canvas, crop);
      if (!croppedCanvas) {
        return;
      }
      setCropCanvas(croppedCanvas);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <ReactCrop
        crop={crop}
        onChange={handleCropChange}
        // onImageLoaded={handleImageLoad}
        onComplete={handleCropComplete}
      >
        <ChakraImage src={imageSrc} ref={imageRef} onLoad={handleImageLoad} />
      </ReactCrop>
      <canvas ref={canvasRef} style={{ display: "none" }} />
    </>
  );
}

export default Cropper;
