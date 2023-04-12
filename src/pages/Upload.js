import { useState, useRef } from "react";
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
  Image,
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
import authService from "../services/auth.service";
import Cropper from "../components/cropper/Cropper";

function Upload() {
  const FileMaxSize = 3 * 1024 ** 2;
  const [isLoading, setIsLoading] = useState(false);
  const [remarks, setRemarks] = useState("");
  const [fileName, setFileName] = useState("");
  const [file, setFile] = useState(null);
  const [image, setImage] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const fileInputRef = useRef(null);
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleChanges = (event) => {
    if (event.target.name === "remark") {
      setRemarks(event.target.value);
    } else if (event.target.name === "file-name") {
      setFileName(event.target.value);
    }
  };

  const handleClick = () => {
    fileInputRef.current.click();
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
    setImage(imageUrl);
  };

  const loadImage = (reader, file) => {
    return new Promise((resolve, reject) => {
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleCropComplete = (croppedImage) => {
    setCroppedImage(croppedImage);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`Remarks: ${remarks}`);
    console.log(`File: ${file ? file.name : "none"}`);
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleSaveClick = () => {
    // Do any custom logic when the save button is clicked
    handleModalClose();
    console.log(croppedImage);
    setImage(croppedImage);
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
              <FormLabel fontSize={"larger"} mb={"20px"}>
                Upload Photo or Take Picture
              </FormLabel>
              <Grid templateColumns={"repeat(2, 1fr)"} gap={20}>
                <Button
                  type="text"
                  isLoading={isLoading}
                  leftIcon={<Icon as={FiUpload} />}
                  onClick={handleClick}
                  readOnly
                  style={{ cursor: "pointer" }}
                >
                  Upload
                </Button>
                <Button
                  type="text"
                  isLoading={isLoading}
                  hidden={!file}
                  leftIcon={<Icon as={FiCrop} />}
                  onClick={handleModalOpen}
                  readOnly
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
                  <ModalContent height={"100%"} width={"100%"} m={0}>
                    <ModalHeader fontSize={"2xl"}>Cropping</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                      <Cropper
                        imageSrc={image}
                        onCropComplete={handleCropComplete}
                      />
                    </ModalBody>

                    <ModalFooter>
                      <Button
                        colorScheme="blue"
                        mr={3}
                        onClick={handleSaveClick}
                      >
                        Save
                      </Button>
                      <Button onClick={onClose}>Cancel</Button>
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

              <Image src={image} mt={3} maxHeight={"35vh"} />
            </FormControl>
            <FormControl w="100%" mt={4}>
              <FormLabel>File Name</FormLabel>
              <Input
                isDisabled={isLoading}
                name="file-name"
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
  );
}

export default Upload;
