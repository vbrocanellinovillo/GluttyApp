import { StyleSheet, View } from "react-native";
import DismissKeyboadContainer from "../../components/UI/Forms/DismissKeyboadContainer";
import GluttyBotTitle from "./GluttyBotTitle";
import InitialFiltersList from "./InitialFiltersList";

export default function InitialMessages({ onFilter }) {
  return (
    <View style={styles.container}>
      <DismissKeyboadContainer>
        <>
          <GluttyBotTitle />
          <InitialFiltersList onFilter={onFilter} />
        </>
      </DismissKeyboadContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 30,
    gap: 40,
  },
});
