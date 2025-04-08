import { LoaderCircle } from '@/lib/icons';
import { View } from 'react-native';

export interface ISpinner {
  color?: string;
  size?: number;
}

export const Spinner = ({ color = 'white', size = 16 }: ISpinner) => {
  return (
    <View className="absolute top-0 bottom-0 left-[105%] pt-1">
      <View className="animate-spin">
        <LoaderCircle width={size} height={size} color={color} />
      </View>
    </View>
  );
};
