import { Button, Text } from '@/components/ui';
import { Link, useRouter } from 'expo-router';
import { ImageBackground, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Index() {
  const router = useRouter();

  return (
    <ImageBackground
      source={{
        uri: 'https://images.unsplash.com/photo-1600638318819-46daef27aa8a?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      }}
      resizeMode="cover"
      className="flex-1"
    >
      <SafeAreaView className="p-5 flex-1 justify-center">
        <View className="mt-auto gap-3">
          <Button
            onPress={() => console.log('log in with google')}
            className="bg-white"
          >
            <Text className="text-black text-lg">
              Log in as "google account"
            </Text>
          </Button>
          <Button
            onPress={() => router.navigate('/sign-up')}
            className="bg-cyan-600 w-full"
          >
            <Text className="text text-lg">Sign up with email</Text>
          </Button>
          <Text className="text-white text-center">
            Already have an account?{' '}
            <Link href="/sign-in">
              <Text className="text-cyan-500">Log in</Text>
            </Link>
          </Text>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}
