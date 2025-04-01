import { Checkbox, Input, Text } from '@/components/ui';
import { Input as TInput } from '@/types';
import { Control, Controller } from 'react-hook-form';
import { View } from 'react-native';

export interface IFormItem {
  input: TInput;
  control: Control<any>;
  secureTextEntry?: boolean;
  customLabel?: React.JSX.Element;
  handleSecureInputChange?: (key: string) => void;
}

export const FormItem = ({
  input,
  control,
  secureTextEntry,
  customLabel,
  handleSecureInputChange,
}: IFormItem) => {
  if (input.type === 'checkbox') {
    return (
      <View className="flex-row gap-3 items-center">
        <Controller
          control={control}
          name={input.name}
          render={({ field: { onChange, value } }) => (
            <Checkbox checked={value} onCheckedChange={onChange} />
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
            onChangeText={onChange}
            secureTextEntry={secureTextEntry}
          />
        )}
      />
    </View>
  );
};
