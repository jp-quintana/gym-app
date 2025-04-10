import { View } from 'react-native';
import { SIGN_UP_INPUTS } from '../utils/constants';
import { signUpSchema } from '../utils/schemas';
import { useSignUp } from '../hooks';
import { FormItem } from './form-item';
import { Button, Text } from '@/components/ui';
import { Spinner } from '@/components';

export const SignUpForm = () => {
  const {
    isPending,
    control,
    secureFormState,
    error,
    clearErrors,
    handleFormSubmit,
    handleSecureInputChange,
  } = useSignUp({ inputs: SIGN_UP_INPUTS, schema: signUpSchema });

  return (
    <View>
      <View className="gap-3">
        {SIGN_UP_INPUTS.map((input) => (
          <FormItem
            key={input.name}
            input={input}
            control={control}
            secureTextEntry={secureFormState[input.name]}
            customLabel={
              input.type === 'checkbox' ? (
                <Text>
                  I accept the{' '}
                  <Text className="text-cyan-600">terms & conditions</Text> and
                  the <Text className="text-cyan-600">privacy policy</Text>
                </Text>
              ) : undefined
            }
            clearErrors={clearErrors}
            handleSecureInputChange={handleSecureInputChange}
          />
        ))}
      </View>
      <View className="mt-6 gap-3">
        {error && (
          <Text className="text-red-600 px-1 font-bold">
            {error.message?.toString()}
          </Text>
        )}
        <Button
          onPress={handleFormSubmit}
          className="flex-row"
          disabled={isPending}
        >
          <View>
            <Text>Sign Up</Text>
            {isPending && <Spinner />}
          </View>
        </Button>
      </View>
    </View>
  );
};
