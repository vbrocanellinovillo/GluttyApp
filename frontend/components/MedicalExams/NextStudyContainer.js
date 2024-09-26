import { StyleSheet, View } from "react-native";
import SectionContainer from "../UI/SectionContainer";
import NoNextStudy from "./NoNextStudy";

export default function NextStudyContainer({ date, onPress }) {
  return (
    <SectionContainer style={styles.container} onPress={onPress}>
      <>
        {date && <View />}
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
