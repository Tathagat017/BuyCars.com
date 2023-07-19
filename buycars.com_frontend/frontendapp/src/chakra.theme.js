import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  styles: {
    global: {
      a: {
        textDecoration: "none !important",
        transition: "transform 0.5s",
        _hover: {
          transform: "scale(1.25)",
        },
        fontFamily: "Helvetica",
      },
    },
  },
});

export default theme;
