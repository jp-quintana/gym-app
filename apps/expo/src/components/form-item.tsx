import { Checkbox, Input, Text } from '@/components/ui';
import { IInput } from '@/types';
import { Control, Controller, UseFormClearErrors } from 'react-hook-form';
import { View } from 'react-native';

export interface IFormItem {
  input: IInput;
  control: Control<any>;
  secureTextEntry?: boolean;
  customLabel?: React.JSX.Element;
  clearErrors: UseFormClearErrors<any>;
  handleSecureInputChange?: (key: string) => void;
}

export const FormItem = ({
  input,
  control,
  secureTextEntry,
  customLabel,
  clearErrors,
  handleSecureInputChange,
}: IFormItem) => {
  if (input.type === 'checkbox') {
    return (
      <View className="flex-row gap-3 items-center">
        <Controller
          control={control}
          name={input.name}
          render={({ field: { onChange, value } }) => (
            <Checkbox
              checked={value}
              onCheckedChange={(val) => {
                clearErrors('server');
                onChange(val);
              }}
            />
          )}
        />
        {customLabel}
      </View>
    );
  }

  return (
    <View>
      {customLabel ? (
        customLabel
      ) : (
        <Text className="pb-0.5">{input.label}</Text>
      )}
      <Controller
        control={control}
        name={input.name}
        render={({ field: { onChange, value } }) => (
          <Input
            {...input}
            value={value}
            onChangeText={(val) => {
              clearErrors('server');
              onChange(val);
            }}
            secureTextEntry={secureTextEntry}
          />
        )}
      />
    </View>
  );
};
