import { SignUpForm } from '@/features/auth/components';
import { View } from 'react-native';

export default function SignUpScreen() {
  return (
    <View className="flex-1 p-5">
      <SignUpForm />
    </View>
  );
}
