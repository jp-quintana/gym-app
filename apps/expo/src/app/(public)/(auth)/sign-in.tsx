import { OrSeparator } from '@/components';
import { SignInForm, SocialAuthButtons } from '@/features/auth/components';
import { View } from 'react-native';

export default function SignInScreen() {
  return (
    <View className="flex-1 p-5">
      <SignInForm />
      <OrSeparator className="py-5" />
      <SocialAuthButtons
        options={['google']}
        iconFill="white"
        isSignIn={true}
      />
    </View>
  );
}
