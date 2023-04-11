import { useState, useRef } from "react";
import {
  Box,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  Image,
} from "@chakra-ui/react";
import { Cropper } from "react-cropper";

function Upload() {
  const [remarks, setRemarks] = useState("");
  const [file, setFile] = useState(null);
  const [image, setImage] = useState(null);
  const cropperRef = useRef(null);
  const fileInputRef = useRef(null);

  const handleRemarksChange = (event) => {
    setRemarks(event.target.value);
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    const loadImage = () => {
      return new Promise((resolve, reject) => {
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    };

    const imageUrl = await loadImage();
    setImage(imageUrl);
  };

  const handleCrop = () => {
    const cropper = cropperRef.current;
    const croppedDataUrl = cropper.getCroppedCanvas().toDataURL();
    console.log(croppedDataUrl);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`Remarks: ${remarks}`);
    console.log(`File: ${file ? file.name : "none"}`);
    // Submit the form data to the server here
  };

  return (
    <Center h="100vh">
      <Box
        w="md"
        m={"5"}
        p={6}
        borderWidth={1}
        borderRadius={8}
        boxShadow="md"
        bg={"white"}
      >
        <form onSubmit={handleSubmit}>
          <Flex direction="column" align="center" justify="center">
            <FormControl w="100%">
              <FormLabel>Upload Photo or Take Picture</FormLabel>
              <Input
                type="text"
                value="Select a file..."
                onClick={handleClick}
                readOnly
                style={{ cursor: "pointer" }}
              />
              <Input
                type="file"
                id="image"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: "none" }}
              />

              <Image src={image} mt={3} />

              {/* {image && (
                <Cropper
                  src={image}
                  aspectRatio={16 / 9}
                  ref={cropperRef}
                  style={{ height: "400px", width: "100%" }}
                />
              )} */}
              <button onClick={handleCrop}>Crop</button>
            </FormControl>
            <FormControl w="100%" mt={4}>
              <FormLabel>Remarks</FormLabel>
              <Textarea
                placeholder="Enter remarks"
                value={remarks}
                onChange={handleRemarksChange}
              />
            </FormControl>
            <Button type="submit" colorScheme="blue" mt={6}>
              Submit
            </Button>
          </Flex>
        </form>
      </Box>
    </Center>
  );
}

export default Upload;
