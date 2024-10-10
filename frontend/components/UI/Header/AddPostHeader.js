import { StyleSheet } from "react-native";
import GoBackHeader from "./GoBackHeader";
import TextCommonsMedium from "../FontsTexts/TextCommonsMedium";
import { Colors } from "../../../constants/colors";

export default function AddPostHeader({ options, navigation, route }) {
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
      <TextCommonsMedium style={styles.postText}>Post</TextCommonsMedium>
    </GoBackHeader>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "white",
    shadowColor: "#888",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },

  textStyle: {
    fontWeight: "500",
  },

  postText: {
    fontSize: 30,
    fontWeight: "500",
    color: Colors.locro,
  },
});
