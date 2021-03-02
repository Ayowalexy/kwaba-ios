
import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');


export const COLORS = {
  primary: '#2A286A',
  secondary: '#00DC99',
};

export const SIZES = {

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

export const FONTS = {
  largeTitle: {
    fontFamily: 'CircularStd-Bold',
    fontSize: SIZES.largeTitle,
    lineHeight: 35,
    fontWeight: 'bold',
  },
  h1: {
    fontFamily: 'CircularStd-Bold',
    fontSize: SIZES.largeTitle,
  },
  h2: {
    fontFamily: 'CircularStd-Bold',
    fontSize: SIZES.largeTitle,
  },
  h3: {
    fontFamily: 'CircularStd-Bold',
    fontSize: SIZES.largeTitle,
  },
  body1: {
    fontFamily: 'CircularStd-Book',
    fontSize: SIZES.body1,
    lineHeight: 25,
  },
  body2: {
    fontFamily: 'CircularStd-Book',
    fontSize: SIZES.body2,
  },
  body3: {
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

export const FONTS = {
  largeTitle: {
    fontFamily: 'CircularStd-Bold',
    fontSize: SIZES.largeTitle,
    lineHeight: 35,
    fontWeight: 'bold',
  },
  h1: {
    fontFamily: 'CircularStd-Bold',
    fontSize: SIZES.largeTitle,
  },
  h2: {
    fontFamily: 'CircularStd-Bold',
    fontSize: SIZES.largeTitle,
  },
  h3: {
    fontFamily: 'CircularStd-Bold',
    fontSize: SIZES.largeTitle,
  },
  body1: {
    fontFamily: 'CircularStd-Book',
    fontSize: SIZES.body1,
    lineHeight: 25,
  },
  body2: {
    fontFamily: 'CircularStd-Book',
    fontSize: SIZES.body2,
  },
  body3: {
    fontFamily: 'CircularStd-Book',
    fontSize: SIZES.body3,
  },

};

const appTheme = { COLORS, SIZES, FONTS };

export default appTheme;
