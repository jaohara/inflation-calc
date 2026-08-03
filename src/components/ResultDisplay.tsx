// Component to display the formatted result.

/*
  - Takes a number (or null while loading)
  - displays loading component while parsing?
*/

import { 
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

type Props = {
  value: number,
};

export default function ResultDisplay({ value }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.resultText}>
        {(value === null) ? 'Loading...' : value}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderRadius: common.borderRadius,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  resultText: {
    ...typography.result,
    borderRadius: common.borderRadius,
  },
});
