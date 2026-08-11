// Component to display the formatted result.
import { useMemo } from 'react';

import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';

import { 
  LineChart 
} from 'react-native-gifted-charts';

import {
  common,
  spacing,
  typography,
} from '@/src/theme/theme.ts';
import { useTheme } from '@/src/theme/ThemeContext';

import { 
  buildLineChartData,
  convert,
} from '@/lib/inflation';

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
  const { colors } = useTheme();

  const containerXPadding = spacing.xs;
  const chartXPaddingOffset = containerXPadding * 2;
  const parentXPadding = common.padding;
  const chartYAxisLabelsWidth = 28;
  const { width } = useWindowDimensions();
  // width - (chartXPaddingOffset * 2) - (parentXPadding * 2) - chartYAxisLabelsWidth; 
  const chartWidth = 
    width - (containerXPadding * 2) - (parentXPadding * 2) - chartYAxisLabelsWidth; 

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

  const lineChartData = !hasError ? buildLineChartData(amount, startYear, endYear) : null;

  const styles = useMemo(() => StyleSheet.create({
    container: {
      alignItems: 'center',
      backgroundColor: colors.surface,
      borderRadius: common.borderRadius,
      borderWidth: common.borderWidth,
      borderColor: colors.border,
      marginTop: common.containerMargin,
      minHeight: spacing.xl,
      flexDirection: 'column',
      justifyContent: 'center',
      padding: spacing.sm,
      paddingLeft: containerXPadding,
      paddingRight: containerXPadding,
    },
    errorContainer: {
      borderColor: colors.errorBorder,
      backgroundColor: colors.errorSurface,
    },
    infoContainer: {
      borderColor: colors.infoBorder,
      backgroundColor: colors.infoSurface,
    },
  }), [colors]);

  return (
    <>
      <HeaderText>Result</HeaderText>
      <View style={[
        styles.container,
        hasError && styles.errorContainer,
        isInfo && styles.infoContainer,
      ]}>
        {
          resultIsLoading ? (<LoadingSpinner />) :
          (
            // TODO: Make this whole display prettier
            <>
            <ResultText
              hasError={hasError}
              isInfo={isInfo}
              message={resultMessage}
            />
            {
              lineChartData !== null && (
                // TODO: Clean up this and work on Y Axis labeling (truncate values like 1200 -> 1.2k)
                <LineChart
                  areaChart
                  color={colors.accent}
                  startFillColor={colors.accent}
                  endFillColor={colors.background}
                  startOpacity={0.3}
                  endOpacity={0}
                  curved
                  dataPointsRadius={3}
                  dataPointsColor={colors.accent}
                  data={lineChartData}
                  hideOrigin
                  spacing={28}
                  initialSpacing={6}
                  endSpacing={0}
                  noOfSections={5}
                  rulesColor={colors.border}
                  xAxisColor={colors.border}
                  yAxisColor={colors.border}
                  yAxisLabelWidth={24}
                  yAxisTextStyle={{ 
                    fontFamily: 'IBMPlexMono_500Medium', 
                    fontSize: 8, 
                    color: colors.textSecondary 
                  }}
                  xAxisLabelTextStyle={{ 
                    fontSize: 8, 
                    color: colors.textSecondary 
                  }}
                  rotateLabel
                  width={chartWidth}
                />
              )
            }
            </>
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
  const { colors } = useTheme();

  const styles = useMemo(() => StyleSheet.create({
    resultText: {
      textAlign: 'center',
      color: colors.textPrimary,
      ...typography.result,
      padding: spacing.sm,
    },
    errorText: {
      ...typography.body,
    },
    infoText: {
      ...typography.body,
    },
  }), [colors]);

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
