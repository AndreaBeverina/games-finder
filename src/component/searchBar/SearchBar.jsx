import { Box, Button, Center, Checkbox, HStack, Image, Input, SimpleGrid, Skeleton, SkeletonText, Slider, SliderFilledTrack, SliderMark, SliderThumb, SliderTrack, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { postVideogame, postVideogameByGenre } from "../../chiamate/chiamate";
import genresList from "../../db/genres.json";
import logoImg from "../../img/logo.png";
import { ResultDisplay } from "../resultDisplay/ResultDisplay";
import "./SearchBar.css";

export const SearchBar = () => {

  const [gameTitle, setGameTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState();
  const [popupGenre, setPopupGenre] = useState(false);
  const [chosenGenres, setChosenGenres] = useState([]);

  const [popupRating, setPopupRating] = useState(false);
  const [chosenRatings, setChosenRatings] = useState([]);


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
  }

  const handleClickPopupGenre = () => {
    setPopupGenre(!popupGenre);
  }

  const handleClickPopupRating = () => {
    setPopupRating(!popupRating);
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
    console.log(list)
  }

  const handleKeyPress = async (event) => {
    if (event.key == "Enter" && gameTitle.length > 0) {
      handleClickSubmit();
    }
  }

  const handleSubmitGenres = async () => {
    setIsLoading(true);
    setPopupGenre(false);
    setGameTitle("");
    try {
      const data = await postVideogameByGenre(chosenGenres);
      setResult(data);
      setIsLoading(false);
    }
    catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }

  return (
    <>
      <Center
        className={`${popupGenre ? "show" : "hide"}`}
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
          backgroundColor="rgba(0, 0, 0, 0.9)"
          border="2px solid #ff9923"
          borderRadius="1rem">

          <Box textAlign="right" p="1rem">
            <Button onClick={handleClickPopupGenre} variant="clearBtn">X</Button>
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
            <Button variant="main" onClick={handleSubmitGenres}>Invia</Button>
          </Box>

        </SimpleGrid>
      </Center>

      <Center
        className={`${popupRating ? "show" : "hide"}`}
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
          backgroundColor="rgba(0, 0, 0, 0.9)"
          border="2px solid #ff9923"
          borderRadius="1rem">

          <Box textAlign="right" p="1rem">
            <Button onClick={handleClickPopupRating} variant="clearBtn">X</Button>
          </Box>

          <Box p="1rem">
            <Slider defaultValue={2.5} min={0} max={5} step={0.5}>
              <SliderMark value={0} mt="0.5rem">
                0
              </SliderMark>
              <SliderMark value={1} m="0.5rem 0 0 0.4rem">
                1
              </SliderMark>
              <SliderMark value={2} m="0.5rem 0 0 0.4rem">
                2
              </SliderMark>
              <SliderMark value={3} m="0.5rem 0 0 0.4rem">
                3
              </SliderMark>
              <SliderMark value={4} m="0.5rem 0 0 0.4rem">
                4
              </SliderMark>
              <SliderMark value={5} mt="0.5rem">
                5
              </SliderMark>
              <SliderTrack bg='blue'>
                <Box position='relative' right={10} />
                <SliderFilledTrack bg='yellow' />
              </SliderTrack>
              <SliderThumb boxSize={5} />
            </Slider>
          </Box>

          <Box textAlign="center" p="1rem">
            <Button variant="main" >Invia</Button>
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
                onClick={handleClickPopupRating}
                variant="ratingBtn"
              >
                Ricerca per valutazione
              </Button>

              <Button
                onClick={handleClickPopupGenre}
                variant="genreBtn"
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
                {result.length == 0
                  ? <Center mt="2rem" fontSize="2rem"> Non è stato trovato alcun videogioco. Prova a cambiare i parametri di ricerca! </Center>
                  : <ResultDisplay gameList={result} />}
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