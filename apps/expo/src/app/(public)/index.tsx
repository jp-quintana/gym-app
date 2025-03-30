import { Button, Text } from '@/components/ui';
import { SocialAuth } from '@/features/auth/components';
import { Link, useRouter } from 'expo-router';
import { useState } from 'react';
import { ImageBackground, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Index() {
  const router = useRouter();
  const [hasImageLoaded, setHasImageLoaded] = useState(false);

  return (
    <>
      {!hasImageLoaded && <View className="absolute inset-0 z-10 bg-black" />}
      <ImageBackground
        source={require('../../../assets/images/index-bg.jpg')}
        resizeMode="cover"
        className="flex-1"
        onLoad={() => setHasImageLoaded(true)}
      >
        <SafeAreaView className="p-5 flex-1 justify-center">
          <View className="mt-auto gap-3">
            <SocialAuth options={['google']} />
            <Button
              onPress={() => router.navigate('/sign-up')}
              className="bg-cyan-600"
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
    </>
  );
}
