import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AuthLayout() {
  return (
    <SafeAreaView className="flex-1">
      <Stack>
        <Stack.Screen name="sign-in" options={{ headerTitle: 'Sign In' }} />
        <Stack.Screen name="sign-up" options={{ headerTitle: 'Sign Up' }} />
      </Stack>
    </SafeAreaView>
  );
}
