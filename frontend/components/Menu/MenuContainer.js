import { StyleSheet, View } from "react-native";
import MenuLinksSection from "./MenuLinksSection";
import { Divider } from "react-native-paper";
import SpecificProductsSection from "./SpecificProductsSection";
import DismissKeyboardContainer from "../UI/Forms/DismissKeyboadContainer";

export default function MenuContainer() {
  return (
    <DismissKeyboardContainer>
      <View style={styles.menu}>
        <MenuLinksSection />
        <Divider />
        <SpecificProductsSection />
      </View>
    </DismissKeyboardContainer>
  );
}

const styles = StyleSheet.create({
  menu: {
    marginTop:70,
    flex: 1,
    paddingHorizontal: 20,
  },
});
