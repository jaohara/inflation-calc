import { FontAwesome6 } from '@react-native-vector-icons/fontawesome6';
import { ICON_SIZE } from '@/src/constants';
import { useTheme } from '@/src/theme/ThemeContext';

type Props = {
  name: 'calendar-days' | 'dollar-sign' | 'arrow-right';
};

export default function AppIcon({ name }: Props) {
  const { colors } = useTheme();

  return (
    <FontAwesome6
      name={name}
      iconStyle="solid"
      size={ICON_SIZE}
      color={colors.accent}
    />
  );
}

