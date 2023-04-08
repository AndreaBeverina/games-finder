import { Center, Text, VStack, HStack, Image, Box, Divider, SimpleGrid } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export const ResultDisplay = (props) => {

  const gameList = props.gameList;

  return (
    <Center mt="3rem">
      <SimpleGrid columns={{sm: 3, md: 4, lg: 5}} spacingX="1.5rem" spacingY="2.5rem" mb="2rem">
        {
          gameList.map((element, index) => {
            return (
              <>
                <VStack align="left" key={index} >
                  <Link to={`details/${element.id}`}>
                    <Image
                      h="15rem"
                      maxW="auto"
                      src={element.imageUrl}
                      transitionDuration=".3s"
                      _hover={{
                        transform: "scale(1.04)",
                      }} />
                  </Link>

                  <Box maxW="10rem">
                    <Text>{element.title}</Text>
                  </Box>


                </VStack>
              </>
            )
          })
        }
      </SimpleGrid>
    </Center>
  )
}