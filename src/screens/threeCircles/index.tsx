import { Dimensions, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { useSharedValue } from "react-native-reanimated";
import { useFollowAnimatedPosition } from "../../hooks/useFollowAnimatedPosition";
import { firstStyles } from "./styles";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export function ThreeCircles() {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const context = useSharedValue({ x: 0, y: 0 });

  const gesture = Gesture.Pan()
    .onStart(() => {
      context.value = { x: translateX.value, y: translateY.value };
    })
    .onUpdate((event) => {
      translateX.value = event.translationX + context.value.x;
      translateY.value = event.translationY + context.value.y;
    })
    .onEnd(() => {
      if (translateX.value > SCREEN_WIDTH / 2) {
        translateX.value = SCREEN_WIDTH - 80;
      } else {
        translateX.value = 0;
      }
    });

  const {
    rStyle: rBlueStyle,
    followX: blueFollowX,
    followY: blueFollowY,
  } = useFollowAnimatedPosition({
    x: translateX,
    y: translateY,
  });

  const {
    rStyle: rRedStyle,
    followX: redFollowX,
    followY: redFollowY,
  } = useFollowAnimatedPosition({
    x: blueFollowX,
    y: blueFollowY,
  });

  const { rStyle: rGreenStyle } = useFollowAnimatedPosition({
    x: redFollowX,
    y: redFollowY,
  });

  return (
    <View style={firstStyles.container}>
      <Animated.View
        style={[firstStyles.circle, { backgroundColor: "red" }, rGreenStyle]}
      />
      <Animated.View
        style={[firstStyles.circle, { backgroundColor: "green" }, rRedStyle]}
      />
      <GestureDetector gesture={gesture}>
        <Animated.View style={[firstStyles.circle, rBlueStyle]} />
      </GestureDetector>
    </View>
  );
}
