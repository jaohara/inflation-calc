// Component stub for the input that handles monetary values

/*
  - Takes in value: string and onChange as props
  - sets keyboardType to "numeric"
  - uses raw string for value that is parsed in lib/inflation.ts
*/

import { useMemo, useState } from 'react';

import {
  StyleSheet,
  TextInput,
} from 'react-native';

import {
  common,
  spacing,
  typography,
} from "@/src/theme/theme.ts";
import { useTheme } from "@/src/theme/ThemeContext";

type Props = {
  hasError: boolean;
  setHasError: (hasError: boolean) => void;
  value: string;
  setValue: (value: string) => void;
};

// Basic text input for now. Eventually I want to make this some sort of custom, cross-platform 
//  UI elemennt.

export default function AmountInput({
  hasError,
  setHasError,
  setValue,
  value,
}: Props) {
  const { colors } = useTheme();
  const [ isFocused, setIsFocused ] = useState(false);
  // const [ hasError, setHasError ] = useState(false);
  const [ previousValue, setPreviousValue ] = useState(value);

  // TODO: RETURN TO THIS
  const parseNewAmount = (newAmount: string) => {
    setValue(newAmount);

    let amount = parseInt(newAmount);

    if (isNaN(amount)) {
      return;
    }
  }

  const isValidAmount = (newAmount: string) => {
    const amount = parseInt(newAmount);

    if (isNaN(amount)) return false;
    if (amount < 0) return false;

    return true;
  };

  const handleFocus = () => {
    setHasError(false);
    setIsFocused(true);
    setPreviousValue(value);
    setValue("");
  }

  const handleBlur = () => {
    setIsFocused(false);

    if (!isValidAmount(value)){
      setHasError(true);
      // setValue(previousValue);
    }
  };

  const styles = useMemo(() => StyleSheet.create({
    amountInput: {
      borderRadius: common.borderRadius,
      borderWidth: common.borderWidth,
      borderColor: colors.border,
      backgroundColor: colors.surface,
      color: colors.textPrimary,
      ...typography.input,
      ...common.inputPadding,
      textAlign: 'center',
      width: '100%',
    },
    amountInputFocused: {
      borderColor: colors.accent,
    },
    amountInputError: {
      borderColor: colors.errorBorder,
    }
  }), [colors]);

  return (
    <TextInput
      style={[
        styles.amountInput,
        isFocused && styles.amountInputFocused,
        hasError && styles.amountInputError,
      ]}
      keyboardType="numeric"
      onFocus={() => handleFocus()}
      onBlur={() => handleBlur()}
      onChangeText={(text:string) => parseNewAmount(text)}
      value={value}
    />
  );
}
