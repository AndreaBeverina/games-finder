import { Center, Text, VStack, HStack, Image, Box, SimpleGrid } from "@chakra-ui/react";
import { Rating, ThemeProvider, createTheme } from "@mui/material";
import { Link } from "react-router-dom";
import missingArtwork from "../../img/missingArtwork4.png"

const theme = createTheme();

export const Suggestions = (props) => {
    const suggestionsList = props.list;
    
    return (
        <Center>
            <SimpleGrid columns={{ sm: 3, md: 4, lg: 5 }} spacing="1.5rem">
                {
                    suggestionsList.map((element, index) => {
                        return (
                            <VStack align="left" key={index}
                            >
                                <Link onClick={() => { window.location.href = `/details/${element.id}` }} >
                                    <Image
                                        h="15rem"
                                        maxW="auto"
                                        src={missingArtwork}
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