import { StyleSheet, View } from "react-native";
import SectionContainer from "../UI/SectionContainer";
import NoNextStudy from "./NoNextStudy";
import NextStudy from "./NextStudy";

export default function NextStudyContainer({ date, onPress }) {
  return (
    <SectionContainer style={styles.container} onPress={onPress}>
      <>
        {date && <NextStudy date={date} />}
        {!date && <NoNextStudy />}
      </>
    </SectionContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "stretch",
  },
});
