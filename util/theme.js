import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

export const COLORS = {
  primary: '#2A286A',
  secondary: '#00DC99',
  light: '#9D98EC',
  grey: '#BFBFBF',
  white: '#FFFFFF',
  dark: '#465969',
};

export const SIZES = {
  base: 8,
  padding: 12,
  largeTitle: 32,
  h1: 25,
  h2: 20,
  h3: 18,
  body1: 16,
  body2: 16,
  body3: 16,
  width,
  height,
};

export const FONTS = {
  largeTitleFontStyling: {
    fontFamily: 'CircularStd-Bold',
    fontSize: SIZES.largeTitle,
    lineHeight: 40,
    fontWeight: 'bold',
  },
  h1FontStyling: {
    fontFamily: 'CircularStd-Bold',
    fontSize: SIZES.h1,
    lineHeight: 32
  },
  h2FontStyling: {
    fontFamily: 'CircularStd-Bold',
    fontSize: SIZES.h2,
  },
  h3FontStyling: {
    fontFamily: 'CircularStd-Bold',
    fontSize: SIZES.h3,
  },
  body1FontStyling: {
    fontFamily: 'CircularStd-Book',
    fontSize: SIZES.body1,
    lineHeight: 25,
  },
  body2FontStyling: {
    fontFamily: 'CircularStd-Book',
    fontSize: SIZES.body2,
    lineHeight: 20,
  },
  body3FontStyling: {
    fontFamily: 'CircularStd-Book',
    fontSize: SIZES.body3,
  },

  base: 8,
  padding: 12,
  largeTitle: 30,
  h1: 2,
  h2: 3,
  h3: 5,
  body1: 16,
  body2: 16,
  body3: 16,
  width,
  height,
};

const appTheme = {COLORS, SIZES, FONTS};

export default appTheme;
