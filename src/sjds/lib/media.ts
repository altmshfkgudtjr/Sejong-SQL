/** 미디어쿼리 Value */
export const mediaValue = {
  xsmall: 300,
  small: 360,
  medium: 768,
  large: 1240,
  xlarge: 1600,
};

/** 미디어쿼리 프리셋 */
export const mediaQuery = {
  small: `@media (min-width: ${mediaValue.small}px)`,
  medium: `@media (min-width: ${mediaValue.medium}px)`,
  large: `@media (min-width: ${mediaValue.large}px)`,
  xlarge: `@media (min-width: ${mediaValue.xlarge}px)`,
  custom: value => `@media (min-width: ${value}px)`,
};
