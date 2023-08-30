export const controlProps = (item: string) => ({
  checked: item,
  onChange: () => console.log,
  value: item,
  name: 'size-radio-button-demo',
  inputProps: { 'aria-label': item },
})
