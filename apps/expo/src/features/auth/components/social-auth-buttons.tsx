import { Button, Text } from '@/components/ui';
import { cn } from '@/lib';
import { View } from 'react-native';
import GoogleIcon from '../../../../assets/svgs/google-icon.svg';
import { cloneElement } from 'react';
import { useColorScheme } from '@/hooks';

export type SocialAuthOptions = 'google';

export interface ISocialAuthButtons {
  isSignIn?: boolean;
  options: SocialAuthOptions[];
  buttonClassName?: string;
  textClassName?: string;
  iconFill?: string;
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
  iconFill,
}: ISocialAuthButtons) => {
  const { colorScheme } = useColorScheme();
  const isLightTheme = colorScheme === 'light';

  const iFill = iconFill ? iconFill : isLightTheme ? 'black' : 'white';

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
              {cloneElement(socialAuthOptions[option].icon, {
                fill: iFill,
              })}
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
