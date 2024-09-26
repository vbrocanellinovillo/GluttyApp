import TipsCarousel from "./TipsCarousel";
import DialogContainer from "../UI/DialogContainer";

export default function GluttyTipsContainer({ onDismiss, tips }) {
  return (
    <DialogContainer title="Glutty TIPs!" onDismiss={onDismiss}>
      <TipsCarousel tips={tips} />
    </DialogContainer>
  );
}
