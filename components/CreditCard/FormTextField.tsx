import React, {useEffect} from 'react';
import {useFormContext, Controller, RegisterOptions} from 'react-hook-form';
import {TextInput} from 'react-native';
import TextField from './TextField';

type Props = React.ComponentProps<typeof TextField> & {
  name: string;
  rules: RegisterOptions;
  validationLength?: number;
  formatter?: (oldvalue: string, newValue: string) => string;
  onValid?: () => void;
};

// const FormTextField: React.FC<Props> = (props) => {
const FormTextField = React.forwardRef<TextInput, Props>((props, ref) => {
  const {
    name,
    rules,
    validationLength = 1,
    formatter,
    onBlur,
    onValid,
    ...restOfProps
  } = props;
  const {
    control,
    formState: {errors},
    trigger,
    watch,
  } = useFormContext();
  const value = watch(name);

  useEffect(() => {
    async function validate() {
      const isValid = await trigger(name);
      if (isValid) onValid?.();
    }
    if (value.length >= validationLength) {
      validate();
    }
  }, [value, name, validationLength, trigger]);

  //   useEffect(() => {
  //     console.log('REF: ', ref);
  //   }, []);

  return (
    <Controller
      control={control}
      render={({field: {onChange, onBlur, value}}) => (
        <TextField
          // passing everything down to TextField
          // to be able to support all TextInput props
          {...restOfProps}
          // ref={ref}
          errorText={errors[name]?.message}
          //   errorText="Field required"
          onBlur={() => {
            onBlur();
          }}
          //   onChangeText={(value) => onChange(value)}
          onChangeText={(text) => {
            const formatted = formatter ? formatter(value, text) : text;
            onChange(formatted);
          }}
          value={value}
        />
      )}
      name={name}
      rules={rules}
    />
  );
});
export default FormTextField;
