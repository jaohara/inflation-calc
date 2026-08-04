// Component to display the formatted result.

/*
  - Takes a number (or null while loading)
  - displays loading component while parsing?
*/

import { 
  View, 
  Text, 
  StyleSheet 
} from 'react-native';

import { 
  common,
  lightColors,
  spacing, 
  typography,
} from '@/src/theme/theme.ts';

import { convert } from '@/lib/inflation';

type Props = {
  amount: string,
  amountHasError: boolean,
  startYear: string,
  startYearHasError: boolean,
  endYear: string,
  endYearHasError: boolean,
};

export default function ResultDisplay({ 
  amount,
  amountHasError,
  startYear,
  startYearHasError,
  endYear,
  endYearHasError,
}: Props) {
  const result = (() => {
    // TODO: Use the ratio of inflation to compute the value between the two years 
    const convertedValue = convert(amount, startYear, endYear);

    return String(convertedValue.toFixed(2));
  })();

  const hasError = amountHasError || startYearHasError || endYearHasError;

  const resultBody = (() => {
    if (!hasError) {
      return (<>${result}</>);
    }
  })()

  return (
    <View style={styles.container}>
      <Text style={styles.resultText}>
        {resultBody}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: lightColors.surface,
    borderRadius: common.borderRadius,
    borderWidth: common.borderWidth,
    flexDirection: 'row',
    justifyContent: 'center',
    padding: spacing.lg,
  },
  resultText: {
    textAlign: 'center',
    color: lightColors.textPrimary,
    ...typography.result,
  },
});
