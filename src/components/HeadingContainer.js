import { Box, Image, Heading, Flex } from "@chakra-ui/react";

function HeadingContainer() {
  const imageUrl = "/images/hkpf_logo.png";
  return (
    <>
      <Image
        src={imageUrl}
        alt="HKPF-Logo"
        w={200}
        mb={6}
        flexDirection={"row"}
      />
      <Heading as="h1" size="xl" color={"whiteAlpha.600"} flexDirection={"row"}>
        HKPF E-CAP PHOTO POOL UPLOADER
      </Heading>
    </>
  );
}

export default HeadingContainer;
