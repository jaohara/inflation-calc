// component for a year selector for an input year

/*
  - takes year, onChange, min, max
  - used for start and end years
*/

import { useState } from 'react';

import {
  StyleSheet,
  TextInput,
} from 'react-native';

import {
  common,
  spacing,
  typography,
  lightColors
} from "@/src/theme/theme.ts";

type Props = {
  hasError: boolean;
  setHasError: (hasError: boolean) => void;
  value: string;
  setValue: (value: string) => void;
  min: number;
  max: number;
};

// Basic text input for now. Eventually I want to make this some sort of custom, cross-platform 
//  UI elemennt.

export default function YearSelector({
  hasError,
  setHasError,
  value,
  setValue,
  // TODO: These will come into play with a custom UI implementation for a year picker
  min,
  max,
}: Props) {
  const [ isFocused, setIsFocused ] = useState(false);
  // const [ hasError, setHasError ] = useState(false);
  const [ previousValue, setPreviousValue ] = useState(value);

  // TODO: Rework this - current implementation (text inputs) should have validation at App level,
  //  and only do the conversion when everything is valid.
  const parseNewYear = (newYear: string) => {
    setValue(newYear);

    let year = parseInt(newYear);

    if (isNaN(year)) {
      return;
    }
  }

  const isValidYear = (newYear: string) => {
    if (newYear.length !== 4) return false;

    const year = parseInt(newYear);

    if (isNaN(year)) return false;

    if (year < min) return false;
    if (year > max) return false;

    return true;
  };

  // TODO: These will come into play with a custom UI implementation for a year picker

  const handleFocus = () => {
    setHasError(false);
    setIsFocused(true);
    setPreviousValue(value);
    setValue("");
  }

  const handleBlur = () => {
    setIsFocused(false);

    if (value.length === 0) {
      setValue(previousValue);
    }
    else if (!isValidYear(value)){
      setHasError(true);
      // setValue(previousValue);
    }

  };

  return (
    <TextInput 
      style={[
        styles.yearInput,
        isFocused && styles.yearInputFocused,
        hasError && styles.yearInputError,
      ]}
      keyboardType="numeric"
      onFocus={() => handleFocus()}
      onBlur={() => handleBlur()}
      onChangeText={(text:string) => parseNewYear(text)}
      value={value}
    />
  );
}

const styles = StyleSheet.create({
  yearInput: {
    // TODO: Make the common input stylings between this and AmountInput some sort of mixin
    borderColor: lightColors.border,
    borderRadius: common.borderRadius,
    borderWidth: common.borderWidth,
    backgroundColor: lightColors.surface,
    color: lightColors.textPrimary,
    ...typography.input,
    ...common.inputPadding,
    width: '40%',
    textAlign: 'center',
  },
  yearInputFocused: {
    borderColor: lightColors.accent,
  },
  yearInputError: {
    borderColor: lightColors.errorBorder,
  }
});
