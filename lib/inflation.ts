// this module will contain code for handling the inflation math
import rawCpi from '@/data/cpi.json';

const cpiValues: Record<string, number> = rawCpi.values;

/**
 * Uses CPI inflation data to convert an amount from one year to another 
 * @param amount initial dollar value as a string
 * @param startYear initial year as a string
 * @param endYear destination year as a string
 */
export function convert (
  amount: string,
  startYear: string,
  endYear: string,
) {
  // TODO: we're making a lot of assumptions about these conversions being possible, 
  //  but I guess with how bounded it is it'll be fine.
  const parsedAmount = parseInt(amount);
  // const parsedStartYear = parseInt(startYear);
  // const parsedEndYear = parseInt(endYear);

  const result = parsedAmount * (cpiValues[endYear] / cpiValues[startYear]);

  return result;
}
