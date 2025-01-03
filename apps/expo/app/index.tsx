import { ThemeToggle } from '@/components';
import { Text } from '@/components/ui';
import { View } from 'react-native';

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <ThemeToggle />
      <Text>Edit app/index.tsx to edit this screen.</Text>
    </View>
  );
}
