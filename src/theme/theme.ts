const palette = {
  mint50:  '#FDFFFE',
  mint100: '#F1FFFA',
  mint200: '#E5FAF3',
  mint300: '#D7F4EA',
  mint400: '#C8EADE',
  mint500: '#B5DED0',

  teaGreen: '#CCFCCB',
  celadon:  '#96E6B3',
  fern:     '#568259',

  iron300: '#CDD6CE',
  iron400: '#ACB9AE',
  iron500: '#8C9B8E',
  iron600: '#6C7A6E',
  iron700: '#5B675D',
  iron800: '#464E47',
  iron900: '#353B36',
  iron950: '#262B27',
  iron975: '#181B18',
  iron990: '#0E110E',
} as const;

export const lightColors = {
  accent: palette.fern,
  background: palette.mint100,
  border: palette.mint400,
  surface: palette.mint50,
  textPrimary: palette.iron800,
  textSecondary: palette.iron600,
} as const;

export type ColorScheme = Record<keyof typeof lightColors, string>;

export const darkColors: ColorScheme = {
  accent: palette.celadon,
  background: palette.iron975,
  border: palette.iron800,
  surface: palette.iron950,
  textPrimary: palette.mint100,
  textSecondary: palette.iron400,
};

export const spacing = {
  xs: 4, 
  sm: 8, 
  md: 16, 
  lg: 24, 
  xl: 32,
} as const;

export const typography = {

} as const;
