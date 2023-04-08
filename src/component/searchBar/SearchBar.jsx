import { Box, Button, Center, HStack, Image, Input, Skeleton, SkeletonText, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { postVideogame } from "../../chiamate/chiamate";
import { ResultDisplay } from "../resultDisplay/ResultDisplay";
import logoImg from  "../../img/logo.png";

export const SearchBar = () => {

  const [gameTitle, setGameTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState();

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

  const handleKeyPress = async (event) => {
    if (event.key == "Enter" && gameTitle.length > 0) {
      handleClickSubmit();
    }
  }

  return (
    <>
      <Center marginTop="2rem" >
        <VStack width="100%" fontFamily="Futura PT">
          <Image src={logoImg} mb="2rem"/>
          <VStack width={{sm:"70%", md: "40%"}} h="30%">
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

            <Button
              isDisabled={gameTitle === "" ? true : false}
              onClick={handleClickSubmit}
              bg="#ff9923"
              _hover={{
                bg: "white",
                color: "#ff9923"
              }}
              _active={{
                bg: "#dfdfdf",
                color: "#ff9923"
              }}
            >
              Invia
            </Button>
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
                  <VStack display={{ sm: "none", md: "flex"}}>
                    <Skeleton h="15rem" w="11.2rem" />
                    <SkeletonText noOfLines={1} skeletonHeight="1rem" w="11.2rem" />
                  </VStack>
                  <VStack display={{ sm: "none", md: "none", lg:"flex"}}>
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