import { StyleSheet, View } from "react-native";
import TextCommonsMedium from "../UI/FontsTexts/TextCommonsMedium";
import { Colors } from "../../constants/colors";
import Button from "../UI/Controls/Button";
import { useNavigation } from "@react-navigation/native";

export default function GluttyFeedButton() {
  const navigation = useNavigation();

  function navigateFeed() {
    navigation.navigate("CommunityTopTabs");
  }

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <TextCommonsMedium style={[styles.text, styles.glutty]}>
          Glutty
        </TextCommonsMedium>
        <TextCommonsMedium style={[styles.text, styles.feed]}>
          Feed
        </TextCommonsMedium>
      </View>
      <Button
        style={styles.button}
        textStyle={styles.buttonText}
        rightIcon="arrow-forward-circle-sharp"
        iconColor={Colors.whiteJordan}
        iconSize={28}
        onPress={navigateFeed}
      >
        Ingresa!
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16,
  },

  textContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  text: {
    fontSize: 38,
    fontWeight: "700",
    color: Colors.mJordan,
  },

  glutty: {
    color: Colors.mJordan,
  },

  feed: {
    color: Colors.locro,
  },

  button: {
    backgroundColor: Colors.mJordan,
    borderRadius: 30,
    gap: 10,
    alignItems: "center",
  },

  buttonText: {
    color: Colors.whiteJordan,
    fontSize: 18,
  },
});
