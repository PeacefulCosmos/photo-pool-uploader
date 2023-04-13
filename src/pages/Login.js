import {
  Box,
  Heading,
  FormControl,
  Container,
  Stack,
  FormLabel,
  Input,
  Button,
  Image,
} from "@chakra-ui/react";
import { useState } from "react";
import authService from "../services/auth.service";
import { useNavigate } from "react-router-dom";

function Login() {
  const imageUrl = "/images/hkpf_logo.png";

  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "username") {
      setUsername(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const handleSubmit = async (event) => {
    setIsLoading(true);
    event.preventDefault();
    authService.setUser(username);
    setIsLoading(false);
    navigate("/upload");
  };

  return (
    <>
      <Container maxW="lg">
        <Box p={6} textAlign={"center"}>
          <Image src={imageUrl} alt="Logo" width="150px" mb={6} mx="auto" />
          <Heading
            as="h1"
            size="xl"
            color={"whiteAlpha.600"}
            flexDirection={"row"}
          >
            HKPF E-CAP PHOTO POOL UPLOADER
          </Heading>
        </Box>
        <Box p={6} borderWidth={1} borderRadius={8} boxShadow="md">
          <Heading mb={6}>DP Login</Heading>
          <form>
            <Stack spacing={6}>
              <FormControl>
                <FormLabel>Username</FormLabel>
                <Input
                  type="text"
                  name="username"
                  placeholder="Enter your username"
                  isDisabled={isLoading}
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  isDisabled={isLoading}
                  onChange={handleInputChange}
                />
              </FormControl>
              <Button
                type="submit"
                colorScheme="blue"
                isLoading={isLoading}
                onClick={handleSubmit}
              >
                Login
              </Button>
            </Stack>
          </form>
        </Box>
      </Container>
    </>
  );
}

export default Login;
