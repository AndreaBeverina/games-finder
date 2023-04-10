import { Box, Button, Card, CardBody, Center, HStack, Heading, Image, Text, VStack, Stack, Skeleton, Input, SkeletonText } from "@chakra-ui/react";
import { Rating, ThemeProvider, createTheme } from "@mui/material";
import { useLoaderData } from "react-router-dom";
import { postGameById, getSuggestions } from "../../chiamate/chiamate";
import { useRef, useState } from "react";
import { Suggestions } from "../suggestions/Suggestion";
import missingArtwork from "../../img/missingArtwork3.png"

const theme = createTheme();

export const loader = async ({ params }) => {
    const game = await postGameById(params.id);
    return { game };
}


export const DetailsPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState();

    const { game } = useLoaderData();

    const ref = useRef(null);

    const handleClickSubmit = async (e) => {
        setIsLoading(true);
        try {
            const data = await getSuggestions(e.target.value);
            setResult(data);
            setIsLoading(false);
            ref.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }
        catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    }

    return (
        <>
            <Center mt="5rem">
                <VStack spacing="2rem" fontFamily="Futura PT">
                    <Card direction="row">
                        <Image
                            src={missingArtwork}
                            objectFit='contain'
                            minH="20rem"
                            maxW="auto"
                            h="35rem" />

                        <VStack maxW="45rem" pr="2rem">
                            <CardBody>
                                <Heading fontSize="3rem" as="b" color="#ff9f00">{game.title}</Heading>

                                <Box py="1rem">
                                    <Text fontSize="1.6rem" as="b" color="#ff9f00">Genere</Text>
                                    <HStack spacing="1rem">
                                        {
                                            game.genres.map((element, index) => {
                                                return (
                                                    <Text key={index}
                                                    border="1px solid orange"
                                                    borderRadius="0.5rem"
                                                    padding="0.2rem 0.5rem"> {element} </Text>
                                                )
                                            })
                                        }
                                    </HStack>
                                </Box>

                                <Text as="b" fontSize="1.6rem" color="#ff9f00">Trama</Text>
                                <br />
                                <Text pb="1rem" fontSize="1.2rem">{game.summary}</Text>

                                <Text fontSize="1.6rem" as="b" color="#ff9f00" >Valutazione</Text>
                                <Box>
                                    <ThemeProvider theme={theme}>
                                        <Rating
                                            value={game.rating}
                                            precision={0.2}
                                            max={5}
                                            readOnly
                                            sx={{
                                                color: "white"
                                            }}
                                        />
                                    </ThemeProvider>
                                </Box>

                            </CardBody>
                        </VStack>
                    </Card>

                    <Button onClick={handleClickSubmit}
                        minW="15rem"
                        fontSize="1.5rem"
                        padding="1.5rem 3rem"
                        bg="#ff9923"
                        _hover={{
                            bg: "white",
                            color: "#ff9923"
                        }}
                        _active={{
                            bg: "#dfdfdf",
                            color: "#ff9923"
                        }}>Consigliami</Button>

                    <VStack width="100%" ref={ref}>
                        {!isLoading && result && (
                            <>
                                <Suggestions list={result} />
                            </>
                        )}
                        {
                            isLoading && (
                                <HStack w="15rem" spacing="2rem" justifyContent="center" m="0 auto 1rem">

                                    <VStack>
                                        <Skeleton h="15rem" w="11.2rem" />
                                        <SkeletonText noOfLines={1} skeletonHeight="1rem" w="11.2rem" />
                                        <SkeletonText noOfLines={1} skeletonHeight="0.8rem" w="11.2rem" />
                                    </VStack>
                                    <VStack>
                                        <Skeleton h="15rem" w="11.2rem" />
                                        <SkeletonText noOfLines={1} skeletonHeight="1rem" w="11.2rem" />
                                        <SkeletonText noOfLines={1} skeletonHeight="0.8rem" w="11.2rem" />
                                    </VStack>
                                    <VStack>
                                        <Skeleton h="15rem" w="11.2rem" />
                                        <SkeletonText noOfLines={1} skeletonHeight="1rem" w="11.2rem" />
                                        <SkeletonText noOfLines={1} skeletonHeight="0.8rem" w="11.2rem" />
                                    </VStack>
                                    <VStack display={{ sm: "none", md: "flex"}}>
                                        <Skeleton h="15rem" w="11.2rem" />
                                        <SkeletonText noOfLines={1} skeletonHeight="1rem" w="11.2rem" />
                                        <SkeletonText noOfLines={1} skeletonHeight="0.8rem" w="11.2rem" />
                                    </VStack>
                                    <VStack display={{ sm: "none", md: "none", lg:"flex"}}>
                                        <Skeleton h="15rem" w="11.2rem" />
                                        <SkeletonText noOfLines={1} skeletonHeight="1rem" w="11.2rem" />
                                        <SkeletonText noOfLines={1} skeletonHeight="0.8rem" w="11.2rem" />
                                    </VStack>

                                </HStack>
                            )
                        }
                    </VStack>

                </VStack>
            </Center>
        </>
    )
}

/*



*/