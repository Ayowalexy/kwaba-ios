import { Dimensions } from "react-native";
const {width, height} = Dimensions.get("window");

export const COLORS = {
    primary: "#fff",
    secondary: "#000"
};

export const SIZES = {
    base:8,
    padding:12,
    largeTitle:50,
    h1:2,
    h2:3,
    h3:5,
    body1:30,
    body2:40,
    body3:50,
    width,
    height
};

export const FONTS = {
    largeTitle:{fontFamily:"Cairo-Black", fontSize:SIZES.largeTitle, lineHeight:10},
    h1:{fontFamily:"Cairo-Black", fontSize:SIZES.largeTitle, lineHeight:10},
    h2:{fontFamily:"Cairo-Black", fontSize:SIZES.largeTitle, lineHeight:10},
    h3:{fontFamily:"Cairo-Black", fontSize:SIZES.largeTitle, lineHeight:10},
    body1:{fontFamily:"Cairo-Black", fontSize:SIZES.largeTitle, lineHeight:10},
    body2:{fontFamily:"Cairo-Black", fontSize:SIZES.largeTitle, lineHeight:10},
    body3:{fontFamily:"Cairo-Black", fontSize:SIZES.largeTitle, lineHeight:10}
};

const appTheme = {COLORS, SIZES, FONTS};

export default appTheme;