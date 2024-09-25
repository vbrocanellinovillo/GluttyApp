import { GlobalStyles } from "../../constants/styles";
import { Modal } from "react-native";
import { Portal } from "react-native-paper";
import { BlurView } from "expo-blur";

export default function BlurContainer({ visible, children }) {
  return (
    visible && (
      <Portal>
        <BlurView style={GlobalStyles.blur} intensity={10}>
          <Modal transparent animationType="fade">
            {children}
          </Modal>
        </BlurView>
      </Portal>
    )
  );
}
