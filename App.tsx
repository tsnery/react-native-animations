import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ThreeCircles } from "./src/screens/threeCircles";

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThreeCircles />
    </GestureHandlerRootView>
  );
}
