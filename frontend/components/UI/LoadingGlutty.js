import {
  Image,
  Modal,
  StyleSheet,
  View,
} from "react-native";
import ScreenCenter from "./ScreenCenter";

export default function LoadingGlutty({ visible }) {
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
              uri: "https://res.cloudinary.com/dksmkvi49/image/upload/v1718920847/Glutty-saltando-unscreen_xmvdgw.gif",
            }}
          />
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
});
