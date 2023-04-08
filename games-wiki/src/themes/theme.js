import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
import { cardTheme } from "./cardTheme";

export const customTheme = extendTheme({
  components: {
    Card: cardTheme
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