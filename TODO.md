TODO:

- Change main font to a better, sans-serif font
- Handle non numeric chars in AmountInput (math symbols)
  - Simply remove?
- Format ResultDisplay to have a comma every 3 digits
- Add some way (button? Icon?) to set endYear to last year of data set
- Pull down partial data for 2026 to calculate an average to extend data set
- Make error messages more descriptive:
  - Show if year is outside of stored year range
  - Display warning for stored year range

**Future Plans**:
- Add a history display for 

DONE:
- Add basic react-native-gifted-charts display to results
- Make hook for handling light/dark modes and dynamic color palettes
- Pass error state props into YearInput and Amount inputs
- Make results show an message besides NaN when there is something causing an error
- Unify width of input containers
- Move hasError state for both YearInput and Amount input into App
- Unify width of Icons in input containers
- Figure out flexbox for properly aligning year inputs with amount input
