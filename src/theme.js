import { createTheme } from "@mui/material/styles";

const colors = {
  gray : "#f4f4f4",
  white: "#ffffff",
  darkGray_100: "#999",
  darkGray_200: "rgba(153, 153, 153, 0.2)",
  darkGray_300: "rgba(154, 154, 154, 0.2)",
  lightSeaGreen: "#02a5a5",
  gray_100: "#feffff",
  gray_200: "#072146",
  gray_300: "rgba(0, 0, 0, 0)",
  mediumSeaGreen: "#1dbd8d",
  steelBlue: "#3b85c7",
  aqua: "#5cfefe",
  darkSlateBlue_100: "#19407f",
  darkSlateBlue_200: "#102d60",
  blue: "#000dff",
  black: "#000",
  gainsboro: "#d9d9d9",
  orange_1: "#F7893B",
  titleBlue: "rgb(45, 204, 205)"
}


const fontSizes = {
  fontSize_5xs: '8px',
  fontSize_xs: '12px',
  fontSize_xs_1: '14px',
  fontSize_base: '16px',
  fontSize_7xs: '6px',
  fontSize_mid_2: '17.2px',
  fontSize_sm: '14px',
  fontSize_xl_5: '20.5px',
  fontSize_3xs: '10px',
  fontSize_xl: '20px',
}


const elements = {
  label: {
    color: colors.darkGray_100,
    ...colors
  },
  header:{
    background: colors.white,
    color: colors.darkSlateBlue_100,
    label:{
      primary: colors.darkSlateBlue_100,
      ...colors
    }
  },
  footer:{
    background: colors.white,
    color: colors.darkSlateBlue_100,
    label:{
      primary: colors.darkSlateBlue_100,
      fontSize: fontSizes.fontSize_7xs,
      ...colors
    }
  },
  paperLogin:{
    background: colors.darkSlateBlue_100,
  },
  paperMain:{
    background: colors.white
  }
}

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#3f51b5"
    },
    secondary: {
      main: "#f50057",
    },
    ...elements
  },
  typography: {
    title: {
      fontWeight: 600,
      color: "#000",
      fontSize: fontSizes.fontSize_base,
      fontFamily: "'Poppins', sans-serif"  
    },
    description:{
      fontSize: fontSizes.fontSize_xs_1,
      color: "#000",
      fontWeight: 600,
      fontFamily: "'Poppins', sans-serif"  
    },
    cardDescription: {
      fontSize: fontSizes.fontSize_xs_1,
      color: "#000",
      fontFamily: "'Poppins', sans-serif"  
    },
    cardName: {
      fontSize: fontSizes.fontSize_xs_1,
      color: "#000",
      fontWeight: 500,
      fontFamily: "'Poppins', sans-serif"  
    }
  }
});

export default theme;
