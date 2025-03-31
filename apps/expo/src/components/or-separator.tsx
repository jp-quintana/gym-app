import { View } from 'react-native';
import { Separator, Text } from './ui';
import { useColorScheme } from '@/hooks';
import { cn } from '@/lib';

export interface IOrSeparator {
  className?: string;
}

export const OrSeparator = ({ className }: IOrSeparator) => {
  const { colorScheme } = useColorScheme();
  const isLightTheme = colorScheme === 'light';
  const separatorClassName = cn(
    'shrink',
    isLightTheme ? 'bg-black' : 'bg-white'
  );
  return (
    <View className={cn('flex-row justify-center items-center', className)}>
      <Separator className={separatorClassName} />
      <Text className="px-3 leading-none">or</Text>
      <Separator className={separatorClassName} />
    </View>
  );
};
