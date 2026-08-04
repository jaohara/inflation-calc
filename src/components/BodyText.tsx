import { Text, StyleSheet} from "react-native";
import { PropsWithChildren } from 'react';

// TODO: Change import when light/dark selection is available
import { lightColors, typography, spacing } from "@/src/theme/theme";

export default function BodyText({
  children
}: PropsWithChildren) {
  return (
    <Text style={styles.text}>
      {children}
    </Text>
  )
};

const styles = StyleSheet.create({
  text: {
    ...typography.body,
    // TODO: change when light/dark mode is available
    color: lightColors.textPrimary,
    marginTop: spacing.md,
  }
});
