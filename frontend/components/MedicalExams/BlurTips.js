import { GlobalStyles } from "../../constants/styles";
import { Modal } from "react-native";
import { Portal } from "react-native-paper";
import { BlurView } from "expo-blur";
import GluttyTipsContainer from "./GluttyTipsContainer";

export default function BlurTips({ visible, tips, onDismiss }) {
  return (
    visible && (
      <Portal>
        <BlurView style={GlobalStyles.blur} intensity={10}>
          <Modal transparent animationType="fade">
            <GluttyTipsContainer onDismiss={onDismiss} tips={tips} />
          </Modal>
        </BlurView>
      </Portal>
    )
  );
}
