import { BlurView } from "expo-blur";
import GraphicSkeleton from "../UI/Loading/GraphicSkeleton";
import { StyleSheet } from "react-native";

export default function BlurGraphic({
  width,
  height,
  children,
  style,
  intensity = 30,
}) {
  return (
    <>
      <GraphicSkeleton width={width} height={height} />
      <BlurView
        intensity={intensity}
        style={[styles.blurred, { height }, style]}
      >
        {children}
      </BlurView>
    </>
  );
}

const styles = StyleSheet.create({
  blurred: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    borderRadius: 10,
    overflow: "hidden",
  },
});
