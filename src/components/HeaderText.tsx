import { Text, StyleSheet} from "react-native";
import { PropsWithChildren, useMemo } from 'react';

import { typography, spacing } from "@/src/theme/theme";
import { useTheme } from "@/src/theme/ThemeContext";

export default function HeaderText({
  children
}: PropsWithChildren) {
  const { colors } = useTheme();

  const styles = useMemo(() => StyleSheet.create({
    header: {
      ...typography.header,
      color: colors.accent,
      marginTop: spacing.lg,
    }
  }), [colors]);

  return (
    <Text style={styles.header}>
      {children}
    </Text>
  )
};
