export const mediaQuery = (maxWidth: number) => `
  @media (max-width: ${maxWidth}px)
`;

const media = {
  xxlarge: mediaQuery(1440),
  xlarge: mediaQuery(1220),
  large: mediaQuery(1068),
  medium: mediaQuery(550),
  small: mediaQuery(768),
  xsmall: mediaQuery(375),
  custom: mediaQuery,
};

export default media;
