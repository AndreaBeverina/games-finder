import { cardAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(cardAnatomy.keys)

const baseStyle = definePartsStyle({
  // define the part you're going to style
  container: {
    backgroundColor: 'transparent',
    color: "white",
    boxShadow: "none"
  },
  header: {

  },
  body: {
    bg: "transparent",
    padding: "0 0 0 2rem "
  },
  footer: {

  },
})

const variants = {
  smallCard: definePartsStyle({
    body: {
    },
  })
}

export const cardTheme = defineMultiStyleConfig({ baseStyle, variants })