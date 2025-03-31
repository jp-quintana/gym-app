import { Button, Text } from '@/components/ui';
import { cn } from '@/lib';
import { View } from 'react-native';
import GoogleIcon from '../../../../assets/svgs/google-icon.svg';

export type SocialAuthOptions = 'google';

export interface ISocialAuthButtons {
  isSignIn?: boolean;
  options: SocialAuthOptions[];
  buttonClassName?: string;
  textClassName?: string;
}

const socialAuthOptions = {
  google: {
    name: 'Google',
    icon: <GoogleIcon />,
    onPress: () => console.log('Auth with google'),
  },
};

export const SocialAuthButtons = ({
  isSignIn = false,
  options = ['google'],
  buttonClassName,
  textClassName,
}: ISocialAuthButtons) => {
  return (
    <View className="gap-3">
      {options.map((option) => (
        <Button
          key={socialAuthOptions[option].name}
          onPress={socialAuthOptions[option].onPress}
          className={buttonClassName}
        >
          <View className="w-full justify-center">
            <View className="absolute left-0 top-0 bottom-0">
              {socialAuthOptions[option].icon}
            </View>
            <Text className={cn('text-lg text-center', textClassName)}>
              {isSignIn ? 'Sign in' : 'Sign up'} with{' '}
              {socialAuthOptions[option].name}
            </Text>
          </View>
        </Button>
      ))}
    </View>
  );
};
