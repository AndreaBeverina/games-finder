export const ButtonStyles = {
    baseStyle: {},
  
    sizes: {
      bigButton: (props) => ({
        borderRadius: "30px",
        padding: "10px 75px",
        color: "black",
        _hover: {
          transform: "no-transform",
        }
      })
    },
  
    variants: {
      main: (props) => ({
        bg: "#ff9923",
        _hover: {
          bg: "white",
          color: "#ff9923",
        },
        _active: {
          bg: "#dfdfdf",
          color: "#ff9923",
        }
      }),
      clearBtn: (props) => ({
        bg: "red",
        _hover: {
          bg: "white",
          color: "red",
        },
        _active: {
          bg: "#dfdfdf",
          color: "red",
        }
      }),
      genreBtn: (props) => ({
        bg: "#f30c7c",
        _hover: {
          bg: "white",
          color: "#f30c7c",
        },
        _active: {
          bg: "#dfdfdf",
          color: "#f30c7c",
        }
      }),
      ratingBtn: (props) => ({
        bg: "#b400df",
        _hover: {
          bg: "white",
          color: "#b400df",
        },
        _active: {
          bg: "#dfdfdf",
          color: "#b400df",
        }
      })

    },
  
    defaultProps: {},
  }