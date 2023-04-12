import { useState } from "react";
import ReactCrop from "react-image-crop";
import { Button, Image as ChakraImage } from "@chakra-ui/react";
import "react-image-crop/dist/ReactCrop.css";

function Cropper({ imageSrc, onCropComplete }) {
  const [crop, setCrop] = useState({
    aspect: 1,
    unit: "%",
    x: 25,
    y: 25,
    width: 50,
    height: 50,
  });
  const [croppedImage, setCroppedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleCropChange = (newCrop) => setCrop(newCrop);

  const handleImageLoaded = (image) => {
    // Do any custom logic when the image is loaded
  };

  const handleCropComplete = async (c) => {
    try {
      //   const canvas = document.createElement("canvas");
      //   const image = new Image();
      //   image.src = imageSrc;
      //   canvas.width = croppedAreaPixels.width;
      //   canvas.height = croppedAreaPixels.height;
      //   const ctx = canvas.getContext("2d");
      //   ctx.drawImage(
      //     image,
      //     croppedAreaPixels.x,
      //     croppedAreaPixels.y,
      //     croppedAreaPixels.width,
      //     croppedAreaPixels.height,
      //     0,
      //     0,
      //     croppedAreaPixels.width,
      //     croppedAreaPixels.height,
      //   );
      //   const datUrl = canvas.toDataURL("image/jpeg", 1.0);
      console.log(c);
      setCroppedImage(c);

      onCropComplete(c);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <ReactCrop
        crop={crop}
        onChange={handleCropChange}
        onImageLoaded={handleImageLoaded}
        onComplete={handleCropComplete}
      >
        <ChakraImage src={imageSrc} />
      </ReactCrop>
    </>
  );
}

export default Cropper;
