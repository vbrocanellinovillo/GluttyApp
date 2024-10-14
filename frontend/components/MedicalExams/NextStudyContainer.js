import { StyleSheet, View } from "react-native";
import SectionContainer from "../UI/SectionContainer";
import NoNextStudy from "./NoNextStudy";
import NextStudy from "./NextStudy";

export default function NextStudyContainer({ date, onPress }) {
  console.log("fecha", date);
  const hasDate = date?.days||date?.months||date?.years;
  
  return (
    <SectionContainer style={styles.container} onPress={onPress}>
      <>
        {hasDate && <NextStudy date={date} />}
        {!hasDate && <NoNextStudy />}
      </>
    </SectionContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "stretch",
  },
});
