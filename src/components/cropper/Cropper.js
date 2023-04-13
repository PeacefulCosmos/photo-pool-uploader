import { useRef, useState, useContext, useEffect } from "react";
import ReactCrop from "react-image-crop";
import { Button, Image as ChakraImage } from "@chakra-ui/react";
import "react-image-crop/dist/ReactCrop.css";
import { canvasPreview } from "./canvasPreview";
import CropperStateContext from "../../context/CopperStateContext";

function Cropper({ imageSrc }) {
  useEffect(() => {
    console.log(crop);
    handleCropComplete(crop);
  }, []);

  const { cropCanvas, setCropCanvas } = useContext(CropperStateContext);
  const [crop, setCrop] = useState({
    unit: "%",
    x: 25,
    y: 25,
    width: 50,
    height: 50,
    minWidth: 50,
    minHeight: 50,
  });
  const canvasRef = useRef(null);
  const imageRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleCropChange = (newCrop) => setCrop(newCrop);

  const handleImageLoad = async (img) => {
    imageRef.current = img;
  };

  const handleCropComplete = async (croppedAreaPixels) => {
    try {
      console.log(croppedAreaPixels);
      setCrop(croppedAreaPixels);
      const canvas = canvasRef.current;
      const croppedCanvas = await canvasPreview(imageRef.current, canvas, crop);
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
        onImageLoaded={handleImageLoad}
        onComplete={handleCropComplete}
      >
        <ChakraImage src={imageSrc} ref={imageRef} />
      </ReactCrop>
      <canvas ref={canvasRef} style={{ display: "none" }} />
    </>
  );
}

export default Cropper;
