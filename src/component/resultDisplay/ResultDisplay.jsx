import { Box, Center, Image, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import missingArtwork from "../../img/missingArtwork4.png";
import { Rating, ThemeProvider, createTheme } from "@mui/material";
import { getCoverArt } from "../../chiamate/chiamate";

const theme = createTheme();

export const ResultDisplay = (props) => {
  const gameList = props.gameList;

  return (
    <Center mt="3rem">
      <SimpleGrid columns={{ sm: 3, md: 4, lg: 5 }} spacingX="1.5rem" spacingY="2.5rem" mb="2rem">
        {
          gameList.map((element, index) => {
            return (
              <VStack align="left" key={index}>
                <Link to={`details/${element.id}`}>
                  <Image
                    h="15rem"
                    w="auto"
                    maxW="11rem"
                    fit="cover"
                    src={element.url !== "" ? element.url : missingArtwork}
                    alt=""
                    transitionDuration=".3s"
                    _hover={{
                      transform: "scale(1.04)",
                    }} />
                </Link>
                <Box maxW="10rem">
                  <Text>{element.title}</Text>
                  <ThemeProvider theme={theme}>
                    <Rating
                      value={element.rating}
                      precision={0.1}
                      max={5}
                      readOnly
                      sx={{
                        color: "white",
                        fontSize: "1rem"
                      }}
                    />
                  </ThemeProvider>
                </Box>


              </VStack>
            )
          })
        }
      </SimpleGrid>
    </Center>
  )
}