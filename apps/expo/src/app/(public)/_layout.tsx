import { useAuthStore } from '@/stores';
import { Redirect, Stack } from 'expo-router';

export default function PublicLayout() {
  const { accessToken } = useAuthStore((state) => state);

  if (accessToken) return <Redirect href="/dashboard" />;

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
    </Stack>
  );
}
