import { View } from 'react-native';
import { ONBOARDING_INPUTS } from '../utils/constants';
import { FormItem } from '@/components';
import { useOnboarding } from '../hooks';
import { onboardingSchema } from '../utils/schemas';
import { Button, Text } from '@/components/ui';

export const OnboardingForm = () => {
  const {
    // isPending,
    control,
    secureFormState,
    error,
    clearErrors,
    handleFormSubmit,
    handleSecureInputChange,
  } = useOnboarding({ inputs: ONBOARDING_INPUTS, schema: onboardingSchema });

  return (
    <View>
      <View className="gap-3">
        {ONBOARDING_INPUTS.map((input) => (
          <FormItem
            key={input.name}
            input={input}
            control={control}
            secureTextEntry={secureFormState[input.name]}
            // customLabel={
            //   input.type === 'checkbox' ? (
            //     <Text>
            //       I accept the{' '}
            //       <Text className="text-cyan-600">terms & conditions</Text> and
            //       the <Text className="text-cyan-600">privacy policy</Text>
            //     </Text>
            //   ) : undefined
            // }
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
          // disabled={isPending}
        >
          <View>
            <Text>Confirm</Text>
            {/* {isPending && <Spinner />} */}
          </View>
        </Button>
      </View>
    </View>
  );
};
