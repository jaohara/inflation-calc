// Component to display the formatted result.

/*
  - Takes a number (or null while loading)
  - displays loading component while parsing?
*/

import {
  ActivityIndicator,
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
import LoadingSpinner from './LoadingSpinner';
import HeaderText from './HeaderText';

type ResultDisplayProps = {
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
}: ResultDisplayProps) {
  const result = (() => {
    // TODO: Use the ratio of inflation to compute the value between the two years 
    const convertedValue = convert(amount, startYear, endYear);

    return String(convertedValue.toFixed(2));
  })();

  const hasError = amountHasError || startYearHasError || endYearHasError;
  // TODO: Configure this to display info messages
  const isInfo = false;

  const resultMessage = (() => {
    // if start year has error
    if (startYearHasError) 
      return "Start Year needs to be before end year and after 1913.";
    
    // if end year has error
    if (endYearHasError)
      return "End Year needs to be a valid year after 1913.";
    
    // if amount has error
    if (amountHasError)
      return "Amount must be a positive numeric value.";

    if (isNaN(parseFloat(result))) {
      return "Not a number";
    }
    
    return `$${result}`;
  })()

  // NOTE: I'm using this as a proxy for the result loading, as "NaN" is the result when one of the
  //  inputs is being used.
  const resultIsLoading = !hasError && isNaN(parseFloat(result));

  return (
    <>
      <HeaderText>Result:</HeaderText>
      <View style={[
        styles.container,
        hasError && styles.errorContainer,
        isInfo && styles.infoContainer,
      ]}>
        {/* <Text style={styles.resultText}>
          {resultBody}
        </Text> */}
        {
          resultIsLoading ? (<LoadingSpinner />) : 
          (
            <ResultText
              hasError={hasError}
              isInfo={isInfo} 
              message={resultMessage}
            />
          )
        }
      </View>
    </>
  )
}

type ResultTextProps = {
  hasError: boolean,
  isInfo: boolean,
  message: string,
}

function ResultText({
  hasError,
  isInfo,
  message,
}: ResultTextProps) {
  return (
    <Text 
      style={[
        styles.resultText,
        hasError && styles.errorText,
        isInfo && styles.infoText,
      ]}
    >
      {message}
    </Text>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: lightColors.surface,
    borderRadius: common.borderRadius,
    borderWidth: common.borderWidth,
    borderColor: lightColors.border,
    marginTop: common.containerMargin,
    minHeight: spacing.xl,
    flexDirection: 'row',
    justifyContent: 'center',
    padding: spacing.lg,
  },
  errorContainer: {
    borderColor: lightColors.errorBorder,
    backgroundColor: lightColors.errorSurface,
  },
  infoContainer: {
    borderColor: lightColors.infoBorder,
    backgroundColor: lightColors.infoSurface,
  },
  resultText: {
    textAlign: 'center',
    color: lightColors.textPrimary,
    ...typography.result,
  },
  errorText: {
    ...typography.body,
  },
  infoText: {
    ...typography.body,
  },
});
