import { StyleSheet } from "react-native";
import GoBackHeader from "./GoBackHeader";

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
    />
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "white",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
  },

  textStyle: {
    fontWeight: "500",
  },
});
