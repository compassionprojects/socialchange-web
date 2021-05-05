import { CountryRegionData } from 'react-country-region-selector';

/**
 * Maps country short code to full namee
 * For example:
 * {
 *    IN: 'India', ...
 * }
 */

export const mapCountry = CountryRegionData.reduce(
  (init, c) => ({ ...init, [c[1]]: c[0] }),
  {}
);
