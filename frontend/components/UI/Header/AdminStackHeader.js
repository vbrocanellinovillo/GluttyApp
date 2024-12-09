import { StyleSheet } from "react-native";
import GoBackHeader from "./GoBackHeader";
import TextCommonsMedium from "../FontsTexts/TextCommonsMedium";
import { Colors } from "../../../constants/colors";

export default function AdminStackHeader({
  options,
  navigation,
  route,
  backScreen,
  customText,
}) {
  const title = options.title;

  function goBack() {
    navigation.navigate("AdminTopTabs", { screen: backScreen });
  }

  return (
    <GoBackHeader
      gradient={false}
      options={options}
      navigation={navigation}
      route={route}
      backIcon="arrow-back-sharp"
      containerStyle={styles.header}
      titleStyle={styles.textStyle}
      customText={customText}
      onBack={goBack}
    >
      <TextCommonsMedium style={styles.extraText}>
        {title ? title : ""}
      </TextCommonsMedium>
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
    paddingLeft: 12,
  },

  textStyle: {
    fontSize: 22,
    fontWeight: "500",
  },

  extraText: {
    fontSize: 22,
    fontWeight: "500",
    color: Colors.locro,
  },
});
