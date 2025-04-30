export type TemplateColors = {
  primary100Rgb: string;
  primary100: string;
  primary200: string;
  primary300: string;
  primary400: string;
  primary500: string;
  primary600: string;
  primary700: string;
  primary800: string;
  primary900: string;
  primary1000: string;
  secondary100: string;
  secondary200: string;
  secondary300: string;
  secondary400: string;
  secondary500: string;
  secondary600: string;
  secondary700: string;
  secondary800: string;
  secondary900: string;
  secondary1000: string;
  primary: string;
  primaryHover: string;
  primaryLight: string;
  primaryLightInRgb: string;
  primaryDark: string;
  primaryWarning: string;
  secondaryWarning: string;
  primaryClose: string;
  secondaryBackground:string;
  secondaryBorders:string;
  secondaryHover: string;
  goldLight: string;
  goldDark: string;
  primaryGs: string;
};

const colors: TemplateColors = require('../../colors.json');

export default {...colors};

