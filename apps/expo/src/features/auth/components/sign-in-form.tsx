import { View } from 'react-native';
import { SIGN_IN_INPUTS } from '../utils/constants';
import { signInSchema } from '../utils/schemas';
import { useSignIn } from '../hooks';
import { FormItem } from './form-item';
import { Button, Text } from '@/components/ui';

export const SignInForm = () => {
  const {
    control,
    secureFormState,
    isFormValid,
    error,
    handleFormSubmit,
    handleSecureInputChange,
  } = useSignIn({ inputs: SIGN_IN_INPUTS, schema: signInSchema });

  return (
    <View>
      <View className="gap-3">
        {SIGN_IN_INPUTS.map((input) => (
          <FormItem
            key={input.name}
            input={input}
            control={control}
            secureTextEntry={secureFormState[input.name]}
            handleSecureInputChange={handleSecureInputChange}
          />
        ))}
      </View>
      <Text className="mt-3 text-center text-cyan-600">Forgot Password?</Text>
      <View className="mt-6 gap-3">
        {error && (
          <Text className="text-red-600 px-1 font-bold">
            {error.message?.toString()}
          </Text>
        )}

        <Button onPress={handleFormSubmit} disabled={!isFormValid}>
          <Text>Sign in</Text>
        </Button>
      </View>
    </View>
  );
};
