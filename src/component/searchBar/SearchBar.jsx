import { Box, Button, Center, Checkbox, HStack, Image, Input, SimpleGrid, Skeleton, SkeletonText, Slider, SliderFilledTrack, SliderMark, SliderThumb, SliderTrack, Text, VStack } from "@chakra-ui/react";
import { useState, useRef } from "react";
import { postSearchByTitle, postSearchByGenre, postSearchByRating, getCoverArt } from "../../chiamate/chiamate";
import genresList from "../../db/genres.json";
import logoImg from "../../img/logo2.png";
import { ResultDisplay } from "../resultDisplay/ResultDisplay";

export const SearchBar = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState();

  const [popupTitle, setPopupTitle] = useState(true);
  const [gameTitle, setGameTitle] = useState("");

  const [popupGenre, setPopupGenre] = useState(false);
  const [chosenGenres, setChosenGenres] = useState([]);

  const [popupRating, setPopupRating] = useState(false);
  const [sliderMinValue, setSliderMinValue] = useState(0);
  const [sliderMaxValue, setSliderMaxValue] = useState(5);

  const ref = useRef(null);

  const handleChangeUrl = (e) => {
    setGameTitle(e.target.value);
  }

  const handleClickPopupTitle = () => {
    setPopupTitle(true)
    setPopupGenre(false);
    setPopupRating(false);
  }

  const handleClickPopupGenre = () => {
    setPopupTitle(false)
    setPopupGenre(true);
    setPopupRating(false);
  }

  const handleClickPopupRating = () => {
    setPopupTitle(false)
    setPopupGenre(false);
    setPopupRating(true);
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
  }

  const handleKeyPress = async (event) => {
    if (event.key == "Enter" && gameTitle.length > 0) {
      handleClickSubmit();
    }
  }

  const handleClickSubmit = async () => {
    setIsLoading(true);
    try {
      const data = await postSearchByTitle(gameTitle);
      console.log(data)
      setResult(data);
      setIsLoading(false);
      ref.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
    catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }

  const handleSubmitGenres = async () => {
    setIsLoading(true);
    setGameTitle("");
    try {
      const data = await postSearchByGenre(chosenGenres);
      setResult(data);
      setIsLoading(false);
      ref.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
    catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }

  const handleSubmitRatings = async () => {
    setIsLoading(true);
    setGameTitle("");
    try {
      const ratings = [];
      ratings.push(sliderMinValue)
      ratings.push(sliderMaxValue)
      const data = await postSearchByRating(ratings);
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
      <Center marginTop="2rem">
        <VStack width="100%" fontFamily="Futura PT">
          <Image src={logoImg} mb="2rem" w="25rem" />
          <VStack width={{ sm: "80%", md: "70%", lg: "60%" }} h="30%">

            <Center
              display={`${popupTitle ? "flex" : "none"}`}
              width="100%"
              mb="1rem"
            >
              <HStack spacing="1rem">
                <Input
                  bg="#03030332"
                  minWidth="35rem"
                  fontSize="1.5rem"
                  onChange={(e) => handleChangeUrl(e)}
                  onKeyDown={handleKeyPress}
                  type="text"
                  border="2px solid var(--appBlue)"
                  rounded="lg"
                  placeholder="Inserisci il titolo di un videogioco"
                  value={gameTitle}
                  _focus={{
                    borderColor: "white",
                  }}
                />
                <Button
                  isDisabled={gameTitle === "" ? true : false}
                  onClick={handleClickSubmit}
                  variant="main"
                >
                  Cerca
                </Button>
                <Button
                  isDisabled={gameTitle === "" ? true : false}
                  onClick={handleClickClear}
                  variant="clearBtn"
                >
                  Cancella ricerca
                </Button>
              </HStack>
            </Center>

            <Center
              display={`${popupRating ? "flex" : "none"}`}
            >
              <SimpleGrid
                columns={1}
                height="auto"
                backgroundColor="#03030332"
                border="2px solid var(--appPurple)"
                borderRadius="1rem"
                mb="1rem">

                <VStack>

                  <HStack>
                    <Box width="15rem">
                      <Text px="2rem" fontSize="1.3rem">Rating minimo: {sliderMinValue} </Text>
                    </Box>

                    <Box p="1rem 2rem"
                      w="20rem"
                      maxW="20rem">
                      <Slider defaultValue={0} min={0} max={5} step={0.5} onChange={(val) => setSliderMinValue(val)}>
                        <SliderMark value={0} mt="0.5rem">
                          0
                        </SliderMark>
                        <SliderMark value={1} mt="0.5rem">
                          1
                        </SliderMark>
                        <SliderMark value={2} mt="0.5rem">
                          2
                        </SliderMark>
                        <SliderMark value={3} mt="0.5rem">
                          3
                        </SliderMark>
                        <SliderMark value={4} mt="0.5rem">
                          4
                        </SliderMark>
                        <SliderMark value={5} mt="0.5rem">
                          5
                        </SliderMark>
                        <SliderTrack bg='black'>
                          <Box position='relative' right={10} />
                          <SliderFilledTrack bg='var(--appOrange)' />
                        </SliderTrack>
                        <SliderThumb boxSize={5} />
                      </Slider>
                    </Box>
                  </HStack>

                  <HStack>
                    <Box width="15rem">
                      <Text px="2rem" fontSize="1.3rem">Rating massimo: {sliderMaxValue} </Text>
                    </Box>

                    <Box p="1rem 2rem"
                      w="20rem"
                      maxW="20rem">
                      <Slider defaultValue={5} min={0} max={5} step={0.5} onChange={(val) => setSliderMaxValue(val)}>
                        <SliderMark value={0} mt="0.5rem">
                          0
                        </SliderMark>
                        <SliderMark value={1} mt="0.5rem">
                          1
                        </SliderMark>
                        <SliderMark value={2} mt="0.5rem">
                          2
                        </SliderMark>
                        <SliderMark value={3} mt="0.5rem">
                          3
                        </SliderMark>
                        <SliderMark value={4} mt="0.5rem">
                          4
                        </SliderMark>
                        <SliderMark value={5} mt="0.5rem">
                          5
                        </SliderMark>
                        <SliderTrack bg='black'>
                          <Box position='relative' right={10} />
                          <SliderFilledTrack bg='#ff9923' />
                        </SliderTrack>
                        <SliderThumb boxSize={5} />
                      </Slider>
                    </Box>
                  </HStack>

                </VStack>


                <Box textAlign="center" p="1rem">
                  <Button
                    variant="main"
                    onClick={handleSubmitRatings}
                    isDisabled={(sliderMinValue > sliderMaxValue) ? true : false}>
                    Cerca
                  </Button>
                </Box>

              </SimpleGrid>
            </Center>

            <Center
              display={`${popupGenre ? "flex" : "none"}`}
              minW="30rem"
            >
              <SimpleGrid
                columns={1}
                height="auto"
                backgroundColor="#03030332"
                border="2px solid var(--appMagenta)"
                borderRadius="1rem"
                mb="1rem">

                <Box p="1rem">
                  <SimpleGrid columns={6}>
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

                <Box textAlign="center" p="0.5rem 1rem 1rem">
                  <Button
                    variant="main"
                    onClick={handleSubmitGenres}>
                    Cerca
                  </Button>
                </Box>

              </SimpleGrid>
            </Center>


            <HStack>
              <Button
                onClick={handleClickPopupTitle}
                variant="titleBtn"
              >
                Ricerca per titolo
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
            </HStack>


          </VStack>


          <Box width="100%" ref={ref}>
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