import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { useFonts } from 'expo-font';
import { IBMPlexMono_500Medium } from '@expo-google-fonts/ibm-plex-mono';
import { Literata_400Regular, Literata_600SemiBold } from '@expo-google-fonts/literata';

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
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
