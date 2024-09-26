import { GlobalStyles } from "../../constants/styles";
import { Modal, Pressable, StyleSheet, View } from "react-native";
import { Portal } from "react-native-paper";
import { BlurView } from "expo-blur";

export default function BlurContainer({
  visible,
  onDismiss,
  children,
  backdropContainerStyle,
  backdropStyle,
}) {
  return (
    visible && (
      <Portal>
        <BlurView style={GlobalStyles.blur} intensity={10}>
          <Modal transparent animationType="fade">
            <View style={[styles.backdropContainer, backdropContainerStyle]}>
              <Pressable
                onPress={onDismiss && onDismiss}
                style={[styles.backdrop, backdropStyle]}
              />
              {children}
            </View>
          </Modal>
        </BlurView>
      </Portal>
    )
  );
}

const styles = StyleSheet.create({
  backdropContainer: {
    flex: 1,
    paddingVertical: 110,
    paddingHorizontal: 30,
  },

  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
});
