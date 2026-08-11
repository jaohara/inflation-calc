import { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';

import { FontAwesome6 } from '@react-native-vector-icons/fontawesome6';
import { SPINNER_SIZE } from '@/src/constants';
import { useTheme } from '@/src/theme/ThemeContext';

export default function LoadingSpinner() {
  const { colors } = useTheme();
  const spin = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.timing(spin, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );

    loop.start();

    return () => loop.stop();
  }, [spin]);

  const rotate = spin.interpolate({
    inputRange: [0,1],
    outputRange: ['0deg', '360deg'],
  });

  const opacity = spin.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, .4, 1],
  });

  return (
    <Animated.View style={{ opacity, transform: [{ rotate }]}}>
      <FontAwesome6 
        name="spinner" 
        iconStyle="solid"
        size={SPINNER_SIZE}
        color={colors.accent} />
    </Animated.View>
  )
}