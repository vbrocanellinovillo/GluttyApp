import GluttyTipsContainer from "./GluttyTipsContainer";
import BlurContainer from "../UI/BlurContainer";

export default function BlurTips({ visible, tips, onDismiss }) {
  return (
    <BlurContainer visible={visible} onDismiss={onDismiss}>
      <GluttyTipsContainer tips={tips} onDismiss={onDismiss} />
    </BlurContainer>
  );
}
