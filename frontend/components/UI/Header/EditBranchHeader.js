import { StyleSheet } from "react-native";
import GoBackHeader from "./GoBackHeader";
import TextCommonsMedium from "../FontsTexts/TextCommonsMedium";
import { Colors } from "../../../constants/colors";

export default function EditBranchHeader({ options, navigation, route }) {
  return (
    <GoBackHeader
      gradient={false}
      options={options}
      navigation={navigation}
      route={route}
      backIcon="arrow-back-sharp"
      containerStyle={styles.header}
      titleStyle={styles.textStyle}
    >
    </GoBackHeader>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 60,
    alignItems: "center",
    backgroundColor: "white",
    shadowColor: "#888",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 1,
  },

  textStyle: {
    color: Colors.locro,
    fontWeight: "500",
    fontSize:25,
  },

});
