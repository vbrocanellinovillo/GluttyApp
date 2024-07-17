import { BlurView } from "expo-blur";
import ScreenCenter from "../components/UI/ScreenCenter";
import { Text, View } from "react-native";

export default function Home() {
  return (
    <ScreenCenter>
      <Text>texto choto</Text>
      <View style={{ height: 50, width: 50, backgroundColor: "red" }}></View>
      <BlurView
        intensity={10}
        style={{
          position: "absolute",
          height: "100%",
          width: "100%"
        }}
      />
    </ScreenCenter>
  );
}
