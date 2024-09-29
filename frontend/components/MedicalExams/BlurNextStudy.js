import BlurContainer from "../UI/BlurContainer";
import ScheduleNextStudy from "./ScheduleNextStudy";

export default function BlurNextStudy({ visible, onDismiss, time }) {
  return (
    <BlurContainer visible={visible} onDismiss={onDismiss}>
      <ScheduleNextStudy onDismiss={onDismiss} time={time} />
    </BlurContainer>
  );
}
