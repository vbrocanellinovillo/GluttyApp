import { Image, Modal, StyleSheet, View } from "react-native";
import ScreenCenter from "../ScreenCenter";
import { jumpingGlutty } from "../../../constants/glutty";
import AnimatedText from "./AnimatedText";
import { Colors } from "../../../constants/colors";

export default function LoadingGlutty({
  visible,
  children,
  textStyle,
  initialColor,
  changedColor,
  duration,
}) {
  return (
    <Modal
      visible={visible}
      animationType="fade"
      presentationStyle="overFullScreen"
      transparent={true}
    >
      <View style={styles.backdrop}>
        <ScreenCenter style={styles.container}>
          <Image
            style={styles.image}
            source={{
              uri: jumpingGlutty,
            }}
          />
          {children && (
            <AnimatedText
              textStyle={[styles.textStyle, textStyle]}
              initialColor={initialColor || Colors.locro}
              changedColor={changedColor || Colors.vainilla}
              duration={duration || 420}
            >
              {children}
            </AnimatedText>
          )}
        </ScreenCenter>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 120,
  },

  image: {
    width: 300,
    height: 300,
    objectFit: "contain",
  },

  backdrop: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },

  textStyle: {
    fontSize: 26,
  },
});
