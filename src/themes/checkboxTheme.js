import { checkboxAnatomy as parts } from "@chakra-ui/anatomy"
import {
  createMultiStyleConfigHelpers,
  defineStyle,
} from "@chakra-ui/styled-system"

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys)

const baseStyle = definePartsStyle({
  label: {},

  control: {
    borderRadius: 0,
    borderColor: "orange",

    _checked: {
      border: "2px solid orange",
      bg: "orange",
      color: "black"
    }
  },

  container: {
    margin: "1rem",
    padding: "5px 15px 5px 10px",
    border: "2px solid transparent",
    borderRadius: "10px",
    _hover: {
      border: "2px solid white",
    },
    _checked: {
      border: "2px solid orange",
    }
  }
})


export const checkboxTheme = defineMultiStyleConfig({
  baseStyle,
})