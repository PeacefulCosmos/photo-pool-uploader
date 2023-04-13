import { useRef, useState } from "react";
import ReactCrop from "react-image-crop";
import { Button, Image as ChakraImage } from "@chakra-ui/react";
import "react-image-crop/dist/ReactCrop.css";
import { canvasPreview } from "./canvasPreview";

function Cropper({ imageSrc, onCropComplete }) {
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

  const compressBlob = async (canvas) => {
    canvas.toBlob((blob) => {});
  };

  const handleCropChange = (newCrop) => setCrop(newCrop);

  const handleImageLoad = async (img) => {
    imageRef.current = img;
    const canvas = canvasRef.current;
    const croppedCanvas = await canvasPreview(imageRef.current, canvas, crop);
    onCropComplete(croppedCanvas.toDataURL());
  };

  const handleCropComplete = async (croppedAreaPixels) => {
    try {
      const canvas = canvasRef.current;
      const croppedCanvas = await canvasPreview(imageRef.current, canvas, crop);
      onCropComplete(croppedCanvas.toDataURL());
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
