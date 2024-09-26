import BlurContainer from "../UI/BlurContainer";
import ScheduleNextStudy from "./ScheduleNextStudy";

export default function BlurNextStudy({ visible, onDismiss, date }) {
  return (
    <BlurContainer visible={visible} onDismiss={onDismiss}>
      <ScheduleNextStudy onDismiss={onDismiss} />
    </BlurContainer>
  );
}
