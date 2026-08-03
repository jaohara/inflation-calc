import { Text, StyleSheet} from "react-native";
import { PropsWithChildren } from 'react';

// TODO: Change import when light/dark selection is available
import { lightColors, typography, spacing } from "@/src/theme/theme";

export default function HeaderText({
  children
}: PropsWithChildren) {
  return (
    <Text style={styles.header}>
      {children}
    </Text>
  )
};

const styles = StyleSheet.create({
  header: {
    ...typography.header,
    // TODO: change when light/dark mode is available
    color: lightColors.accent,
    marginTop: spacing.lg,
  }
});
