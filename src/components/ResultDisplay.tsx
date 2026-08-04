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

type Props = {
  amount: string,
  startYear: string,
  endYear: string,
};

export default function ResultDisplay({ 
  amount,
  startYear,
  endYear,
}: Props) {
  const result = (() => {
    // TODO: Use the ratio of inflation to compute the value between the two years 
    const parsedValue = parseFloat(amount);

    return String((parsedValue * 10.0).toFixed(2));


    return parsedValue;
  })();

  return (
    <View style={styles.container}>
      <Text style={styles.resultText}>
        ${result}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: lightColors.surface,
    borderRadius: common.borderRadius,
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
