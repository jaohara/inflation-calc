import { useState } from 'react';

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { useFonts } from 'expo-font';
import { IBMPlexMono_500Medium } from '@expo-google-fonts/ibm-plex-mono';
import { Literata_400Regular, Literata_600SemiBold } from '@expo-google-fonts/literata';

import cpiData from '@/data/cpi.json';

import HeaderText from '@/src/components/HeaderText';
import AppIcon from './components/AppIcon';
import BodyText from '@/src/components/BodyText';
import YearSelector from './components/YearSelector';
import AmountInput from './components/AmountInput';

// TODO: Change color import when light/dark theming is working
import {
  common,
  lightColors,
  spacing,
  typography,
} from '@/src/theme/theme';

import {
  // MIN_INFLATION_YEAR,
  // MAX_INFLATION_YEAR,
} from '@/src/constants';
import ResultDisplay from './components/ResultDisplay';

// Should this be set here, be random, or use the last remembered one?
const DEFAULT_YEAR = 1962;

const YEAR_RANGE = [...Object.keys(cpiData.values)];
const MIN_INFLATION_YEAR = parseInt(YEAR_RANGE[0]);
const MAX_INFLATION_YEAR = parseInt(YEAR_RANGE[YEAR_RANGE.length - 1]);


export default function App() {
  const [ startYear, setStartYear ] = useState(String(DEFAULT_YEAR));
  const [ endYear, setEndYear ] = useState(String(MAX_INFLATION_YEAR));
  const [ amount, setAmount ] = useState("1.00");

  const [ loaded, error ] = useFonts({
    IBMPlexMono_500Medium,
    Literata_400Regular,
    Literata_600SemiBold,
  });

  /* 
    Continue here - look into that SplashScreen.preventAutoHideAsync()
      function to prevent the flash of white between the splashscreen
      disappearing and UI appearing.
  */

  if (!loaded && !error) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <HeaderText>
          Inflation Calculator
        </HeaderText>

        <View style={[styles.inputContainer, styles.amountInputContainer]}>
          <AppIcon name="dollar-sign" />
          <AmountInput 
            value={amount}
            setValue={setAmount}
          />
        </View>

        <View style={[styles.inputContainer, styles.yearInputsContainer]}>
          <AppIcon name="calendar-days" />

          <YearSelector
            min={MIN_INFLATION_YEAR}
            max={MAX_INFLATION_YEAR}
            value={startYear}
            setValue={setStartYear}
          />
          {/* TODO: Use arrow icon instead of "to:" */}
          {/* <Text style={styles.yearInputsContainerLabel}>to:</Text> */}
          <AppIcon name="arrow-right" />
          <YearSelector
            min={MIN_INFLATION_YEAR}
            max={MAX_INFLATION_YEAR}
            value={endYear}
            setValue={setEndYear}
          />
        </View>

        <View>
          <ResultDisplay
            amount={amount}
            startYear={startYear}
            endYear={endYear}
          />
        </View>
        <StatusBar style="auto" />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // TODO: Change when light/dark mode is available
    backgroundColor: lightColors.background,
    // alignItems: 'center',
    // justifyContent: 'center',
    padding: common.padding,
    // paddingTop: spacing.xl,
  },
  inputContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
    marginTop: spacing.sm,
  },
  amountInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  yearInputsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  yearInputsContainerLabel: {
    ...typography.label,
    color: lightColors.accent,
  }
});
