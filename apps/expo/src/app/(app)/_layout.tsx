import { useAuthStore } from '@/stores';
import { Redirect, Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function DashboardLayout() {
  const { accessToken } = useAuthStore((state) => state);

  if (!accessToken) return <Redirect href="/" />;

  return (
    <SafeAreaView className="flex-1">
      <Stack>
        <Stack.Screen name="dashboard" options={{ headerTitle: 'Dashboard' }} />
      </Stack>
    </SafeAreaView>
  );
}
