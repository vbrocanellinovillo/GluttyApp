import BlurContainer from "../UI/BlurContainer";
import ScheduleNextStudy from "./ScheduleNextStudy";

export default function BlurNextStudy({ visible, onDismiss, time, getData }) {
  return (
    <BlurContainer visible={visible} onDismiss={onDismiss}>
      <ScheduleNextStudy onDismiss={onDismiss} time={time} getData={getData} />
    </BlurContainer>
  );
}
