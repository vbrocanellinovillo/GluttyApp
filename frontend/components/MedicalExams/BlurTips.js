import GluttyTipsContainer from "./GluttyTipsContainer";
import BlurContainer from "../UI/BlurContainer";

export default function BlurTips({ visible, tips, onDismiss }) {
  return (
    <BlurContainer visible={visible}>
      <GluttyTipsContainer onDismiss={onDismiss} tips={tips} />
    </BlurContainer>
  );
}
