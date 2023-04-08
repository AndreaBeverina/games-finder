import { Box, Center, Image, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import logoImg from  "../../img/logo.png";

export const ResultDisplay = (props) => {

  const gameList = props.gameList;

  console.log (gameList)
  return (
    <Center mt="3rem">
      <SimpleGrid columns={{sm: 3, md: 4, lg: 5}} spacingX="1.5rem" spacingY="2.5rem" mb="2rem">
        {
          gameList.map((element, index) => {
            return (
                <VStack align="left" key={index}>
                  <Link to={`details/${element.id}`}>
                    <Image
                      h="15rem"
                      w="auto"
                      maxW="12rem"
                      src={logoImg}
                      alt=""
                      transitionDuration=".3s"
                      _hover={{
                        transform: "scale(1.04)",
                      }} />
                  </Link>

                  <Box maxW="10rem">
                    <Text>{element.title}</Text>
                  </Box>


                </VStack>
            )
          })
        }
      </SimpleGrid>
    </Center>
  )
}