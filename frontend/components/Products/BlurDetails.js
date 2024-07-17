import { BlurView } from "expo-blur";
import { Modal } from "react-native";
import ProductDetails from "./ProductDetails";
import { GlobalStyles } from "../../constants/styles";
import { Portal } from "react-native-paper";

export default function BlurDetails({ isVisible, product, onDismiss }) {
  return (
    isVisible &&
    product && (
      <Portal>
        <BlurView style={GlobalStyles.blur} intensity={10}>
          <Modal transparent animationType="fade">
            <ProductDetails product={product} onDismiss={onDismiss} />
          </Modal>
        </BlurView>
      </Portal>
    )
  );
}
