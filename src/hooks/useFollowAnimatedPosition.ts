import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  withSpring,
} from "react-native-reanimated";

type AnimatedPositionProps = {
  x: Animated.SharedValue<number>;
  y: Animated.SharedValue<number>;
};

export const useFollowAnimatedPosition = ({ x, y }: AnimatedPositionProps) => {
  const followX = useDerivedValue(() => {
    return withSpring(x.value);
  });

  const followY = useDerivedValue(() => {
    return withSpring(y.value);
  });

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: followX.value }, { translateY: followY.value }],
    };
  });

  return {
    followX,
    followY,
    rStyle,
  };
};
