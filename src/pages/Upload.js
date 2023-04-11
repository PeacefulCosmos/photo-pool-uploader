import { useState } from "react";
import {
  Box,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
} from "@chakra-ui/react";

function Upload() {
  const [remarks, setRemarks] = useState("");
  const [file, setFile] = useState(null);

  const handleRemarksChange = (event) => {
    setRemarks(event.target.value);
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`Remarks: ${remarks}`);
    console.log(`File: ${file ? file.name : "none"}`);
    // Submit the form data to the server here
  };

  return (
    <Center h="100vh">
      <Box w="md" p={6} borderWidth={1} borderRadius={8} boxShadow="md">
        <form onSubmit={handleSubmit}>
          <Flex direction="column" align="center" justify="center">
            <FormControl w="100%">
              <FormLabel>Upload Photo or Take Picture</FormLabel>
              <Input type="file" accept="image/*" onChange={handleFileChange} />
            </FormControl>
            <FormControl w="100%" mt={4}>
              <FormLabel>Remarks</FormLabel>
              <Textarea placeholder="Enter remarks" value={remarks} onChange={handleRemarksChange} />
            </FormControl>
            <Button type="submit" colorScheme="blue" isFullWidth mt={6}>
              Submit
            </Button>
          </Flex>
        </form>
      </Box>
    </Center>
  );
}

export default Upload;
