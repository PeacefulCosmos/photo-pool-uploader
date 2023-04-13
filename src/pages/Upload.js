import { useState, useRef, createContext } from "react";
import {
  Box,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
  Textarea,
  Button,
  Image as ChakraImage,
  useToast,
  Icon,
  Grid,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import { FiCrop, FiUpload } from "react-icons/fi";
import Cropper from "../components/cropper/Cropper";
import CropperStateContext from "../context/CopperStateContext";

function Upload() {
  const FileMaxSize = 3 * 1024 ** 2;
  const [cropCanvas, setCropCanvas] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [remarks, setRemarks] = useState("");
  const [fileName, setFileName] = useState("");
  const [file, setFile] = useState(null);
  const [image, setImage] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const fileInputRef = useRef(null);
  const toast = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const convertBase64ToFile = async () => {
    // Slice the image type from the base64 string
    const imageType = croppedImage.substring(
      "data:".length,
      croppedImage.indexOf(";base64"),
    );

    // Decode the base64 string into a binary string using `atob`
    const binaryString = atob(
      croppedImage.slice(croppedImage.indexOf(",") + 1),
    );

    // Create a `Uint8Array` from the binary string
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    // Create a `Blob` object from the `Uint8Array`
    const blob = new Blob([bytes], { type: imageType });

    // Create a `File` object from the `Blob`
    const newFile = new File([blob], fileName, { type: imageType });
    return newFile;
  };

  const handleChanges = (event) => {
    if (event.target.name === "remark") {
      setRemarks(event.target.value);
    } else if (event.target.name === "file-name") {
      setFileName(event.target.value);
    }
  };

  const handleClick = () => {
    fileInputRef.current.value = "";
    fileInputRef.current.click();
    fileInputRef.current.addEventListener("change", handleFileSelect);
  };

  const handleFileSelect = () => {
    // The file selection is complete
    // Do something with the selected file
    setCropCanvas("");
    setCroppedImage("");
    setIsLoading(false);
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    if (!file) {
      return;
    }
    if (file?.type !== "image/png" && file?.type !== "image/jpeg") {
      toast({
        title: "Error",
        description: "File must be a PNG or JPEG image.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    if (file?.size > FileMaxSize) {
      toast({
        title: "Error",
        description: "File size is larger than 3MB",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    setFileName(file.name);
    setFile(file);
    const imageUrl = await loadImage(reader, file);
    setIsLoading(false);
    setImage(imageUrl);
  };

  const loadImage = (reader, file) => {
    return new Promise((resolve, reject) => {
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleSaveClick = async () => {
    setIsLoading(true);
    const croppedImage = await cropCanvas.toDataURL("image/jpeg", 0.2);
    setCroppedImage(croppedImage);
    setIsLoading(false);
    handleModalClose();
    setImage(croppedImage);
  };

  const handleSubmit = async (event) => {
    setIsLoading(true);
    let newFile;
    event.preventDefault();
    if (croppedImage) {
      newFile = await convertBase64ToFile();
    } else {
      newFile = file;
    }

    console.log({ newFile: newFile, fileName: fileName, remarks: remarks });
    toast({
      title: "Success!",
      description: "Submission success",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
    restoreInput();
    setIsLoading(false);
  };

  const restoreInput = () => {
    setCroppedImage(null);
    setFile(null);
    setFileName("");
    setImage(null);
    setIsLoading(false);
    setIsModalOpen(false);
    setRemarks("");
    setCropCanvas(null);
  };

  return (
    <CropperStateContext.Provider value={{ cropCanvas, setCropCanvas }}>
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
                <FormLabel fontSize={"larger"} mb={"20px"}>
                  Upload Photo or Take Picture
                </FormLabel>
                <Grid templateColumns={"repeat(2, 1fr)"} gap={20}>
                  <Button
                    isLoading={isLoading}
                    leftIcon={<Icon as={FiUpload} />}
                    onClick={handleClick}
                    style={{ cursor: "pointer" }}
                  >
                    Upload
                  </Button>
                  <Button
                    isLoading={isLoading}
                    hidden={!file}
                    leftIcon={<Icon as={FiCrop} />}
                    onClick={handleModalOpen}
                    style={{ cursor: "pointer" }}
                  >
                    Crop
                  </Button>
                  <Modal
                    closeOnOverlayClick={false}
                    isOpen={isModalOpen}
                    onClose={handleModalClose}
                  >
                    <ModalOverlay />
                    <ModalContent height={"90%"} width={"95%"} mt={5}>
                      <ModalHeader fontSize={"2xl"}>Cropping</ModalHeader>
                      <ModalCloseButton />
                      <ModalBody pb={6}>
                        <Cropper imageSrc={image} />
                      </ModalBody>

                      <ModalFooter>
                        <Button
                          isLoading={isLoading}
                          colorScheme="blue"
                          mr={3}
                          onClick={handleSaveClick}
                        >
                          Save
                        </Button>
                        <Button onClick={handleModalClose}>Cancel</Button>
                      </ModalFooter>
                    </ModalContent>
                  </Modal>
                </Grid>

                <Input
                  type="file"
                  name="identity-image"
                  id="image"
                  accept=".png,.jpg,.jpeg"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                />

                <ChakraImage src={image} mt={3} maxHeight={"35vh"} />
              </FormControl>
              <FormControl w="100%" mt={4}>
                <FormLabel>File Name</FormLabel>
                <Input
                  isDisabled={isLoading}
                  name="file-name"
                  _placeholder={{ color: "gray.400" }}
                  color={"blackAlpha.700"}
                  placeholder="Enter filename"
                  value={fileName}
                  onChange={handleChanges}
                />
              </FormControl>
              <FormControl w="100%" mt={4}>
                <FormLabel>Remarks</FormLabel>
                <Textarea
                  isDisabled={isLoading}
                  placeholder="Enter remarks"
                  _placeholder={{ color: "gray.400" }}
                  color={"blackAlpha.700"}
                  name="remark"
                  value={remarks}
                  onChange={handleChanges}
                />
              </FormControl>
              <Button
                type="submit"
                colorScheme="blue"
                mt={6}
                minW={"150px"}
                isLoading={isLoading}
              >
                Submit
              </Button>
            </Flex>
          </form>
        </Box>
      </Center>
    </CropperStateContext.Provider>
  );
}

export default Upload;
