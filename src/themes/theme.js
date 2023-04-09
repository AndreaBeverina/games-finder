import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
import { cardTheme } from "./cardTheme";
import { ButtonStyles as Button } from "./buttonStyles";
import { checkboxTheme } from "./checkboxTheme";

export const customTheme = extendTheme({
  components: {
    Card: cardTheme, Button, Checkbox: checkboxTheme
  },

  styles: {
    global: (props) => ({
      body: {
        bg: mode("transparent", "transparent")(props),
        color: mode("white", "white")(props)
      }
    })
  },
})