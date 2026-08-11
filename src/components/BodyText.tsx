import { Text, StyleSheet} from "react-native";
import { PropsWithChildren, useMemo } from 'react';

import { typography, spacing } from "@/src/theme/theme";
import { useTheme } from "@/src/theme/ThemeContext";

export default function BodyText({
  children
}: PropsWithChildren) {
  const { colors } = useTheme();

  const styles = useMemo(() => StyleSheet.create({
    text: {
      ...typography.body,
      color: colors.textPrimary,
      marginTop: spacing.md,
    }
  }), [colors]);

  return (
    <Text style={styles.text}>
      {children}
    </Text>
  )
};
