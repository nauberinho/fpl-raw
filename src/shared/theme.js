const mqSizes = {
  mobileS: "320px",
  mobileM: "375px",
  mobileL: "425px",
  tablet: "768px",
  laptop: "1024px",
  laptopL: "1440px",
  desktop: "2560px"
};

const mediaQueries = {
  mobileS: limit => `(${limit}-width: ${mqSizes.mobileS})`,
  mobileM: limit => `(${limit}-width: ${mqSizes.mobileM})`,
  mobileL: limit => `(${limit}-width: ${mqSizes.mobileL})`,
  tablet: limit => `(${limit}-width: ${mqSizes.tablet})`,
  laptop: limit => `(${limit}-width: ${mqSizes.laptop})`,
  laptopL: limit => `(${limit}-width: ${mqSizes.laptopL})`,
  desktop: limit => `(${limit}-width: ${mqSizes.desktop})`,
  desktopL: limit => `(${limit}-width: ${mqSizes.desktop})`
};

const theme = {
  colors: {
    yellow: {
      main: "#D5B507"
    },
    black: { main: "#4E4E4E" },
    red: {
      main: "#C70039"
    },
    purple: {
      main: "#9851D4"
    },
    blue: {
      main: "#5182D4"
    },
    green: {
      main: "#10D775"
    },
    orange: {
      main: "orange"
    }
  }
};

export { mediaQueries, theme };
