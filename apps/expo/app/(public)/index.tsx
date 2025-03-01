import { Button, Text } from '@/components/ui';
import { View } from 'react-native';
// import { Image } from 'expo-image';

// screen for google logo, banner & google log in
export default function Index() {
  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text>Replify</Text>
      {/* <Image /> */}
      <View style={{ marginTop: 'auto', gap: 10 }}>
        <Button>
          <Text>Google login</Text>
        </Button>
        <Button>
          <Text>Login</Text>
        </Button>
      </View>
    </View>
  );
}
