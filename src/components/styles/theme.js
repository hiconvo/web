const toRems = arr => arr.map(px => (px / 10).toFixed(1).toString() + "rem");
const toPx = arr => arr.map(px => px + "px");

const space = toRems([0, 4, 8, 16, 32, 64, 128, 256, 512]);
const fontSizes = toRems([12, 14, 16, 18, 24, 30, 36, 48, 64]);
const lineHeights = {
  normal: 1.25,
  title: 1.5,
  paragraph: 1.75
};
const breakpoints = toPx([768, 1280]);
const media = {
  phone: `@media screen and (max-width: ${breakpoints[0]})`,
  tablet: `@media screen and (max-width: ${breakpoints[1]})`
};

const sizeScale = toRems([18, 24, 30, 36, 48, 60, 72, 96, 128]);

const opacities = [0.1, 0.35, 0.5, 0.65, 0.8];

const transparent = "transparent";

const trueBlack = "#000000";
const bodytext = "#24292e";
const black = "#1b1f23";
const darkGray = "#2f363d";
const gray = "#646d75";
const mediumGray = "#959da5";
const lightGray = "#d1d5da";
const veryLightGray = "#f3f3f3";
const snow = "#f6f8fa";
const white = "#fafafa";
const trueWhite = "#ffffff";

const blacks = [
  `rgba(0, 0, 0, ${opacities[0]})`,
  `rgba(0, 0, 0, ${opacities[1]})`,
  `rgba(0, 0, 0, ${opacities[2]})`,
  `rgba(0, 0, 0, ${opacities[3]})`,
  `rgba(0, 0, 0, ${opacities[4]})`
];

const whites = [
  `rgba(255, 255, 255, ${opacities[0]})`,
  `rgba(255, 255, 255, ${opacities[1]})`,
  `rgba(255, 255, 255, ${opacities[2]})`,
  `rgba(255, 255, 255, ${opacities[3]})`,
  `rgba(255, 255, 255, ${opacities[4]})`
];

const primary100 = "#e3faf6";
const primary300 = "#45dfc8";
const primary500 = "#00D4B5";
const primary700 = "#00bfa2";
const primary900 = "#006556";

const success100 = "#8ae87a";
const success300 = "#20d400";
const success500 = "#19a800";
const success700 = "#158c00";
const success900 = "#0f6500";

const warning100 = "#e9a580";
const warning300 = "#e1814e";
const warning500 = "#d44a00";
const warning700 = "#bf4200";
const warning900 = "#a73a00";

const error100 = "#fbeaec";
const error300 = "#e5697c";
const error500 = "#d40020";
const error700 = "#bf001c";
const error900 = "#a80019";

const lightyellow = "lightyellow";

const socialMediaColors = {
  facebook: "#3B5998",
  facebookHover: "#22407F",
  twitter: "#38A1F3",
  twitterHover: "#1F88DA"
};

const SYSTEM_FONTS =
  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"';

const fonts = {
  sans: `"Inter", ${SYSTEM_FONTS}`,
  serif: `Georgia, Cambria, "Times New Roman", Times, serif`,
  mono: "monospace"
};

const fontWeights = {
  regular: 400,
  semiBold: 500,
  bold: 700,
  extraBold: 800
};

const letterSpacings = {
  normal: "normal",
  spaced: "0.05rem",
  crazy: "0.4rem"
};

const radii = {
  small: space[1],
  normal: space[3],
  special: space[4],
  round: "1000em"
};

const shadows = {
  normal: `${space[0]} ${space[1]} ${space[2]} ${space[0]} ${blacks[0]}`,
  heavy: `${space[0]} ${space[2]} ${space[3]} ${space[0]} ${blacks[0]}`,
  spread: `rgba(0, 0, 0, 0.1) 0px 0px 24px -2px`
};

const animations = {
  fast: "200ms",
  brisk: "500ms",
  lazy: "1000ms"
};

export default {
  // ----- MAIN THEME -----

  // Base space sizes, font sizes (with respective line-heights), and @media breakpoints
  space,
  fontSizes,
  lineHeights,
  breakpoints,
  media,

  // Common sizes, often used in images and icons
  widths: sizeScale,
  maxWidths: sizeScale,
  minWidths: sizeScale,
  heights: sizeScale,
  maxHeights: sizeScale,
  minHeights: sizeScale,

  colors: {
    bodytext,
    // Primary color (and tints/shades)
    primary: primary500,
    primary100,
    primary300,
    primary500,
    primary700,
    primary900,

    // Success color (and tints/shades)
    success: success500,
    success100,
    success300,
    success500,
    success700,
    success900,

    // Warning color (and tints/shades)
    warning: warning500,
    warning100,
    warning300,
    warning500,
    warning700,
    warning900,

    // Error color (and tints/shades)
    error: error500,
    error100,
    error300,
    error500,
    error700,
    error900,

    lightyellow,

    // Various gradients
    gradients: {
      primary: `linear-gradient(to bottom right, ${primary500}, #8A96FD)`,
      toTop: `linear-gradient(to top, ${trueWhite}, transparent)`,
      toBottom: `linear-gradient(to bottom, ${trueWhite}, transparent)`
    },

    // Grays
    trueBlack,
    black,
    darkGray,
    gray,
    mediumGray,
    lightGray,
    veryLightGray,
    snow,
    white,
    trueWhite,

    // Grays with various opacities
    blacks,
    whites,

    // Transparent helper color
    transparent,

    // Social media
    ...socialMediaColors
  },

  // Opacities (0 - 1)
  opacities,

  // Typography
  fonts,
  fontWeights,
  letterSpacings,

  // Borders
  borders: {
    darkGray: `1px solid ${darkGray}`,
    gray: `1px solid ${gray}`,
    lightGray: `1px solid ${lightGray}`,
    veryLightGray: `1px solid ${veryLightGray}`,
    snow: `1px solid ${snow}`,
    brandColor: `1px solid ${primary500}`,
    error: `1px solid ${error900}`
  },

  // Radii
  radii,

  // Drop shadows
  shadows,

  // Animations
  animations,
  // Various z-indexes
  zIndicies: {
    baseline: 0,
    messages: 100,
    header: 200,
    tooltip: 800,
    notifications: 900,
    dialog: 1000
  },

  // ----- VARIANTS -----
  // All of our color variants (links and their hovers)
  colorStyles: {
    primary: { color: primary500, "&:hover": { color: primary700 } },
    success: { color: success500, "&:hover": { color: success700 } },
    warning: { color: warning500, "&:hover": { color: warning700 } },
    error: { color: error500, "&:hover": { color: error700 } },
    white: { color: white, "&:hover": { color: lightGray } },
    snow: { color: snow, "&:hover": { color: lightGray } },
    lightGray: { color: lightGray, "&:hover": { color: mediumGray } },
    mediumGray: { color: mediumGray, "&:hover": { color: darkGray } },
    darkGray: { color: darkGray, "&:hover": { color: black } },
    black: { color: black, "&:hover": { color: trueBlack } }
  },

  // All of our text variants
  textStyles: {
    h1: { fontSize: fontSizes[6], [media.desktop]: { fontSize: fontSizes[7] } },
    h1Static: { fontSize: fontSizes[7] },
    h2: { fontSize: fontSizes[5], [media.desktop]: { fontSize: fontSizes[6] } },
    h2Static: { fontSize: fontSizes[6] },
    h3: { fontSize: fontSizes[4], [media.desktop]: { fontSize: fontSizes[5] } },
    h3Static: { fontSize: fontSizes[5] },
    h4: { fontSize: fontSizes[3], [media.desktop]: { fontSize: fontSizes[4] } },
    h4Static: { fontSize: fontSizes[4] },
    h5: { fontSize: fontSizes[2], [media.desktop]: { fontSize: fontSizes[3] } },
    h5Static: { fontSize: fontSizes[3] },
    h6: { fontSize: fontSizes[1], [media.desktop]: { fontSize: fontSizes[2] } },
    h6Static: { fontSize: fontSizes[2] }
  },

  // All of our button variants
  buttons: {
    primary: {
      color: white,
      backgroundColor: primary700,
      borderRadius: radii.special,
      "&:hover": {
        backgroundColor: primary900,
        boxShadow: shadows.normal
      }
    },
    secondary: {
      color: black,
      backgroundColor: veryLightGray,
      borderRadius: radii.special,
      "&:hover": {
        backgroundColor: lightGray
      }
    },
    tertiary: {
      color: black,
      fontWeight: "inherit",
      fontSize: "inherit",
      letterSpacing: "inherit",
      transition: `color ease ${animations.fast}`,
      backgroundColor: transparent,
      borderRadius: radii.normal,
      "&:hover": {
        color: mediumGray
      }
    },
    brand: {
      color: primary700,
      fontWeight: fontWeights.regular,
      backgroundColor: "inherit",
      borderRadius: radii.normal,
      "&:hover": {
        color: primary900
      }
    },
    white: {
      color: bodytext,
      boxShadow: shadows.normal,
      backgroundColor: trueWhite,
      borderRadius: radii.special,
      "&:hover": {
        backgroundColor: lightGray
      }
    }
  },

  // Layout
  pageMaxWidth: "144rem",
  pageMaxWidthPx: "1440px",
  headerHeight: "12rem",
  footerHeight: "6rem",
  sidebarWidth: "28rem",
  sidebarChromeHeight: "5rem"
};
