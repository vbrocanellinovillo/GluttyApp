import { Dimensions, StyleSheet } from "react-native";
import DialogContainer from "../UI/DialogContainer";
import LoadingWithText from "../UI/Loading/LoadingWithText";
import ErrorTips from "./ErrorTips";
import TipsCarousel from "./TipsCarousel";

const modalHeight = Dimensions.get("window").height * 0.4;

export default function GluttyTipsContainer({
  onDismiss,
  tips,
  isLoading,
  isError,
}) {
  let content;

  if (isLoading)
    content = (
      <LoadingWithText
        containerStyle={[styles.loadingContainer, { height: modalHeight }]}
        imageStyle={styles.loadingImage}
        textStyle={styles.loadingText}
      >
        Cargando.....
      </LoadingWithText>
    );

  if (isError && !isLoading)
    content = (
      <ErrorTips height={modalHeight}>
        Error cargando los Glutty TIPs. Por favor intente de nuevo más tarde
      </ErrorTips>
    );

  if (tips && !isLoading) {
    content = <TipsCarousel height={modalHeight} tips={tips} />;
  }

  return (
    <DialogContainer title="Glutty TIPs!" onDismiss={onDismiss}>
      {content}
    </DialogContainer>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    gap: 40,
    paddingTop: 40,
  },

  loadingText: {
    fontSize: 26,
  },

  loadingImage: {
    height: 150,
  },
});
