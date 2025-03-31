import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function DashboardLayout() {
  return (
    <SafeAreaView className="flex-1">
      <Stack>
        <Stack.Screen name="dashboard" options={{ headerTitle: 'Dashboard' }} />
      </Stack>
    </SafeAreaView>
  );
}
