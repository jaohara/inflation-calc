import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { useFonts } from 'expo-font';
import { IBMPlexMono_500Medium } from '@expo-google-fonts/ibm-plex-mono';
import { Literata_400Regular, Literata_600SemiBold } from '@expo-google-fonts/literata';

import HeaderText from '@/components/HeaderText';
import BodyText from '@/components/BodyText';

// TODO: Change color import when light/dark theming is working
import {
  lightColors,
  spacing,
} from '@/src/theme/theme';

export default function App() {
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
    <View style={styles.container}>
      <HeaderText>
        Inflation Calculator
      </HeaderText>
      <BodyText>
        This is a simple application designed to convert monetary values from the past into present-day values.
      </BodyText>

      <BodyText>
        It is meant to be used when reading or watching something, either fiction or non-fiction,
        that takes place in the last hundred years and references an amount
        of money. Use this to quickly get a reference of what that value would
        amount to today.
      </BodyText>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // TODO: Change when light/dark mode is available
    backgroundColor: lightColors.background,
    // alignItems: 'center',
    // justifyContent: 'center',
    padding: spacing.md,
    paddingTop: spacing.xl,
  },
});
