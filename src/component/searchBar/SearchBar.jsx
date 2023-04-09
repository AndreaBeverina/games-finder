import { Box, Button, Center, Checkbox, HStack, Image, Input, SimpleGrid, Skeleton, SkeletonText, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { postVideogame } from "../../chiamate/chiamate";
import genresList from "../../db/genres.json";
import logoImg from "../../img/logo.png";
import { ResultDisplay } from "../resultDisplay/ResultDisplay";
import "./SearchBar.css";

export const SearchBar = () => {

  const [gameTitle, setGameTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState();
  const [popup, setPopup] = useState(false);
  const [chosenGenres, setChosenGenres] = useState([])

  const handleChangeUrl = (e) => {
    setGameTitle(e.target.value);
  }

  const handleClickSubmit = async () => {
    setIsLoading(true);
    try {
      const data = await postVideogame(gameTitle);
      setResult(data);
      setIsLoading(false);
    }
    catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const handleClickPopup = () => {
    setPopup(!popup);
  }

  const handleClickClear = () => {
    setGameTitle("");
  }

  const handleChangeGenre = (event) => {
    const list = [...chosenGenres];
    const genre = event.target.value;

    if (list.includes(genre)) {

      list.pop(genre);
    }
    else {
      list.push(genre);
    }
    setChosenGenres(list);
    console.log("Lista: " + list);
  }

  const handleKeyPress = async (event) => {
    if (event.key == "Enter" && gameTitle.length > 0) {
      handleClickSubmit();
    }
  }

  return (
    <>
      <Center
        className={`${popup ? "show" : "hide"}`}
        marginTop="-2rem"
        width="100%"
        height="100vh"
        position="absolute"
        zIndex="10"
        >
        <SimpleGrid
          columns={1}
          width="50%"
          height="auto"
          backgroundColor="black"
          border="2px solid #ff9923"
          borderRadius="1rem">

          <Box textAlign="right" p="1rem">
            <Button onClick={handleClickPopup} variant="main">X</Button>
          </Box>

          <Box p="1rem">
            <SimpleGrid columns={5}>
              {genresList.genresList.map((genre, index) => {
                return (
                  <Center key={index}>
                    <Checkbox onChange={handleChangeGenre} value={genre}
                    >
                      {genre}
                    </Checkbox>
                  </Center>
                )
              })}
            </SimpleGrid>
          </Box>

          <Box textAlign="center" p="1rem">
            <Button variant="main">Invia</Button>
          </Box>

        </SimpleGrid>
      </Center>



      <Center marginTop="2rem">
        <VStack width="100%" fontFamily="Futura PT">
          <Image src={logoImg} mb="2rem" />
          <VStack width={{ sm: "70%", md: "40%" }} h="30%">
            <Input
              fontSize="1.5rem"
              onChange={(e) => handleChangeUrl(e)}
              onKeyDown={handleKeyPress}
              type="text"
              borderColor="#ff9923"
              rounded="lg"
              placeholder="Inserisci il titolo di un videogioco"
              value={gameTitle}
              _focus={{
                borderColor: "white",
              }}
            />

            <HStack>
              <Button
                isDisabled={gameTitle === "" ? true : false}
                onClick={handleClickSubmit}
                variant="main"
              >
                Cerca
              </Button>

              <Button
                onClick={handleClickPopup}
                variant="filterBtn"
              >
                Ricerca per genere
              </Button>

              <Button
                isDisabled={gameTitle === "" ? true : false}
                onClick={handleClickClear}
                variant="clearBtn"
              >
                Cancella ricerca
              </Button>
            </HStack>




          </VStack>


          <Box width="100%">
            {!isLoading && result && (
              <>
                <ResultDisplay gameList={result} />
              </>
            )}
            {
              isLoading && (
                <HStack mt="2rem" w="15rem" spacing="2rem" justifyContent="center" m="3rem auto 0">

                  <VStack>
                    <Skeleton h="15rem" w="11.2rem" />
                    <SkeletonText noOfLines={1} skeletonHeight="1rem" w="11.2rem" />
                  </VStack>
                  <VStack>
                    <Skeleton h="15rem" w="11.2rem" />
                    <SkeletonText noOfLines={1} skeletonHeight="1rem" w="11.2rem" />
                  </VStack>
                  <VStack>
                    <Skeleton h="15rem" w="11.2rem" />
                    <SkeletonText noOfLines={1} skeletonHeight="1rem" w="11.2rem" />
                  </VStack>
                  <VStack display={{ sm: "none", md: "flex" }}>
                    <Skeleton h="15rem" w="11.2rem" />
                    <SkeletonText noOfLines={1} skeletonHeight="1rem" w="11.2rem" />
                  </VStack>
                  <VStack display={{ sm: "none", md: "none", lg: "flex" }}>
                    <Skeleton h="15rem" w="11.2rem" />
                    <SkeletonText noOfLines={1} skeletonHeight="1rem" w="11.2rem" />
                  </VStack>

                </HStack>
              )
            }
          </Box>

        </VStack>

      </Center>

    </>
  )
}

/**
 * <HStack mt="2rem" w="15rem" spacing="2rem" justifyContent="center" m="3rem auto 0">
 */