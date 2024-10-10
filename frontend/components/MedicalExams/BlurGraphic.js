import { BlurView } from "expo-blur";
import GraphicSkeleton from "../UI/Loading/GraphicSkeleton";
import { StyleSheet } from "react-native";

export default function BlurGraphic({ width, height, children, style }) {
  return (
    <>
      <GraphicSkeleton width={width} height={height} />
      <BlurView intensity={30} style={[styles.blurred, { height }, style]}>
        {children}
      </BlurView>
    </>
  );
}

const styles = StyleSheet.create({
  blurred: {
    position: "absolute",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    overflow: "hidden",
  },
});
