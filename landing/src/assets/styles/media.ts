export const mediaQuery = (maxWidth: number) => `
  @media (max-width: ${maxWidth}px)
`;

const media = {
  xlarge: mediaQuery(1220),
  large: mediaQuery(1068),
  mobile: mediaQuery(550),
  custom: mediaQuery,
};

export default media;
