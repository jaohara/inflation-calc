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
  const parsedAmount = parseFloat(amount);
  // const parsedStartYear = parseInt(startYear);
  // const parsedEndYear = parseInt(endYear);

  const result = parsedAmount * (cpiValues[endYear] / cpiValues[startYear]);

  return result;
}

export function buildLineChartData (
  amount: string,
  startYear: string,
  endYear: string,
) {
  const parsedAmount = parseFloat(amount);
  const parsedStartYear = parseFloat(startYear);
  const parsedEndYear = parseFloat(endYear);

  const years = getYearArray(parsedStartYear, parsedEndYear);

  // TODO: how do I properly type this?
  const lineChartData = [{
    value: parsedAmount,
    label: startYear, 
  }];

  years.forEach((year) => {
    if (year === parsedStartYear) return;

    lineChartData.push({
      value: convert(amount, startYear, year.toString()),
      label: year.toString(),
    });
  });

  return lineChartData;
}

function getYearArray (
  startYear: number,
  endYear: number,
  maxPoints: number = 10,
): number[]{
  const yearDiff = endYear - startYear;

  // fewer years than maxPoints, just use every year
  if (yearDiff < maxPoints) {
    return Array.from({ length: yearDiff + 1}, (_, i) => startYear + i);
  }

  const gapCount = maxPoints - 1;
  const baseStep = Math.floor(yearDiff / gapCount);
  const remainder = yearDiff % gapCount;

  const years: number[] = [startYear];

  let current = startYear;

  for (let i = 0; i < gapCount; i++) {
    // Spread remainder gaps over first few year steps
    current += baseStep + (i < remainder ? 1 : 0);
    years.push(current);
  }

  return years;
}